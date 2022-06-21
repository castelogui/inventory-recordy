<template>
  <TableRegistros></TableRegistros>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TableRegistros from "./TableRegistros.vue";

export default defineComponent({
  name: "Registro-Component",
  components: { TableRegistros },
});
</script>
