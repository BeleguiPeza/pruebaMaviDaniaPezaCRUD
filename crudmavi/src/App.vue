<template>
  <nav>
    <label v-show="usuario == undefined">
      <router-link to="/login">Iniciar Sesión</router-link>
    </label>
    <label v-show="usuario != undefined">Bienvenido/a {{ usuario }}</label>
    <label v-show="usuario != undefined">
      <router-link to="/clientes">Clientes</router-link>
    </label>
    <label v-show="usuario != undefined" @click="cerrarSesion"
      >Cerrrar Sesión</label
    >
  </nav>

  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    cerrarSesion() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.$router.push("/");
    },
  },
  computed: {
    usuario() {
      return localStorage.getItem("user");
    },
  },
};
</script>

<style>
nav {
  background-color: #eebbbb;
  padding: 10px;
  text-align: end;
  color: white;
}

label {
  margin: 0px 10px;
  cursor: pointer;
}
a {
  text-decoration: none;
  color: white;
}
a:hover {
  color: white;
}
</style>
