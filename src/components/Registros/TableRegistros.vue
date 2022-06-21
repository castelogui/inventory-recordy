<template>
  <table class="table">
    <thead>
      <tr>
        <th>Codigo</th>
        <th>Nome</th>
        <th>Departamento</th>
      </tr>
    </thead>
    <tfoot>
      <tr>
        <th>Codigo</th>
        <th>Nome</th>
        <th>Departamento</th>
      </tr>
    </tfoot>
    <tbody v-for="(reg, i) in registros" :key="i">
      <tr>
        <th>{{ reg.funcionario.codigo }}</th>
        <td>{{ reg.funcionario.nome }} {{ reg.funcionario.sobrenome }}</td>
        <td>{{ reg.funcionario.departamento.nome }}</td>
        <td></td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { store, useStore } from "../../store";
import { DEFINIR_REGISTROS } from "../../store/tipo-actions";
import { computed } from "@vue/reactivity";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Table-Registros",
  setup() {
    const store = useStore();
    return {
      registros: computed(() => store.state.registro.registros),
    };
  },
  mounted() {
    store.dispatch(DEFINIR_REGISTROS);
  },
});
</script>
