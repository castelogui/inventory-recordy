<template>
  <div class="Registros">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Registros-View",
});
</script>

<style scoped>
.clientes {
  padding: 1.25rem;
}
</style>