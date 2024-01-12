import IItem from "@/interfaces/IItem";
import itemDataSrv from "@/services/itemDataSrv";
import { Estado } from "@/store";
import {
  DEFINIR_ITEMS,
  DEFINIR_ITEM,
  LIMPAR_LISTA_ITEM,
  CRIAR_ITEM,
  DELETAR_ITEM,
  ATUALIZAR_ITEM,
} from "@/store/tipo-actions";
import {
  ATUALIZA_ITEM,
  CRIA_ITEM,
  DEFINE_ITEM,
  DEFINE_ITEMS,
  DELETA_ITEM,
  LIMPA_LISTA_ITEM,
} from "@/store/tipo-mutation";
import { Module } from "vuex";

export interface EstadoItem {
  items: IItem[];
}

export const item: Module<EstadoItem, Estado> = {
  mutations: {
    [DEFINE_ITEMS](state, items: IItem[]): void {
      state.items = items;
    },
    [DEFINE_ITEM](state, item: IItem): void {
      state.items = [];
      state.items = [item];
    },
    [LIMPA_LISTA_ITEM](state): void {
      state.items = state.items.filter((i) => i.id == "0");
    },
    [CRIA_ITEM](state, item: IItem): void {
      state.items.push(item);
    },
    [DELETA_ITEM](state, it: IItem): void {
      state.items = state.items.filter((i) => it != i);
    },
    [ATUALIZA_ITEM](state, it: IItem): void {
      const index = state.items.findIndex((i) => i == it);
      state.items[index] = it;
    },
  },
  actions: {
    async [DEFINIR_ITEMS]({ commit }) {
      const response = await itemDataSrv.getAll();
      commit(DEFINE_ITEMS, response.data);
    },
    async [DEFINIR_ITEM]({ commit }, codigo: string) {
      const response = await itemDataSrv.getOne(codigo);
      commit(DEFINE_ITEM, response.data);
    },
    async [LIMPAR_LISTA_ITEM]({ commit }) {
      commit(LIMPA_LISTA_ITEM);
    },
    async [CRIAR_ITEM]({ commit }, item: IItem) {
      const response = await itemDataSrv.create(item);
      commit(CRIA_ITEM, response.data);
    },
    async [DELETAR_ITEM]({ commit }, item: IItem) {
      await itemDataSrv.delete(item.id);
      commit(DELETA_ITEM);
    },
    async [ATUALIZAR_ITEM]({ commit }, item: IItem) {
      await itemDataSrv.update(item.id, item);
      commit(ATUALIZA_ITEM);
    },
  },
};
