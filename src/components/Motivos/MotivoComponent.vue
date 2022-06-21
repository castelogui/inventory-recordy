<template>
  <div class="content">
    <div>
      <div class="buttons">
        <div class="button is-info" @click="novoMot">
          <span class="icon is-small">
            <i class="fas fa-plus"></i>
          </span>
          <span>Novo</span>
        </div>
      </div>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Codigo</th>
          <th>Motivo</th>
          <th>Peso</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th>Codigo</th>
          <th>Motivo</th>
          <th>Peso</th>
          <th>Opções</th>
        </tr>
      </tfoot>
      <tbody v-for="(mtv, i) in motivos" :key="i">
        <tr>
          <th>{{ mtv.codigo }}</th>
          <td>{{ mtv.motivo }}</td>
          <td>{{ mtv.peso }}</td>
          <td>
            <span class="button is-small is-info" @click="editarMot(mtv)">
              <i class="fa fa-pen"></i>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <Modal>
      <template #content>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="Codigo"
            v-model="motivoEdit.codigo"
          />
          <input
            class="input"
            type="text"
            placeholder="Motivo"
            v-model="motivoEdit.motivo"
          />
          <input
            class="input"
            type="text"
            placeholder="Peso"
            v-model="motivoEdit.peso"
          />
        </div>
      </template>
      <template #options>
        <button class="button is-success" @click="salvar">Save</button>
        <button class="button" @click="fechar">Cancel</button>
        <button class="button is-danger" @click="deletar(motivoEdit)">
          Deletar
        </button>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { store, useStore } from "../../store";
import {
  ATUALIZAR_MOTIVO,
  CRIAR_MOTIVO,
  DEFINIR_MOTIVOS,
  DELETAR_MOTIVO,
} from "../../store/tipo-actions";
import { computed } from "@vue/reactivity";
import { defineComponent } from "vue";
import Modal from "../Modal.vue";
import IMotivo from "@/interfaces/IMotivo";

export default defineComponent({
  name: "Motivo-Component",
  data() {
    return {
      motivoEdit: {} as IMotivo,
    };
  },
  setup() {
    const store = useStore();
    return {
      motivos: computed(() => store.state.motivo.motivos),
    };
  },
  methods: {
    editarMot(mot: IMotivo) {
      this.motivoEdit = mot;
      this.open();
    },
    novoMot() {
      this.motivoEdit = {} as IMotivo;
      this.open();
    },
    async salvar() {
      if (!this.motivoEdit._id) {
        await store.dispatch(CRIAR_MOTIVO, this.motivoEdit);
        this.fechar();
      } else {
        await store.dispatch(ATUALIZAR_MOTIVO, this.motivoEdit);
        this.fechar();
      }
    },
    async deletar(mot: IMotivo) {
      await store.dispatch(DELETAR_MOTIVO, mot).then(() => {
        this.fechar();
        window.location.reload();
      });
    },
    open() {
      document.querySelector(".modal")?.classList.add("is-active");
    },
    fechar() {
      document.querySelector(".modal")?.classList.remove("is-active");
    },
  },
  mounted() {
    store.dispatch(DEFINIR_MOTIVOS);
  },
  components: { Modal },
});
</script>
