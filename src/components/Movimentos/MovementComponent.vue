<template>
  <div class="content">
    <div class="box">
      <div class="buttons">
        <button class="button is-info" @click="novoMovement">
          <span class="icon is-small">
            <i class="fas fa-plus"></i>
          </span>
          <span>Novo</span>
        </button>
      </div>
    </div>
    <section class="section">
      <div class="columns">
        <div class="column">
          <div class="content">
            <div class="level-item has-text-centered">
              <div>
                <p class="title">Totais</p>
              </div>
            </div>
            <div class="card">
              <div class="card-content">
                <nav class="level is-mobile">
                  <div class="level-item has-text-centered">
                    <div>
                      <p class="heading">Entradas</p>
                      <p class="title">{{ totaisa[0] }}</p>
                    </div>
                  </div>
                  <div class="level-item has-text-centered">
                    <div>
                      <p class="heading">Saidas</p>
                      <p class="title">{{ totaisa[1] }}</p>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
          <div class="content">
            <div class="card">
              <div class="card-content">
                <nav class="level is-mobile">
                  <div class="level-item has-text-centered">
                    <div>
                      <p class="heading">Totais: Entrada</p>
                      <p class="title">{{ totaisa[2] }}</p>
                    </div>
                  </div>
                  <div class="level-item has-text-centered">
                    <div>
                      <p class="heading">Totais: Saida</p>
                      <p class="title">{{ totaisa[3] }}</p>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-8">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">Ultimas Movimentações</p>
              <button
                class="card-header-icon"
                aria-label="more options"
                @click="filtro"
              >
                <span class="icon">
                  <i
                    class="fas fa-angle-left"
                    aria-hidden="true"
                    v-if="!filtroAberto"
                  ></i>
                  <i
                    class="fas fa-angle-down"
                    aria-hidden="true"
                    v-if="filtroAberto"
                  ></i>
                </span>
              </button>
            </header>
            <div v-if="filtroAberto" class="columns section">
              <div class="column">
                <div class="field ">
                  <div class="control">
                    <input
                      v-model="filtros.valor"
                      class="input is-small is-rounded"
                      type="number"
                      placeholder="Quantidade"
                    />
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <div class="control">
                    <div class="select is-small is-rounded">
                      <select v-model="filtros.tipoMovimento">
                        <option value="">Movimento</option>
                        <option value="1">Entrada</option>
                        <option value="2">Saída</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <div class="control">
                    <div class="select is-small is-rounded">
                      <select v-model="filtros.tipoMovimento">
                        <option value="">Itens</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <div class="control">
                    <input v-model="filtros.data" class="input is-small" type="date" />
                  </div>
                </div>
              </div>
              <div class="column is-2">
                <div class="field">
                  <div class="control">
                    <button @click="aplicarFiltro" class="button is-primary is-small is-fullwidth">
                      Aplicar Filtro
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div class="card">
            <section class="section">
              <div
                class="card-content content-movements"
                v-for="(d, index) in dates"
                :key="index"
              >
                <p class="subtitle" v-if="d === formatDate(new Date())">Hoje</p>
                <p class="subtitle" v-if="d !== formatDate(new Date())">
                  {{ d }}
                </p>
                <div
                  class="content is-small"
                  v-for="mov in movements"
                  :key="mov.id"
                >
                  <div
                    class="columns is-mobile card-movement"
                    @click="editarMovement(mov)"
                    v-if="formatDate(new Date(mov.created_at)) == d"
                  >
                    <div class="column">
                      <div
                        class="tags has-addons is-rounded"
                        v-if="mov.type_movement.code == '2'"
                      >
                        <span class="tag is-danger is-light">Saida</span>
                        <span class="tag is-danger"
                          ><i class="fas fa-arrow-down"></i
                        ></span>
                      </div>
                      <div
                        class="tags has-addons are-rounded"
                        v-if="mov.type_movement.code == '1'"
                      >
                        <span class="tag is-link is-light">Entrada</span>
                        <span class="tag is-info"
                          ><i class="fas fa-arrow-up"></i
                        ></span>
                      </div>
                    </div>
                    <div class="column is-6">
                      <div class="content">
                        <div>
                          <div class="columns">
                            <div class="column">
                              <strong>{{ mov.item.name }}</strong>
                              <small> @johnsmith</small>
                              <p>
                                <small>
                                  {{ mov.description }}
                                </small>
                              </p>
                            </div>
                            <!--
                          <div class="column">
                            <span class="icon has-text-info">
                              <i class="far fa-calendar-check"></i>
                            </span>
                            <small>{{
                              formatDate(new Date(mov.created_at))
                            }}</small>
                          </div>
                          <div class="column">
                            <span class="icon has-text-link">
                              <i class="fas fa-calendar-plus"></i>
                            </span>
                            <small>{{
                              formatDate(new Date(mov.updated_at))
                            }}</small>
                          </div>
                        -->
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="column">
                      <div class="control">
                        <div class="tags has-addons are-medium">
                          <span class="tag">
                            <span
                              class="icon has-text-success"
                              v-if="mov.type_movement.code == '1'"
                            >
                              <i class="fas fa-plus"></i>
                            </span>
                            <span
                              class="icon has-text-danger"
                              v-if="mov.type_movement.code == '2'"
                            >
                              <i class="fas fa-minus"></i>
                            </span>
                          </span>
                          <span
                            class="tag is-danger is-light is-rounded"
                            v-if="mov.type_movement.code == '2'"
                            >{{ mov.quantity }}
                          </span>
                          <span
                            class="tag is-success is-light is-rounded"
                            v-if="mov.type_movement.code == '1'"
                            >{{ mov.quantity }}</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
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
              <label class="label" for="description">*Descrição</label>
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
import { FormatCustomDate } from "../../util/formatCustomDate";

