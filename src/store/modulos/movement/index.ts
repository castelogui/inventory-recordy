import IMovement from "@/interfaces/IMovement";
import movementDataSrv from "@/services/movementDataSrv";
import { Estado } from "@/store";
import {
  DEFINIR_MOVEMENT,
  LIMPAR_LISTA_MOVEMENT,
  CRIAR_MOVEMENT,
  DELETAR_MOVEMENT,
  ATUALIZAR_MOVEMENT,
  DEFINIR_MOVEMENTS,
} from "@/store/tipo-actions";
import {
  ATUALIZA_MOVEMENT,
  CRIA_MOVEMENT,
  DEFINE_MOVEMENT,
  DEFINE_MOVEMENTS,
  DELETA_MOVEMENT,
  LIMPA_LISTA_MOVEMENT,
} from "@/store/tipo-mutation";
import { Module } from "vuex";

export interface EstadoMovement {
  movements: IMovement[];
}

export const movement: Module<EstadoMovement, Estado> = {
  mutations: {
    [DEFINE_MOVEMENTS](state, movements: IMovement[]): void {
      state.movements = movements;
    },
    [DEFINE_MOVEMENT](state, movement: IMovement): void {
      state.movements = [];
      state.movements = [movement];
    },
    [LIMPA_LISTA_MOVEMENT](state): void {
      state.movements = state.movements.filter((m) => m.id == "0");
    },
    [CRIA_MOVEMENT](state, movement: IMovement): void {
      state.movements.push(movement);
    },
    [DELETA_MOVEMENT](state, mov: IMovement): void {
      state.movements = state.movements.filter((m) => mov != m);
    },
    [ATUALIZA_MOVEMENT](state, mov: IMovement): void {
      const index = state.movements.findIndex((m) => m == mov);
      state.movements[index] = mov;
    },
  },
  actions: {
    async [DEFINIR_MOVEMENTS]({ commit }) {
      const response = await movementDataSrv.getAll();
      commit(DEFINE_MOVEMENTS, response.data);
    },
    async [DEFINIR_MOVEMENT]({ commit }, codigo: string) {
      const response = await movementDataSrv.getOne(codigo);
      commit(DEFINE_MOVEMENT, response.data);
    },
    async [LIMPAR_LISTA_MOVEMENT]({ commit }) {
      commit(LIMPA_LISTA_MOVEMENT);
    },
    async [CRIAR_MOVEMENT]({ commit }, movement: IMovement) {
      const response = await movementDataSrv.create(movement);
      commit(CRIA_MOVEMENT, response.data);
    },
    async [DELETAR_MOVEMENT]({ commit }, movement: IMovement) {
      await movementDataSrv.delete(movement.id);
      commit(DELETA_MOVEMENT);
    },
    async [ATUALIZAR_MOVEMENT]({ commit }, movement: IMovement) {
      await movementDataSrv.update(movement.id, movement);
      commit(ATUALIZA_MOVEMENT);
    },
  },
};
