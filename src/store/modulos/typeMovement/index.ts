import ITypeMovement from "@/interfaces/ITypeMovement";
import typeMovementDataSrv from "@/services/typeMovementDataSrv";
import { Estado } from "@/store";
import {
  DEFINIR_TYPEMOVEMENT,
  LIMPAR_LISTA_TYPEMOVEMENT,
  CRIAR_TYPEMOVEMENT,
  DELETAR_TYPEMOVEMENT,
  ATUALIZAR_TYPEMOVEMENT,
  DEFINIR_TYPEMOVEMENTS,
} from "@/store/tipo-actions";
import {
  ATUALIZA_TYPEMOVEMENT,
  CRIA_TYPEMOVEMENT,
  DEFINE_TYPEMOVEMENT,
  DEFINE_TYPEMOVEMENTS,
  DELETA_TYPEMOVEMENT,
  LIMPA_LISTA_TYPEMOVEMENT,
} from "@/store/tipo-mutation";
import { Module } from "vuex";

export interface EstadoTypeMovement {
  typeMovements: ITypeMovement[];
}

export const typeMovement: Module<EstadoTypeMovement, Estado> = {
  mutations: {
    [DEFINE_TYPEMOVEMENTS](state, typeMovements: ITypeMovement[]): void {
      state.typeMovements = typeMovements;
    },
    [DEFINE_TYPEMOVEMENT](state, typeMovement: ITypeMovement): void {
      state.typeMovements = [];
      state.typeMovements = [typeMovement];
    },
    [LIMPA_LISTA_TYPEMOVEMENT](state): void {
      state.typeMovements = state.typeMovements.filter((t) => t.id == "0");
    },
    [CRIA_TYPEMOVEMENT](state, typeMovement: ITypeMovement): void {
      state.typeMovements.push(typeMovement);
    },
    [DELETA_TYPEMOVEMENT](state, type: ITypeMovement): void {
      state.typeMovements = state.typeMovements.filter((t) => type != t);
    },
    [ATUALIZA_TYPEMOVEMENT](state, type: ITypeMovement): void {
      const index = state.typeMovements.findIndex((t) => t == type);
      state.typeMovements[index] = type;
    },
  },
  actions: {
    async [DEFINIR_TYPEMOVEMENTS]({ commit }) {
      const response = await typeMovementDataSrv.getAll();
      commit(DEFINE_TYPEMOVEMENTS, response.data);
    },
    async [DEFINIR_TYPEMOVEMENT]({ commit }, codigo: string) {
      const response = await typeMovementDataSrv.getOne(codigo);
      commit(DEFINE_TYPEMOVEMENT, response.data);
    },
    async [LIMPAR_LISTA_TYPEMOVEMENT]({ commit }) {
      commit(LIMPA_LISTA_TYPEMOVEMENT);
    },
    async [CRIAR_TYPEMOVEMENT]({ commit }, typeMovement: ITypeMovement) {
      const response = await typeMovementDataSrv.create(typeMovement);
      commit(CRIA_TYPEMOVEMENT, response.data);
    },
    async [DELETAR_TYPEMOVEMENT]({ commit }, typeMovement: ITypeMovement) {
      await typeMovementDataSrv.delete(typeMovement.id);
      commit(DELETA_TYPEMOVEMENT);
    },
    async [ATUALIZAR_TYPEMOVEMENT]({ commit }, typeMovement: ITypeMovement) {
      await typeMovementDataSrv.update(typeMovement.id, typeMovement);
      commit(ATUALIZA_TYPEMOVEMENT);
    },
  },
};
