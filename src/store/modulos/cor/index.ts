import IColor from "@/interfaces/IColor";
import corDataSrv from "@/services/corDataSrv";
import { Estado } from "@/store";
import {
  ATUALIZAR_COR,
  CRIAR_COR,
  DEFINIR_CORES,
  DEFINIR_COR,
  DELETAR_COR,
  LIMPAR_LISTA_COR,
} from "@/store/tipo-actions";
import {
  ATUALIZA_COR,
  CRIA_COR,
  DEFINE_CORES,
  DEFINE_COR,
  DELETA_COR,
  LIMPA_LISTA_COR,
} from "@/store/tipo-mutation";
import { Module } from "vuex";

export interface EstadoColor {
  cores: IColor[];
}

export const color: Module<EstadoColor, Estado> = {
  mutations: {
    [DEFINE_CORES](state, cores: IColor[]): void {
      state.cores = cores;
    },
    [DEFINE_COR](state, color: IColor): void {
      state.cores = [];
      state.cores = [color];
    },
    [LIMPA_LISTA_COR](state): void {
      state.cores = state.cores.filter((c) => c.id == "0");
    },
    [CRIA_COR](state, color: IColor): void {
      state.cores.push(color);
    },
    [DELETA_COR](state, cor: IColor): void {
      state.cores = state.cores.filter((c) => cor != c);
    },
    [ATUALIZA_COR](state, cor: IColor): void {
      const index = state.cores.findIndex((c) => c == cor);
      state.cores[index] = cor;
    },
  },
  actions: {
    async [DEFINIR_CORES]({ commit }) {
      const response = await corDataSrv.getAll();
      commit(DEFINE_CORES, response.data);
    },
    async [DEFINIR_COR]({ commit }, codigo: string) {
      const response = await corDataSrv.getOne(codigo);
      commit(DEFINE_COR, response.data);
    },
    async [LIMPAR_LISTA_COR]({ commit }) {
      commit(LIMPA_LISTA_COR);
    },
    async [CRIAR_COR]({ commit }, color: IColor) {
      const response = await corDataSrv.create(color);
      commit(CRIA_COR, response.data);
    },
    async [DELETAR_COR]({ commit }, color: IColor) {
      await corDataSrv.delete(color.id);
      commit(DELETA_COR);
    },
    async [ATUALIZAR_COR]({ commit }, color: IColor) {
      await corDataSrv.update(color.id, color);
      commit(ATUALIZA_COR);
    },
  },
};
