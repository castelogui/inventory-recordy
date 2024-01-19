<template>
  <main class="coluns is-gapless is-multiline">
    <div v-if="login == true">
      <div class="column is-on-quarter">
        <Menu></Menu>
      </div>
      <div class="column is-three-quarter">
        <Notificacoes></Notificacoes>
        <router-view></router-view>
      </div>
    </div>
    <LoginComponent v-else-if="login == false"></LoginComponent>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Menu from "./components/Menu.vue";
import Notificacoes from "./components/Notificacoes/Notificacoes.vue";
import LoginComponent from "./components/Login/LoginComponent.vue";

export default defineComponent({
  name: "App",
  components: { Menu, Notificacoes, LoginComponent },
  data() {
    return {
      login: false,
    };
  },
});
</script>
