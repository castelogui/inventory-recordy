import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";
import { EstadoDepartamento, departamento } from "./modulos/departamento";
import { EstadoFuncionario, funcionario } from "./modulos/funcionario";
import { EstadoMotivo, motivo } from "./modulos/motivo";
import { EstadoRegistro, registro } from "./modulos/registro";

export interface Estado {
  funcionario: EstadoFuncionario;
  departamento: EstadoDepartamento;
  motivo: EstadoMotivo;
  registro: EstadoRegistro;
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
  },
  modules: {
    departamento,
    funcionario,
    motivo,
    registro,
  },
});

export function useStore(): Store<Estado> {
  return vuexUseStore(key);
}
