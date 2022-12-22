<template>
  <div class="login">
    <form @submit.prevent="enviarLogin">
      <h1>Iniciar Sesión</h1>
      <br />
      <label class="form-label">Correo:</label><br />
      <input type="email" class="form-control" v-model="correo" /><br />
      <label class="form-label">Contraseña:</label><br />
      <input type="password" class="form-control" v-model="contrasena" /><br />
      <button type="submit" class="btn btn-secondary">Ingresar</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      correo: "",
      contrasena: "",
    };
  },
  methods: {
    enviarLogin() {
      const user = {
        correo: this.correo,
        contrasena: this.contrasena,
      };
      this.axios.post("/authentication", user).then((response) => {
        this.axios.defaults.headers.common["Authorization"] =
          "Bearer " + response.data.token;
        console.log(response.data);
        localStorage.setItem("user", response.data.nombre);
        this.$router.push("/clientes");
      });
    },
  },
};
</script>

<style>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  border: black;
}
input,
button {
  width: 100%;
}
</style>
