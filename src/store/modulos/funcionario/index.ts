import IFuncionario from "@/interfaces/IFuncionario";
import funcionariosDataSrv from "@/services/funcionariosDataSrv";
import { Estado } from "@/store";
import {
  ATUALIZAR_FUNCIONARIO,
  CRIAR_FUNCIONARIO,
  DEFINIR_FUNCIONARIOS,
  DEFINIR_UM_FUNCIONARIO,
  DELETAR_FUNCIONARIO,
  LIMPAR_LISTA_FUNCIONARIO,
} from "@/store/tipo-actions";
import {
  ATUALIZA_FUNCIONARIO,
  CRIA_FUNCIONARIO,
  DEFINE_FUNCIONARIOS,
  DEFINE_UM_FUNCIONARIO,
  DELETA_FUNCIONARIO,
  LIMPA_LISTA_FUNCIONARIO,
} from "@/store/tipo-mutation";
import { Module } from "vuex";

export interface EstadoFuncionario {
  funcionarios: IFuncionario[];
}

export const funcionario: Module<EstadoFuncionario, Estado> = {
  mutations: {
    [DEFINE_FUNCIONARIOS](state, funcionarios: IFuncionario[]): void {
      state.funcionarios = funcionarios;
    },
    [DEFINE_UM_FUNCIONARIO](state, funcionario: IFuncionario): void {
      state.funcionarios = [];
      state.funcionarios = [funcionario];
    },
    [LIMPA_LISTA_FUNCIONARIO](state): void {
      state.funcionarios = state.funcionarios.filter((d) => d._id == "0");
    },
    [CRIA_FUNCIONARIO](state, funcionario: IFuncionario): void {
      state.funcionarios.push(funcionario);
    },
    [DELETA_FUNCIONARIO](state, fun: IFuncionario): void {
      state.funcionarios = state.funcionarios.filter((d) => fun != d);
    },
    [ATUALIZA_FUNCIONARIO](state, fun: IFuncionario): void {
      const index = state.funcionarios.findIndex((d) => d == fun);
      state.funcionarios[index] = fun;
    },
  },
  actions: {
    async [DEFINIR_FUNCIONARIOS]({ commit }) {
      const response = await funcionariosDataSrv.getAll();
      commit(DEFINE_FUNCIONARIOS, response.data);
    },
    async [DEFINIR_UM_FUNCIONARIO]({ commit }, codigo: string) {
      const response = await funcionariosDataSrv.getOne(codigo);
      commit(DEFINE_UM_FUNCIONARIO, response.data);
    },
    async [LIMPAR_LISTA_FUNCIONARIO]({ commit }) {
      commit(LIMPA_LISTA_FUNCIONARIO);
    },
    async [CRIAR_FUNCIONARIO]({ commit }, funcionario: IFuncionario) {
      const response = await funcionariosDataSrv.create(funcionario);
      commit(CRIA_FUNCIONARIO, response.data);
    },
    async [DELETAR_FUNCIONARIO]({ commit }, funcionario: IFuncionario) {
      await funcionariosDataSrv.delete(funcionario.codigo);
      commit(DELETA_FUNCIONARIO);
    },
    async [ATUALIZAR_FUNCIONARIO]({ commit }, funcionario: IFuncionario) {
      await funcionariosDataSrv.update(funcionario._id, funcionario);
      commit(ATUALIZA_FUNCIONARIO);
    },
  },
};
