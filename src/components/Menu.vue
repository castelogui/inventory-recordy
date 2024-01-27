<template>
  <div>
    <nav class="navbar navbar1" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <figure class="image is-256x256">
          <a href="#">
            <img
              src="https://b2c.brasilsuperatacado.com.br/img/sinop-logo-1694475801.jpg"
            />
          </a>
        </figure>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <figure class="image">
            <img
              class="is-rounded"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl8Ea9cyIi_U8y7mgzqX1SitKtppQOzlciXA&usqp=CAU"
            />
          </figure>
        </div>

        <nav class="breadcrumb is-centered" aria-label="breadcrumbs">
          <ul class="navbar-item" v-if="currentRoute !== '/login'">
            <!--

              <li
              v-for="(path, i) in rotas"
              :key="i"
              :class="path.path == $route.path ? 'is-active' : ''"
              >
              <router-link :to="path.path">
                <button
                v-if="checkCurrentRoute() === path.path"
                class="button is-link is-light is-small is-fullwidth is-focused"
                >
                {{ path.name }}
              </button>
              <button
              v-else
              class="button is-link is-light is-small is-fullwidth"
              >
              {{ path.name }}
            </button>
          </router-link>
        </li>
      -->
          </ul>
        </nav>
      </div>
    </nav>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <h1 class="title">Olá</h1>
      </div>
      <div class="navbar-end">
        <ul class="navbar-item" v-if="currentRoute !== '/login'">
          <li
            v-for="(path, i) in rotas"
            :key="i"
            :class="path.path == $route.path ? 'is-active' : ''"
          >
            <router-link :to="path.path">
              <button
                v-if="checkCurrentRoute() === path.path"
                class="navbar-item button is-outlined is-link is-fullwidth is-rounded"
              >
                {{ path.name }}
              </button>
              <button
                v-else
                class="navbar-item button is-link is-light is-fullwidth is-rounded"
              >
                {{ path.name }}
              </button>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
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
      currentRoute: "",
    };
  },
  mounted() {
    this.checkCurrentRoute();
    Route.options.routes[0].children?.forEach((rota) => {
      this.rotas.push(rota);
    });
  },
  methods: {
    checkCurrentRoute() {
      this.currentRoute = window.location.hash.replace("#", "");
      return this.currentRoute;
    },
  },
});
</script>

<style lang="css" scoped>
router-link {
  padding: 20px;
}
.navbar1 {
  background: rgb(171, 171, 171);
  background: linear-gradient(
    0deg,
    rgb(161, 161, 161) 0%,
    rgb(255, 255, 255) 4%
  );
}
</style>
