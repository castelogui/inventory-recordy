import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";
import { EstadoDepartamento, departamento } from "./modulos/departamento";
import { EstadoFuncionario, funcionario } from "./modulos/funcionario";
import { EstadoMotivo, motivo } from "./modulos/motivo";
import { EstadoRegistro, registro } from "./modulos/registro";
import { category, EstadoCategory } from "./modulos/category";
import { EstadoNotificacao, notificacao } from "./modulos/notificacao";
import { color, EstadoColor } from "./modulos/cor";
import { EstadoItem, item } from "./modulos/item";

export interface Estado {
  funcionario: EstadoFuncionario;
  departamento: EstadoDepartamento;
  motivo: EstadoMotivo;
  registro: EstadoRegistro;
  category: EstadoCategory;
  notificacao: EstadoNotificacao;
  color: EstadoColor;
  item: EstadoItem
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
  state: {
    funcionario: {
      funcionarios: [],
    },
    departamento: {
      departamentos: [],
    },
    motivo: {
      motivos: [],
    },
    registro: {
      registros: [],
    },
    category: {
      categories: [],
    },
    notificacao: {
      notificacoes: [],
    },
    color: {
      cores: [],
    },
    item: {
      items: []
    }

  },
  modules: {
    departamento,
    funcionario,
    motivo,
    registro,
    category,
    notificacao,
    color,
    item
  },
});

export function useStore(): Store<Estado> {
  return vuexUseStore(key);
}
