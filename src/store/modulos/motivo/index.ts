import IMotivo from "@/interfaces/IMotivo";
import motivosDataSrv from "@/services/motivosDataSrv";
import { Estado } from "@/store";
import {
  ATUALIZAR_MOTIVO,
  CRIAR_MOTIVO,
  DEFINIR_MOTIVOS,
  DEFINIR_UM_MOTIVO,
  DELETAR_MOTIVO,
  LIMPAR_LISTA_MOTIVO,
} from "@/store/tipo-actions";
import {
  ATUALIZA_MOTIVO,
  CRIA_MOTIVO,
  DEFINE_MOTIVOS,
  DEFINE_UM_MOTIVO,
  DELETA_MOTIVO,
  LIMPA_LISTA_MOTIVO,
} from "@/store/tipo-mutation";
import { Module } from "vuex";

export interface EstadoMotivo {
  motivos: IMotivo[];
}

export const motivo: Module<EstadoMotivo, Estado> = {
  mutations: {
    [DEFINE_MOTIVOS](state, motivos: IMotivo[]): void {
      state.motivos = motivos;
    },
    [DEFINE_UM_MOTIVO](state, motivo: IMotivo): void {
      state.motivos = [];
      state.motivos = [motivo];
    },
    [LIMPA_LISTA_MOTIVO](state): void {
      state.motivos = state.motivos.filter((d) => d._id == "0");
    },
    [CRIA_MOTIVO](state, motivo: IMotivo): void {
      state.motivos.push(motivo);
    },
    [DELETA_MOTIVO](state, mot: IMotivo): void {
      state.motivos = state.motivos.filter((d) => mot != d);
    },
    [ATUALIZA_MOTIVO](state, mot: IMotivo): void {
      const index = state.motivos.findIndex((d) => d == mot);
      state.motivos[index] = mot;
    },
  },
  actions: {
    async [DEFINIR_MOTIVOS]({ commit }) {
      const response = await motivosDataSrv.getAll();
      commit(DEFINE_MOTIVOS, response.data);
    },
    async [DEFINIR_UM_MOTIVO]({ commit }, codigo: string) {
      const response = await motivosDataSrv.getOne(codigo);
      commit(DEFINE_UM_MOTIVO, response.data);
    },
    async [LIMPAR_LISTA_MOTIVO]({ commit }) {
      commit(LIMPA_LISTA_MOTIVO);
    },
    async [CRIAR_MOTIVO]({ commit }, motivo: IMotivo) {
      const response = await motivosDataSrv.create(motivo);
      commit(CRIA_MOTIVO, response.data);
    },
    async [DELETAR_MOTIVO]({ commit }, motivo: IMotivo) {
      await motivosDataSrv.delete(motivo.codigo);
      commit(DELETA_MOTIVO);
    },
    async [ATUALIZAR_MOTIVO]({ commit }, motivo: IMotivo) {
      await motivosDataSrv.update(motivo._id, motivo);
      commit(ATUALIZA_MOTIVO);
    },
  },
};
