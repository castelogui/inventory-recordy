<template>
  <main class="coluns is-gapless is-multiline">
    <div class="column is-on-quarter">
      <Menu></Menu>
    </div>
    <div class="column is-three-quarter">
      <router-view></router-view>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Menu from './components/Menu.vue';

export default defineComponent({
    name: "App",
    components: { Menu }
});
</script>
