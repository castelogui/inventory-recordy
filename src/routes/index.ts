import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Registros from "@/views/Registros.vue";
import FuncionarioComponentVue from "@/components/Funcionarios/FuncionarioComponent.vue";
import DepartamentoComponentVue from "@/components/Departamentos/DepartamentoComponent.vue";
import MotivoComponentVue from "@/components/Motivos/MotivoComponent.vue";
import RegistroComponent from "@/components/Registros/RegistroComponent.vue";

const rotas: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Registros",
    component: Registros,
    children: [
      {
        path: "/",
        name: "Registros",
        component: RegistroComponent,
      },
      {
        path: "/funcionarios",
        name: "Funcionarios",
        component: FuncionarioComponentVue,
      },
      {
        path: "/departamentos",
        name: "Departamentos",
        component: DepartamentoComponentVue,
        props: true
      },
      {
        path: "/motivos",
        name: "Motivos",
        component: MotivoComponentVue,
      },
    ],
  },
];

const roteador = createRouter({
  history: createWebHashHistory(),
  routes: rotas,
});

export default roteador;
