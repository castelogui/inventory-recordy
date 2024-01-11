<template>
  <main class="coluns is-gapless is-multiline">
    <div class="column is-on-quarter">
      <Menu></Menu>
    </div>
    <div class="column is-three-quarter">
      <Notificacoes></Notificacoes>
      <router-view></router-view>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Menu from './components/Menu.vue';
import Notificacoes from './components/Notificacoes/Notificacoes.vue';

export default defineComponent({
    name: "App",
    components: { Menu, Notificacoes }
});
</script>
