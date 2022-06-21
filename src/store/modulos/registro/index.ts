import IRegistro from "@/interfaces/IRegistro";
import registrosDataSrv from "@/services/registrosDataSrv";
import { Estado } from "@/store";
import {
  ATUALIZAR_REGISTRO,
  CRIAR_REGISTRO,
  DEFINIR_REGISTROS,
  DEFINIR_UM_REGISTRO,
  DELETAR_REGISTRO,
  LIMPAR_LISTA_REGISTRO,
} from "@/store/tipo-actions";
import {
  ATUALIZA_REGISTRO,
  CRIA_REGISTRO,
  DEFINE_REGISTROS,
  DEFINE_UM_REGISTRO,
  DELETA_REGISTRO,
  LIMPA_LISTA_REGISTRO,
} from "@/store/tipo-mutation";
import { Module } from "vuex";

export interface EstadoRegistro {
  registros: IRegistro[];
}

export const registro: Module<EstadoRegistro, Estado> = {
  mutations: {
    [DEFINE_REGISTROS](state, registros: IRegistro[]): void {
      state.registros = registros;
    },
    [DEFINE_UM_REGISTRO](state, registro: IRegistro): void {
      state.registros = [];
      state.registros = [registro];
    },
    [LIMPA_LISTA_REGISTRO](state): void {
      state.registros = state.registros.filter((d) => d._id == "0");
    },
    [CRIA_REGISTRO](state, registro: IRegistro): void {
      state.registros.push(registro);
    },
    [DELETA_REGISTRO](state, reg: IRegistro): void {
      state.registros = state.registros.filter((d) => reg != d);
    },
    [ATUALIZA_REGISTRO](state, reg: IRegistro): void {
      const index = state.registros.findIndex((d) => d == reg);
      state.registros[index] = reg;
    },
  },
  actions: {
    async [DEFINIR_REGISTROS]({ commit }) {
      const response = await registrosDataSrv.getAll();
      commit(DEFINE_REGISTROS, response.data);
    },
    async [DEFINIR_UM_REGISTRO]({ commit }, codigo: string) {
      const response = await registrosDataSrv.getOne(codigo);
      commit(DEFINE_UM_REGISTRO, response.data);
    },
    async [LIMPAR_LISTA_REGISTRO]({ commit }) {
      commit(LIMPA_LISTA_REGISTRO);
    },
    async [CRIAR_REGISTRO]({ commit }, registro: IRegistro) {
      const response = await registrosDataSrv.create(registro);
      commit(CRIA_REGISTRO, response.data);
    },
    async [DELETAR_REGISTRO]({ commit }, registro: IRegistro) {
      await registrosDataSrv.delete(registro._id);
      commit(DELETA_REGISTRO);
    },
    async [ATUALIZAR_REGISTRO]({ commit }, registro: IRegistro) {
      await registrosDataSrv.update(registro._id, registro);
      commit(ATUALIZA_REGISTRO);
    },
  },
};
