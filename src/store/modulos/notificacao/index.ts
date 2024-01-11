import { INotificacao } from "@/interfaces/INotificacao";
import { Estado } from "@/store";
import { NOTIFICAR } from "@/store/tipo-actions";
import { NOTIFICA } from "@/store/tipo-mutation";
import { Module } from "vuex";

export interface EstadoNotificacao {
  notificacoes: INotificacao[];
}

export const notificacao: Module<EstadoNotificacao, Estado> = {
  mutations: {
    [NOTIFICA](state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime();
      state.notificacoes = [novaNotificacao]
      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(
          (notificacao) => notificacao.id != novaNotificacao.id
        );
      }, 5000);
    },
  },
  actions: {
    [NOTIFICAR]({commit}, novaNotificacao: INotificacao){
      commit(NOTIFICA, novaNotificacao)
    }
  }
};