export default defineComponent({
  name: "Movement-Component",
  data() {
    return {
      movementEdit: {} as IMovement,
      dates: [] as string[],
      totais: [0, 0, 0, 0],
      totaisa: [0, 0, 0, 0],
      filtroAberto: true,
      filtros: {
        valor: "",
        tipoMovimento: "",
        data: "",
      },
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
    formatDate(date: Date) {
      return new FormatCustomDate().date(date);
    },
    editarMovement(movement: IMovement) {
      this.movementEdit = movement;
      this.open();
    },
    novoMovement() {
      this.movementEdit = {} as IMovement;
      this.open();
    },
    filtro() {
      this.filtroAberto = !this.filtroAberto;
    },
    aplicarFiltro() {
      // Lógica para aplicar o filtro
      console.log("Filtro aplicado:", this.filtro);
    },
    getDatesMovs() {
      this.movements.map((mov: IMovement) => {
        const date = this.formatDate(new Date(mov.created_at));
        if (!this.dates.includes(date)) {
          this.dates.push(date);
        }
      });
    },
    sleep(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    async animateTotais() {
      this.totais.forEach(async (v, i) => {
        for (let b = 0; b <= v; b++) {
          this.totaisa[i] = b;
          await this.sleep(20);
        }
      });
    },
    calcTotais() {
      this.movements.map((mov: IMovement) => {
        if (mov.type_movement.code == "1") {
          this.totais[0] += 1;
          this.totais[2] += mov.quantity;
        }
        if (mov.type_movement.code == "2") {
          this.totais[1] += 1;
          this.totais[3] += mov.quantity;
        }
      });
      this.animateTotais();
    },
    async salvar() {
      if (!this.movementEdit.id || this.movementEdit.id == undefined) {
        await store
          .dispatch(CRIAR_MOVEMENT, this.movementEdit)
          .then(() => {
            window.location.reload();
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
              window.location.reload();
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
    store.dispatch(DEFINIR_MOVEMENTS).then(() => {
      this.getDatesMovs(), this.calcTotais();
    });
    store.dispatch(DEFINIR_TYPEMOVEMENTS);
    store.dispatch(DEFINIR_ITEMS);
  },
  components: { Modal },
});
</script>

<style lang="css">
.content-movements {
  padding: 0px 24px;
}
.card-movement {
  background-color: #eee;
  border-radius: 15px;
  cursor: pointer;
  transition: transform 0.3s;
  height: 50px;
}
.card-movement:hover {
  transform: scale(1.01);
}
</style>
