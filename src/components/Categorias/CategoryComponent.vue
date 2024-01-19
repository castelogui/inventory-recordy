<template>
  <div class="content">
    <div>
      <div class="buttons">
        <button class="button is-info" @click="novoCat">
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
          <th>Nome</th>
          <th>Descrição</th>
          <th>Data de Criação</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th>Nome</th>
          <th>Descrição</th>
          <th>Data de Criação</th>
          <th>Opções</th>
        </tr>
      </tfoot>
      <tbody v-for="(cat, i) in categories" :key="i">
        <tr>
          <td>{{ cat.name }}</td>
          <td>{{ cat.description }}</td>
          <td>{{ formatDate(cat.created_at) }}</td>
          <td>
            <span class="button is-small is-info" @click="editarCat(cat)">
              <i class="fa fa-pen"></i>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <Modal>
      <template #content>
        <div class="control">
          <div class="columns">
            <div class="column field">
              <label for="name" class="label">*Nome</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Nome"
                  v-model="catEdit.name"
                />
              </div>
            </div>
            <div class="column field">
              <label for="description" class="label">Descricao</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Descrição"
                  v-model="catEdit.description"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #options>
        <button class="button is-success" @click="salvar">Save</button>
        <button class="button" @click="fechar">Cancel</button>
        <button
          v-if="catEdit.id"
          class="button is-danger"
          @click="deletar(catEdit)"
        >
          Deletar
        </button>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { store, useStore } from "../../store";
import {
  DEFINIR_CATEGORIES,
  DELETAR_CATEGORY,
  CRIAR_CATEGORY,
  ATUALIZAR_CATEGORY,
} from "../../store/tipo-actions";
import { computed } from "@vue/reactivity";
import { defineComponent } from "vue";
import Modal from "../Modal.vue";
import ICategory from "../../interfaces/ICategory";
import Notificacoes from "@/mixins/notificacoes";
import { FormatCustomDate } from "../../util/formatCustomDate";

export default defineComponent({
  name: "Category-Component",
  data() {
    return {
      catEdit: {} as ICategory,
    };
  },
  setup() {
    const store = useStore();
    return {
      categories: computed(() => store.state.category.categories),
    };
  },
  methods: {
    formatDate(date: Date) {
      return new FormatCustomDate().dateTimeLocal(date);
    },
    editarCat(cat: ICategory) {
      this.catEdit = cat;
      this.open();
    },
    novoCat() {
      this.catEdit = {} as ICategory;
      this.open();
    },
    async salvar() {
      if (!this.catEdit.id || this.catEdit.id == undefined) {
        await store
          .dispatch(CRIAR_CATEGORY, this.catEdit)
          .then(() => {
            Notificacoes.saveSucess(
              "Categoria",
              `A categoria ${this.catEdit.name} foi cadastrada com sucesso`
            );
            this.fechar();
          })
          .catch((err) => {
            Notificacoes.saveError("Categoria", "", err.response.data);
          });
      } else {
        if (this.catEdit.id) {
          await store
            .dispatch(ATUALIZAR_CATEGORY, this.catEdit)
            .then(() => {
              Notificacoes.saveSucess(
                "Categoria",
                `A categoria ${this.catEdit.name} foi atualizada com sucesso`
              );
              this.fechar();
            })
            .catch((err) => {
              Notificacoes.saveError("Categoria", "", err.response.data);
            });
        }
      }
    },
    async deletar(cat: ICategory) {
      await store
        .dispatch(DELETAR_CATEGORY, cat)
        .then(() => {
          this.fechar();
          window.location.reload();
          Notificacoes.deleteSucess(
            "Categoria",
            "Categoria deletada com sucesso"
          );
        })
        .catch((err) => {
          Notificacoes.deleteError(
            "Categoria",
            "Ocorreu um erro ao deletar a categoria",
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
    store.dispatch(DEFINIR_CATEGORIES);
  },
  components: { Modal },
});
</script>
