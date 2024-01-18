<template>
  <div class="content">
    <div>
      <div class="buttons">
        <button class="button is-info" @click="novoTypeMov">
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
          <th>Código</th>
          <th>Tipo</th>
          <th>Descricao</th>
          <th>Data de Criação</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th>Código</th>
          <th>Tipo</th>
          <th>Descricao</th>
          <th>Data de Criação</th>
          <th>Opções</th>
        </tr>
      </tfoot>
      <tbody v-for="(typeMov, i) in typeMovements" :key="i">
        <tr>
          <td>{{ typeMov.code }}</td>
          <td>{{ typeMov.type }}</td>
          <td>{{ typeMov.description }}</td>
          <td>{{ typeMov.created_at }}</td>
          <td>
            <span
              class="button is-small is-info"
              @click="editarTypeMov(typeMov)"
            >
              <i class="fa fa-pen"></i>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <Modal>
      <template #content>
        <div class="control">
          <div class="field">
            <label for="code" class="label">*Código</label>
            <input
              class="input"
              type="text"
              placeholder="1 - 2"
              v-model="typeMovEdit.code"
            />
          </div>
          <div class="field">
            <label for="type" class="label">*Tipo</label>
            <input
              class="input"
              type="text"
              placeholder="Tipo"
              v-model="typeMovEdit.type"
            />
          </div>
          <label for="description" class="label">Descrição</label>
          <div class="field">
            <input
              class="input"
              type="text"
              placeholder="Descrição"
              v-model="typeMovEdit.description"
            />
          </div>
        </div>
      </template>
      <template #options>
        <button class="button is-success" @click="salvar">Save</button>
        <button class="button" @click="fechar">Cancel</button>
        <button
          v-if="typeMovEdit.id"
          class="button is-danger"
          @click="deletar(typeMovEdit)"
        >
          Deletar
        </button>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { store, useStore } from "../../store";
import { computed } from "@vue/reactivity";
import { defineComponent } from "vue";
import Modal from "../Modal.vue";
import ITypeMovement from "../../interfaces/ITypeMovement";
import Notificacoes from "../../mixins/notificacoes";
import {
  ATUALIZAR_TYPEMOVEMENT,
  CRIAR_TYPEMOVEMENT,
  DEFINIR_TYPEMOVEMENTS,
  DELETAR_TYPEMOVEMENT,
} from "../../store/tipo-actions";

export default defineComponent({
  name: "TypeMovement-Component",
  data() {
    return {
      typeMovEdit: {} as ITypeMovement,
    };
  },
  setup() {
    const store = useStore();
    return {
      typeMovements: computed(() => store.state.typeMovement.typeMovements),
    };
  },
  methods: {
    editarTypeMov(typeMov: ITypeMovement) {
      this.typeMovEdit = typeMov;
      this.open();
    },
    novoTypeMov() {
      this.typeMovEdit = {} as ITypeMovement;
      this.open();
    },
    async salvar() {
      if (!this.typeMovEdit.id || this.typeMovEdit.id == undefined) {
        await store
          .dispatch(CRIAR_TYPEMOVEMENT, this.typeMovEdit)
          .then(() => {
            Notificacoes.saveSucess(
              "Tipo Movimento",
              `O tipo de Movimento ${this.typeMovEdit.code} - ${this.typeMovEdit.type} foi cadastrado com sucesso`
            );
            this.fechar();
          })
          .catch((err) => {
            Notificacoes.saveError("Tipo Movimento", "", err.response.data);
          });
      } else {
        if (this.typeMovEdit.id) {
          await store
            .dispatch(ATUALIZAR_TYPEMOVEMENT, this.typeMovEdit)
            .then(() => {
              Notificacoes.saveSucess(
                "Tipo Movimento",
                `O tipo de movimento ${this.typeMovEdit.code} - ${this.typeMovEdit.type} foi atualizado com sucesso`
              );
              this.fechar();
            })
            .catch((err) => {
              Notificacoes.saveError("Tipo Movimento", "", err.response.data);
            });
        }
      }
    },
    async deletar(cat: ITypeMovement) {
      await store
        .dispatch(DELETAR_TYPEMOVEMENT, cat)
        .then(() => {
          this.fechar();
          window.location.reload();
          Notificacoes.deleteSucess("Tipo Movimento", "");
        })
        .catch((err) => {
          Notificacoes.deleteError(
            "Tipo Movimento",
            "Ocorreu um erro ao deletar o tipo de movimento",
            err.response.data
          );
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
    store.dispatch(DEFINIR_TYPEMOVEMENTS);
  },
  components: { Modal },
});
</script>
