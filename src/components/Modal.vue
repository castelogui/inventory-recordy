<template>
  <div class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{$route.name}}</p>
        <button class="delete" aria-label="close" @click="fechar"></button>
      </header>
      <section class="modal-card-body">
        <slot name="content"></slot>
      </section>
      <footer class="modal-card-foot">
        <slot name="options"></slot>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Modal-Component",
  methods: {
    fechar() {
      document.querySelector(".modal")?.classList.remove("is-active");
    },
  },
});
</script>

<style scoped></style>
