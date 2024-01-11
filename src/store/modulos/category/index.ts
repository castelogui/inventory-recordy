import ICategory from "@/interfaces/ICategory";
import categoryDataSrv from "@/services/categoryDataSrv";
import { Estado } from "@/store";
import {
  ATUALIZAR_CATEGORY,
  CRIAR_CATEGORY,
  DEFINIR_CATEGORIES,
  DEFINIR_CATEGORY,
  DELETAR_CATEGORY,
  LIMPAR_LISTA_CATEGORY,
} from "@/store/tipo-actions";
import {
  ATUALIZA_CATEGORY,
  CRIA_CATEGORY,
  DEFINE_CATEGORIES,
  DEFINE_CATEGORY,
  DELETA_CATEGORY,
  LIMPA_LISTA_CATEGORY,
} from "@/store/tipo-mutation";
import { Module } from "vuex";

export interface EstadoCategory {
  categories: ICategory[];
}

export const category: Module<EstadoCategory, Estado> = {
  mutations: {
    [DEFINE_CATEGORIES](state, categories: ICategory[]): void {
      state.categories = categories;
    },
    [DEFINE_CATEGORY](state, category: ICategory): void {
      state.categories = [];
      state.categories = [category];
    },
    [LIMPA_LISTA_CATEGORY](state): void {
      state.categories = state.categories.filter((c) => c.id == "0");
    },
    [CRIA_CATEGORY](state, category: ICategory): void {
      state.categories.push(category);
    },
    [DELETA_CATEGORY](state, cat: ICategory): void {
      state.categories = state.categories.filter((c) => cat != c);
    },
    [ATUALIZA_CATEGORY](state, cat: ICategory): void {
      const index = state.categories.findIndex((c) => c == cat);
      state.categories[index] = cat;
    },
  },
  actions: {
    async [DEFINIR_CATEGORIES]({ commit }) {
      const response = await categoryDataSrv.getAll();
      commit(DEFINE_CATEGORIES, response.data);
    },
    async [DEFINIR_CATEGORY]({ commit }, codigo: string) {
      const response = await categoryDataSrv.getOne(codigo);
      commit(DEFINE_CATEGORY, response.data);
    },
    async [LIMPAR_LISTA_CATEGORY]({ commit }) {
      commit(LIMPA_LISTA_CATEGORY);
    },
    async [CRIAR_CATEGORY]({ commit }, category: ICategory) {
      const response = await categoryDataSrv.create(category);
      commit(CRIA_CATEGORY, response.data);
    },
    async [DELETAR_CATEGORY]({ commit }, category: ICategory) {
      await categoryDataSrv.delete(category.id);
      commit(DELETA_CATEGORY);
    },
    async [ATUALIZAR_CATEGORY]({ commit }, category: ICategory) {
      await categoryDataSrv.update(category.id, category);
      commit(ATUALIZA_CATEGORY);
    },
  },
};
