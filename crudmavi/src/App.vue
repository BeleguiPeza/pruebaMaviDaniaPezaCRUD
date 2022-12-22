<template>
  <router-view></router-view>
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
