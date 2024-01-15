<template>
  <div class="content">
    <div>
      <div class="buttons">
        <button class="button is-info" @click="novoMovement">
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
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Tipo de Movimento</th>
          <th>Item</th>
          <th>Estoque Atual</th>
          <th>Estoque Anterior</th>
          <th>Data Criação</th>
          <th>Data Atualização</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Tipo de Movimento</th>
          <th>Item</th>
          <th>Estoque Atual</th>
          <th>Estoque Anterior</th>
          <th>Data Criação</th>
          <th>Data Atualização</th>
          <th>Opções</th>
        </tr>
      </tfoot>
      <tbody v-for="(mov, i) in movements" :key="i">
        <tr>
          <td>{{ mov.description }}</td>
          <td>{{ mov.quantity }}</td>
          <td>{{ mov.type_movement.type }}</td>
          <td>{{ mov.item.name }}</td>
          <td>{{ mov.item_estoque }}</td>
          <td>{{ mov.item_estoque_ant }}</td>
          <td>{{ mov.created_at }}</td>
          <td>{{ mov.updated_at }}</td>
          <td>
            <span class="button is-small is-info" @click="editarMovement(mov)">
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
            <div class="column">
              <label for="type_movement_id" class="label"
                >*Tipo de Movimento</label
              >
              <div class="select">
                <select v-model="movementEdit.type_movement_id">
                  <option
                    v-for="(type, t) in type_movements"
                    :key="t"
                    :value="type.id"
                  >
                    {{ type.type }}
                  </option>
                </select>
              </div>
            </div>
            <div class="column">
              <label for="item_id" class="label">*Item</label>
              <div class="select">
                <select v-model="movementEdit.item_id">
                  <option v-for="(item, i) in items" :key="i" :value="item.id">
                    {{ item.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="columns">
            <div class="column field">
              <label class="label" for="description">Descrição</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Descrição"
                  v-model="movementEdit.description"
                />
              </div>
            </div>
            <div class="column field">
              <label for="quantity" class="label">*Quantity</label>
              <div class="control">
                <input
                  class="input"
                  type="number"
                  placeholder="0"
                  v-model="movementEdit.quantity"
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
          v-if="movementEdit.id"
          class="button is-danger"
          @click="deletar(movementEdit)"
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
import IMovement from "../../interfaces/IMovement";
import Notificacoes from "../../mixins/notificacoes";
import {
  CRIAR_MOVEMENT,
  DEFINIR_ITEMS,
  ATUALIZAR_MOVEMENT,
  DELETAR_MOVEMENT,
  DEFINIR_TYPEMOVEMENTS,
  DEFINIR_MOVEMENTS,
} from "../../store/tipo-actions";

export default defineComponent({
  name: "Movement-Component",
  data() {
    return {
      movementEdit: {} as IMovement,
    };
  },
  setup() {
    const store = useStore();
    return {
      movements: computed(() => store.state.movement.movements),
      items: computed(() => store.state.item.items),
      type_movements: computed(() => store.state.typeMovement.typeMovements),
    };
  },
  methods: {
    editarMovement(movement: IMovement) {
      this.movementEdit = movement;
      this.open();
    },
    novoMovement() {
      this.movementEdit = {} as IMovement;
      this.open();
    },
    async salvar() {
      if (!this.movementEdit.id || this.movementEdit.id == undefined) {
        console.log(this.movementEdit);
        await store
          .dispatch(CRIAR_MOVEMENT, this.movementEdit)
          .then(() => {
            Notificacoes.saveSucess(
              "Movement",
              `O movement ${this.movementEdit.description} foi cadastrado com sucesso`
            );
            this.fechar();
          })
          .catch((err) => {
            Notificacoes.saveError("Movement", "", err.response.data);
          });
      } else {
        if (this.movementEdit.id) {
          await store
            .dispatch(ATUALIZAR_MOVEMENT, this.movementEdit)
            .then(() => {
              Notificacoes.saveSucess(
                "Movement",
                `O movement ${this.movementEdit.description} foi atualizado com sucesso`
              );
              this.fechar();
            })
            .catch((err) => {
              Notificacoes.saveError("Movement", "", err.response.data);
            });
        }
      }
    },
    async deletar(movement: IMovement) {
      await store
        .dispatch(DELETAR_MOVEMENT, movement)
        .then(() => {
          this.fechar();
          window.location.reload();
          Notificacoes.deleteSucess("Movement", "");
        })
        .catch((err) => {
          Notificacoes.deleteError("Movement", "", err.response.data);
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
    store.dispatch(DEFINIR_MOVEMENTS);
    store.dispatch(DEFINIR_TYPEMOVEMENTS);
    store.dispatch(DEFINIR_ITEMS);
  },
  components: { Modal },
});
</script>
