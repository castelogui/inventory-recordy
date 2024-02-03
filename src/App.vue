<template>
  <main class="">
    <Menu></Menu>
    <router-view></router-view>
    <Footer></Footer>
    <Notificacoes></Notificacoes>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Menu from "./components/Menu.vue";
import Footer from "./views/Footer.vue";
import Notificacoes from "./components/Notificacoes/Notificacoes.vue";

export default defineComponent({
  name: "App",
  components: { Menu, Notificacoes, Footer },
});
</script>
