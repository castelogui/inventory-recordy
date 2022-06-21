<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="#">
        <img src="https://servicos.brasildistribuidora.com/pics/logo_big.png"/>
      </a>
    </div>
    <div class="navbar-end">
      <nav class="breadcrumb is-centered" aria-label="breadcrumbs">
        <ul class="navbar-item">
          <li
            v-for="(path, i) in rotas"
            :key="i"
            :class="path.path == $route.path ? 'is-active' : ''"
          >
            <router-link :to="path.path">
              {{ path.name }}
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Route from "@/routes";
import { RouteRecordRaw } from "vue-router";

export default defineComponent({
  name: "BarraLateral",
  data() {
    return {
      rotas: [] as RouteRecordRaw[],
    };
  },
  mounted() {
    Route.options.routes[0].children?.forEach((rota) => {
      this.rotas.push(rota);
    });
  },
});
</script>

<style lang="css" scoped>
router-link {
  padding: 20px;
}
</style>
