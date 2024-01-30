<template>
  <div class="columns is-centered is-vcentered">
    <div class="column is-half">
      <div class="card is-circle">
        <div class="columns is-vcentered">
          <div class="column left-login">
            <div class="column is-3"></div>
            <div class="column">
              <div class="">
                <div class="card-image">
                  <div class="columns is-mobile is-centered">
                    <div class="column is-narrow">
                      <figure class="image is-128x128 is-centered">
                        <img
                          src="https://b2c.brasilsuperatacado.com.br/img/cms/logo-brasil-super-atacado.png"
                        />
                      </figure>
                    </div>
                  </div>
                </div>
                <form class="card-content">
                  <div class="columns is-centered">
                    <div class="column">
                      <h1 class="title is-4">Faça seu login</h1>
                      <div class="field">
                        <p class="control has-icons-left has-icons-right">
                          <input
                            class="input"
                            type="email"
                            placeholder="Email"
                          />
                          <span class="icon is-small is-left">
                            <i class="fas fa-envelope"></i>
                          </span>
                          <span class="icon is-small is-right">
                            <i class="fas fa-check"></i>
                          </span>
                        </p>
                      </div>
                      <div class="field">
                        <p class="control has-icons-left">
                          <input
                            class="input"
                            type="password"
                            placeholder="Password"
                          />
                          <span class="icon is-small is-left">
                            <i class="fas fa-lock"></i>
                          </span>
                        </p>
                      </div>
                      <div class="field">
                        <p class="control">
                          <button class="button is-link is-fullwidth">
                            Entrar
                          </button>
                        </p>
                      </div>
                      <div class="field">
                        <p class="control">
                          <button class="button is-link is-light is-fullwidth">
                            Esqueci minha senha
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="column">
            <figure class="image is-1by1">
              <img src="@/assets/svg/login.svg" alt="SVG Image" />
            </figure>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoginView",
})
</script>

<style>
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
}
.left-login {
  background: linear-gradient(
    60deg,
    rgb(224, 224, 224) 0%,
    rgb(255, 255, 255) 150%
  );
}
</style>
