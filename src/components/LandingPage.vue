<template>
  <v-container>
    <h1>Flow programmer</h1>

    <v-card v-for="program in programs" :key="program.name" elevation="7">
      <v-card-title>{{ program.name }}</v-card-title>
      <v-card-text> {{ program.description }}</v-card-text>
      <v-card-actions>
        <v-btn color="deep-purple lighten-2" text @click="reserve">
          Editar
        </v-btn>

        <v-btn color="deep-purple lighten-2" text @click="reserve">
          Eliminar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "LandingPage",
  data: () => ({
    programs: [
      {
        id: 1,
        name: "programa 1",
        last_saved: "2021-08-09",
        description: "descripcion del programa 1",
      },
      {
        id: 2,
        name: "programa 2",
        last_saved: "2021-18-12",
        description: "descripcion del programa 2",
      },
    ],
  }),

  methods: {
    reserve() {
      this.loading = true;
      console.log("click");
      setTimeout(() => (this.loading = false), 2000);
    },
  },
};
</script>
