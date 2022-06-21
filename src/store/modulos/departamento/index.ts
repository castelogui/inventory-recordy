import IDepartamento from "@/interfaces/IDepartamento";
import departamentosDataSrv from "@/services/departamentosDataSrv";
import { Estado } from "@/store";
import {
  ATUALIZAR_DEPARTAMENTO,
  CRIAR_DEPARTAMENTO,
  DEFINIR_DEPARTAMENTOS,
  DEFINIR_UM_DEPARTAMENTO,
  DELETAR_DEPARTAMENTO,
  LIMPAR_LISTA_DEPARTAMENTO,
} from "@/store/tipo-actions";
import {
  ATUALIZA_DEPARTAMENTO,
  CRIA_DEPARTAMENTO,
  DEFINE_DEPARTAMENTOS,
  DEFINE_UM_DEPARTAMENTO,
  DELETA_DEPARTAMENTO,
  LIMPA_LISTA_DEPARTAMENTO,
} from "@/store/tipo-mutation";
import { Module } from "vuex";

export interface EstadoDepartamento {
  departamentos: IDepartamento[];
}

export const departamento: Module<EstadoDepartamento, Estado> = {
  mutations: {
    [DEFINE_DEPARTAMENTOS](state, departamentos: IDepartamento[]): void {
      state.departamentos = departamentos;
    },
    [DEFINE_UM_DEPARTAMENTO](state, departamento: IDepartamento): void {
      state.departamentos = [];
      state.departamentos = [departamento];
    },
    [LIMPA_LISTA_DEPARTAMENTO](state): void {
      state.departamentos = state.departamentos.filter((d) => d._id == "0");
    },
    [CRIA_DEPARTAMENTO](state, departamento: IDepartamento): void {
      state.departamentos.push(departamento);
    },
    [DELETA_DEPARTAMENTO](state, dep: IDepartamento): void {
      state.departamentos = state.departamentos.filter((d) => dep != d);
    },
    [ATUALIZA_DEPARTAMENTO](state, dep: IDepartamento): void {
      const index = state.departamentos.findIndex((d) => d == dep);
      state.departamentos[index] = dep;
    },
  },
  actions: {
    async [DEFINIR_DEPARTAMENTOS]({ commit }) {
      const response = await departamentosDataSrv.getAll();
      commit(DEFINE_DEPARTAMENTOS, response.data);
    },
    async [DEFINIR_UM_DEPARTAMENTO]({ commit }, codigo: string) {
      const response = await departamentosDataSrv.getOne(codigo);
      commit(DEFINE_UM_DEPARTAMENTO, response.data);
    },
    async [LIMPAR_LISTA_DEPARTAMENTO]({ commit }) {
      commit(LIMPA_LISTA_DEPARTAMENTO);
    },
    async [CRIAR_DEPARTAMENTO]({ commit }, departamento: IDepartamento) {
      const response = await departamentosDataSrv.create(departamento);
      commit(CRIA_DEPARTAMENTO, response.data);
    },
    async [DELETAR_DEPARTAMENTO]({ commit }, departamento: IDepartamento) {
      await departamentosDataSrv.delete(departamento.codigo);
      commit(DELETA_DEPARTAMENTO);
    },
    async [ATUALIZAR_DEPARTAMENTO]({ commit }, departamento: IDepartamento) {
      await departamentosDataSrv.update(departamento._id, departamento);
      commit(ATUALIZA_DEPARTAMENTO);
    },
  },
};
