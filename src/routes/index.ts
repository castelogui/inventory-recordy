import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Registros from "@/views/Registros.vue";
import LoginView from "@/views/LoginView.vue";
//import FuncionarioComponentVue from "@/components/Funcionarios/FuncionarioComponent.vue";
//import DepartamentoComponentVue from "@/components/Departamentos/DepartamentoComponent.vue";
//import MotivoComponentVue from "@/components/Motivos/MotivoComponent.vue";
//import RegistroComponent from "@/components/Registros/RegistroComponent.vue";
import CategoryComponent from "@/components/Categorias/CategoryComponent.vue";
import ColorComponent from "@/components/Cores/ColorComponent.vue";
import ItemComponent from "@/components/Items/ItemComponent.vue";
import TypeMovementComponent from "@/components/TypeMovement/TypeMovementComponent.vue";
import MovementComponent from "@/components/Movimentos/MovementComponent.vue";

const rotas: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Registros",
    component: Registros,
    children: [
      {
        path: "/movements",
        name: "Movimentos",
        component: MovementComponent,
      },
      {
        path: "/categories",
        name: "Categorias",
        component: CategoryComponent,
      },
      {
        path: "/cores",
        name: "Cores",
        component: ColorComponent,
      },
      {
        path: "/items",
        name: "Items",
        component: ItemComponent,
      },
      {
        path: "/type-movement",
        name: "Tipos De Movimento",
        component: TypeMovementComponent,
      },
      //{
      //  path: "/",
      //  name: "Registros",
      //  component: RegistroComponent,
      //},
      //{
      //  path: "/funcionarios",
      //  name: "Funcionarios",
      //  component: FuncionarioComponentVue,
      //},
      //{
      //  path: "/departamentos",
      //  name: "Departamentos",
      //  component: DepartamentoComponentVue,
      //  props: true
      //},
      //{
      //  path: "/motivos",
      //  name: "Motivos",
      //  component: MotivoComponentVue,
      //},
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
];

const roteador = createRouter({
  history: createWebHashHistory(),
  routes: rotas,
});

export default roteador;
