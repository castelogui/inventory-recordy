<template>
  <div class="content">
    <div>
      <div class="buttons">
        <button class="button is-info" @click="novoDep">
          <span class="icon is-small">
            <i class="fas fa-plus"></i>
          </span>
          <span>Novo</span>
        </button>
      </div>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th>Codigo</th>
          <th>Nome</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th>Codigo</th>
          <th>Nome</th>
          <th>Opções</th>
        </tr>
      </tfoot>
      <tbody v-for="(dep, i) in departamentos" :key="i">
        <tr>
          <th>{{ dep.codigo }}</th>
          <td>{{ dep.nome }}</td>
          <td>
            <span class="button is-small is-info" @click="editarDep(dep)">
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
            v-model="depEdit.codigo"
          />
          <input
            class="input"
            type="text"
            placeholder="Nome"
            v-model="depEdit.nome"
          />
        </div>
      </template>
      <template #options>
        <button class="button is-success" @click="salvar">Save</button>
        <button class="button" @click="fechar">Cancel</button>
        <button class="button is-danger" @click="deletar(depEdit)">
          Deletar
        </button>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { store, useStore } from "../../store";
import {
  DEFINIR_DEPARTAMENTOS,
  DELETAR_DEPARTAMENTO,
  CRIAR_DEPARTAMENTO,
ATUALIZAR_DEPARTAMENTO,
} from "../../store/tipo-actions";
import { computed } from "@vue/reactivity";
import { defineComponent } from "vue";
import Modal from "../Modal.vue";
import IDepartamento from "@/interfaces/IDepartamento";

export default defineComponent({
  name: "Departamento-Component",
  data() {
    return {
      depEdit: {} as IDepartamento,
    };
  },
  setup() {
    const store = useStore();
    return {
      departamentos: computed(() => store.state.departamento.departamentos),
    };
  },
  methods: {
    editarDep(dep: IDepartamento) {
      this.depEdit = dep;
      this.open();
    },
    novoDep() {
      this.depEdit = {} as IDepartamento;
      this.open();
    },
    async salvar() {
      if (!this.depEdit._id) {
        if (this.depEdit.codigo && this.depEdit.nome) {
          await store.dispatch(CRIAR_DEPARTAMENTO, this.depEdit);
          this.fechar();
        }
      } else {
        if (this.depEdit.codigo && this.depEdit.nome) {
          await store.dispatch(ATUALIZAR_DEPARTAMENTO, this.depEdit);
          this.fechar();
        }
      }
    },
    async deletar(dep: IDepartamento) {
      await store.dispatch(DELETAR_DEPARTAMENTO, dep).then(() => {
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
    store.dispatch(DEFINIR_DEPARTAMENTOS);
  },
  components: { Modal },
});
</script>
