<template>
  <nav>
    <label>Bienvenido(a) {{ usuario }}</label>
    <label>
      <router-link to="/clientes">Clientes</router-link>
    </label>
    <label @click="cerrarSesion">Cerrrar Sesión</label>
  </nav>
  <div class="container">
    <div class="formClietes">
      <form @submit.prevent="postCliente">
        <h1 style="text-align: center; margin-top: 50px">
          {{ Id === 0 ? "Agregar" : "Editar" }} Cliente
        </h1>
        <br />
        <label class="form-label">Nombre(s):</label><br />
        <input type="text" class="form-control" v-model="nombre" /><br />
        <label class="form-label">Apellido Paterno:</label><br />
        <input
          type="text"
          class="form-control"
          v-model="apellidoPaterno"
        /><br />
        <label class="form-label">Apellido Materno:</label><br />
        <input
          type="text"
          class="form-control"
          v-model="apellidoMaterno"
        /><br />
        <label class="form-label">Dirección:</label><br />
        <input type="text" class="form-control" v-model="domicilio" /><br />
        <label class="form-label">Correo:</label><br />
        <input type="email" class="form-control" v-model="correo" /><br />
        <div style="display: flex; justify-content: center">
          <button type="submit" class="btn btn-secondary">Guardar</button>
        </div>
      </form>
    </div>
    <div class="tablaClientes">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nombre(s)</th>
            <th scope="col">Apellidos</th>
            <th scope="col">Dirección</th>
            <th scope="col">Correo</th>
            <th scope="col">Editar</th>
            <th scope="col">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cliente in clientes">
            <th scope="row">{{ cliente.Id }}</th>
            <td>{{ cliente.nombre }}</td>
            <td>{{ cliente.apellidoPaterno }} {{ cliente.apellidoMaterno }}</td>
            <td>{{ cliente.domicilio }}</td>
            <td>{{ cliente.correo }}</td>
            <td @click="buscarCliente(cliente)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-pencil-square"
                viewBox="0 0 16 16"
              >
                <path
                  d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                />
                <path
                  fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                />
              </svg>
            </td>
            <td @click="deleteCliente(cliente.Id)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path
                  d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                />
                <path
                  fill-rule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                />
              </svg>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Clientes",
  data() {
    return {
      Id: 0,
      nombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      domicilio: "",
      correo: "",
      clientes: [],
    };
  },
  mounted() {
    this.getClientes();
  },
  computed: {
    usuario() {
      return localStorage.getItem("user");
    },
  },
  methods: {
    getClientes() {
      this.axios
        .get("/clients")
        .then((response) => {
          console.log();
          if (response.data.code === 401 || response.data.code === 403) {
            this.cerrarSesion();
          } else {
            this.clientes = response.data;
          }
        })
        .catch((err) => {
          this.cerrarSesion();
        });
    },
    buscarCliente(client) {
      this.Id = client.Id;
      this.nombre = client.nombre;
      this.apellidoPaterno = client.apellidoPaterno;
      this.apellidoMaterno = client.apellidoMaterno;
      this.domicilio = client.domicilio;
      this.correo = client.correo;
    },
    postCliente() {
      if (this.Id === 0) {
        const newClient = {
          nombre: this.nombre,
          apellidoPaterno: this.apellidoPaterno,
          apellidoMaterno: this.apellidoMaterno,
          domicilio: this.domicilio,
          correo: this.correo,
        };
        console.log(newClient);
        this.axios.post("/client", newClient).then((response) => {
          this.getClientes();
          this.clearClientData();
        });
      } else {
        const client = {
          Id: this.Id,
          nombre: this.nombre,
          apellidoPaterno: this.apellidoPaterno,
          apellidoMaterno: this.apellidoMaterno,
          domicilio: this.domicilio,
          correo: this.correo,
        };
        console.log(client);
        this.axios.put("/client", client).then((response) => {
          this.getClientes();
          this.clearClientData();
        });
      }
    },
    deleteCliente(id) {
      this.axios.delete(`/client/${id}`).then((response) => {
        this.getClientes();
        this.clearClientData();
      });
    },
    clearClientData() {
      this.Id = 0;
      this.nombre = "";
      this.apellidoPaterno = "";
      this.apellidoMaterno = "";
      this.domicilio = "";
      this.correo = "";
    },
    cerrarSesion() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.$router.push("/");
    },
  },
};
</script>

<style>
button {
  width: 300px;
}
.tablaClientes {
  margin-top: 50px;
}
svg {
  cursor: pointer;
}
</style>
