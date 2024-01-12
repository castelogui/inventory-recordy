<template>
  <div class="content">
    <div>
      <div class="buttons">
        <button class="button is-info" @click="novoItem">
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
          <th>Estoque</th>
          <th>Status</th>
          <th>Categoria</th>
          <th>Color</th>
          <th>Size</th>
          <th>Data Criação</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th>Nome</th>
          <th>Descrição</th>
          <th>Estoque</th>
          <th>Status</th>
          <th>Categoria</th>
          <th>Color</th>
          <th>Size</th>
          <th>Data Criação</th>
          <th>Opções</th>
        </tr>
      </tfoot>
      <tbody v-for="(item, i) in items" :key="i">
        <tr>
          <td>{{ item.name }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.estoque }}</td>
          <td>{{ item.status }}</td>
          <td>{{ item.category.name }}</td>
          <td>{{ item.color.name }}</td>
          <td>{{ item.size }}</td>
          <td>{{ item.created_at }}</td>
          <td>
            <span class="button is-small is-info" @click="editarItem(item)">
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
              <label class="label" for="name">*Nome</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Nome do Item"
                  v-model="itemEdit.name"
                />
              </div>
            </div>
            <div class="column field">
              <label class="label" for="description">Descrição</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Descrição"
                  v-model="itemEdit.description"
                />
              </div>
            </div>
          </div>
          <div class="columns">
            <div class="column field">
              <label for="estoque" class="label">Estoque</label>
              <div class="control">
                <input
                  class="input"
                  type="number"
                  placeholder="0"
                  v-model="itemEdit.estoque"
                />
              </div>
            </div>
            <div class="column field">
              <label for="status" class="label">Status</label>
              <label class="checkbox">
                <input
                  type="checkbox"
                  id="true"
                  checked
                  v-model="itemEdit.status"
                />
                Ativo
              </label>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <label for="category_id" class="label">*Categoria</label>
              <div class="select">
                <select v-model="itemEdit.category_id">
                  <option
                    v-for="(cat, i) in categories"
                    :key="i"
                    :value="cat.id"
                  >
                    {{ cat.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="column">
              <label for="color_id" class="label">*Cor</label>
              <div class="select">
                <select v-model="itemEdit.color_id">
                  <option v-for="(cor, i) in colors" :key="i" :value="cor.id">
                    {{ cor.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="column">
              <label for="color_id" class="label">*Tamanho</label>
              <div class="control">
                <div class="field">
                  <input
                    class="input"
                    type="text"
                    placeholder=""
                    v-model="itemEdit.size"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #options>
        <button class="button is-success" @click="salvar">Save</button>
        <button class="button" @click="fechar">Cancel</button>
        <button
          v-if="itemEdit.id"
          class="button is-danger"
          @click="deletar(itemEdit)"
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
import IItem from "../../interfaces/IItem";
import Notificacoes from "../../mixins/notificacoes";
import {
  CRIAR_ITEM,
  ATUALIZAR_ITEM,
  DELETAR_ITEM,
  DEFINIR_ITEMS,
  DEFINIR_CATEGORIES,
  DEFINIR_CORES,
} from "../../store/tipo-actions";

export default defineComponent({
  name: "Item-Component",
  data() {
    return {
      itemEdit: {} as IItem,
    };
  },
  setup() {
    const store = useStore();
    return {
      items: computed(() => store.state.item.items),
      categories: computed(() => store.state.category.categories),
      colors: computed(() => store.state.color.cores),
    };
  },
  methods: {
    editarItem(item: IItem) {
      this.itemEdit = item;
      this.open();
    },
    novoItem() {
      this.itemEdit = {} as IItem;
      this.open();
    },
    async salvar() {
      if (!this.itemEdit.id || this.itemEdit.id == undefined) {
        await store
          .dispatch(CRIAR_ITEM, this.itemEdit)
          .then(() => {
            Notificacoes.saveSucess(
              "Item",
              `O item ${this.itemEdit.name} foi cadastrado com sucesso`
            );
            this.fechar();
          })
          .catch((err) => {
            Notificacoes.saveError("Item", "", err.response.data);
          });
      } else {
        if (this.itemEdit.id) {
          await store
            .dispatch(ATUALIZAR_ITEM, this.itemEdit)
            .then(() => {
              Notificacoes.saveSucess(
                "Item",
                `O item ${this.itemEdit.name} foi atualizado com sucesso`
              );
              this.fechar();
            })
            .catch((err) => {
              Notificacoes.saveError("Item", "", err.response.data);
            });
        }
      }
    },
    async deletar(item: IItem) {
      await store
        .dispatch(DELETAR_ITEM, item)
        .then(() => {
          this.fechar();
          window.location.reload();
          Notificacoes.deleteSucess("Item", "");
        })
        .catch((err) => {
          Notificacoes.deleteError("Item", "", err);
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
    store.dispatch(DEFINIR_ITEMS);
    store.dispatch(DEFINIR_CATEGORIES);
    store.dispatch(DEFINIR_CORES);
  },
  components: { Modal },
});
</script>
