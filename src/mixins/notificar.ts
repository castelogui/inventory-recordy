import { tipoNotificacao } from "@/interfaces/INotificacao";
import { store } from "@/store";
import { NOTIFICAR } from "@/store/tipo-actions";

export const notificacaoMixin = {
  methods: {
    notificar(tipo: tipoNotificacao, titulo: string, texto: string): void {
      store.dispatch(NOTIFICAR, {
        titulo,
        texto,
        tipo,
      });
    },
  },
};
