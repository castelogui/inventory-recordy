<template>
  <div class="content">
    <div>
      <div class="buttons">
        <div class="button is-info" @click="novoFun()">
          <span class="icon is-small">
            <i class="fas fa-plus"></i>
          </span>
          <span>Novo</span>
        </div>
      </div>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Codigo</th>
          <th>Nome</th>
          <th>Sobrenome</th>
          <th>Departamento</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th>Codigo</th>
          <th>Nome</th>
          <th>Sobrenome</th>
          <th>Departamento</th>
          <th>Opções</th>
        </tr>
      </tfoot>
      <tbody v-for="(fun, i) in funcionarios" :key="i">
        <tr>
          <th>{{ fun.codigo }}</th>
          <td v-if="$route.path == '/'">{{ fun.nome }} {{ fun.sobrenome }}</td>
          <td>{{ fun.nome }}</td>
          <td>{{ fun.sobrenome }}</td>
          <td>
            {{ fun.departamento.codigo }}
            {{ fun.departamento.nome }}
          </td>
          <td>
            <span class="button is-small is-info" @click="editarFun(fun)">
              <i class="fa fa-pen"></i>
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <Modal>
      <template #content>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="Codigo"
            v-model="funcionarioEdit.codigo"
          />
          <input
            class="input"
            type="text"
            placeholder="Nome"
            v-model="funcionarioEdit.nome"
          />
          <input
            class="input"
            type="text"
            placeholder="Sobrenome"
            v-model="funcionarioEdit.sobrenome"
          />
          <div class="select">
            <select class="select item" v-model="dep">
              <option v-for="(d, id) in departamentos" :key="id">
                {{ d.nome }}
              </option>
            </select>
          </div>
        </div>
      </template>
      <template #options>
        <button class="button is-success" @click="salvar">Save</button>
        <button class="button" @click="fechar">Cancel</button>
        <button class="button is-danger" @click="deletar(funcionarioEdit)">
          Deletar
        </button>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { store } from "../../store";
import {
  ATUALIZAR_FUNCIONARIO,
  CRIAR_FUNCIONARIO,
  DEFINIR_DEPARTAMENTOS,
  DEFINIR_FUNCIONARIOS,
  DELETAR_FUNCIONARIO,
} from "../../store/tipo-actions";
import { defineComponent, computed } from "vue";
import { useStore } from "../../store";
import Modal from "../Modal.vue";
import IFuncionario from "../../interfaces/IFuncionario";

export default defineComponent({
  name: "Funcionario-Component",
  data() {
    return {
      funcionarioEdit: {} as IFuncionario,
      dep: "",
    };
  },
  methods: {
    editarFun(fun: IFuncionario) {
      this.funcionarioEdit = fun;
      this.open();
    },
    novoFun() {
      this.funcionarioEdit = {} as IFuncionario;
      this.open();
    },
    async salvar() {
      if (!this.funcionarioEdit._id) {
        this.funcionarioEdit.departamento = this.dep;
        await store.dispatch(CRIAR_FUNCIONARIO, this.funcionarioEdit);
        this.fechar();
      } else {
        this.funcionarioEdit.departamento = this.dep;
        await store.dispatch(ATUALIZAR_FUNCIONARIO, this.funcionarioEdit);
        this.fechar();
      }
      window.location.reload();
    },
    async deletar(fun: IFuncionario) {
      await store.dispatch(DELETAR_FUNCIONARIO, fun).then(() => {
        this.fechar();
        window.location.reload();
      });
    },
    open() {
      document.querySelector(".modal")?.classList.add("is-active");
    },
    fechar() {
      document.querySelector(".modal")?.classList.remove("is-active");
    },
  },
  setup() {
    const store = useStore();
    return {
      funcionarios: computed(() => store.state.funcionario.funcionarios),
      departamentos: computed(() => store.state.departamento.departamentos),
    };
  },
  mounted() {
    store.dispatch(DEFINIR_FUNCIONARIOS);
    store.dispatch(DEFINIR_DEPARTAMENTOS);
  },
  components: { Modal },
});
</script>
