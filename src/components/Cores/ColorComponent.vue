<template>
  <div class="content">
    <div>
      <div class="buttons">
        <button class="button is-info" @click="novaCor">
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
          <th>Hexadecimal</th>
          <th>Data de Criação</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th>Nome</th>
          <th>Descrição</th>
          <th>Hexadecimal</th>
          <th>Data de Criação</th>
          <th>Opções</th>
        </tr>
      </tfoot>
      <tbody v-for="(cor, i) in cores" :key="i">
        <tr>
          <td>{{ cor.name }}</td>
          <td>{{ cor.description }}</td>
          <td>{{ cor.hexadecimal }}</td>
          <td>{{ cor.created_at }}</td>
          <td>
            <span class="button is-small is-info" @click="editarCor(cor)">
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
            placeholder="Nome"
            v-model="corEdit.name"
          />
          <input
            class="input"
            type="text"
            placeholder="Descrição"
            v-model="corEdit.description"
          />
          <input
            class="input"
            type="text"
            placeholder="Hexadecimal"
            v-model="corEdit.hexadecimal"
          />
        </div>
      </template>
      <template #options>
        <button class="button is-success" @click="salvar">Save</button>
        <button class="button" @click="fechar">Cancel</button>
        <button v-if="corEdit.id" class="button is-danger" @click="deletar(corEdit)">
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
import IColor from "../../interfaces/IColor";
import Notificacoes from "../../mixins/notificacoes";
import {
  ATUALIZAR_COR,
  CRIAR_COR,
  DEFINIR_CORES,
  DELETAR_COR,
} from "@/store/tipo-actions";

export default defineComponent({
  name: "Color-Component",
  data() {
    return {
      corEdit: {} as IColor,
    };
  },
  setup() {
    const store = useStore();
    return {
      cores: computed(() => store.state.color.cores),
    };
  },
  methods: {
    editarCor(cor: IColor) {
      this.corEdit = cor;
      this.open();
    },
    novaCor() {
      this.corEdit = {} as IColor;
      this.open();
    },
    async salvar() {
      if (!this.corEdit.id || this.corEdit.id == undefined) {
        await store
          .dispatch(CRIAR_COR, this.corEdit)
          .then(() => {
            Notificacoes.saveSucess(
              "Cor",
              `A cor ${this.corEdit.name} - ${this.corEdit.hexadecimal} foi cadastrada com sucesso`
            );
            this.fechar();
          })
          .catch((err) => {
            Notificacoes.saveError("Cor", "", err.response.data);
          });
      } else {
        if (this.corEdit.id) {
          await store
            .dispatch(ATUALIZAR_COR, this.corEdit)
            .then(() => {
              Notificacoes.saveSucess(
                "Cor",
                `A cor ${this.corEdit.name} - ${this.corEdit.hexadecimal} foi atualizada com sucesso`
              );
              this.fechar();
            })
            .catch((err) => {
              Notificacoes.saveError("Cor", "", err.response.data);
            });
        }
      }
    },
    async deletar(cor: IColor) {
      await store
        .dispatch(DELETAR_COR, cor)
        .then(() => {
          this.fechar();
          window.location.reload();
          Notificacoes.deleteSucess("Cor", "");
        })
        .catch((err) => {
          Notificacoes.deleteError(
            "Cor",
            "Ocorreu um erro ao deletar a cor",
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
    store.dispatch(DEFINIR_CORES);
  },
  components: { Modal },
});
</script>
