<template>
  <v-container>
    <h1>Flow programmer</h1>

    <v-card v-for="program in programs" :key="program.uid" elevation="7">
      <v-card-title>{{ program.name }}</v-card-title>
      <v-card-text> {{ program.uid }}</v-card-text>
      <v-card-actions>
        <v-btn
          color="deep-purple lighten-2"
          :to="{ name: 'Program', params: { uid: program.uid } }"
        >
          Editar
        </v-btn>

        <v-btn color="deep-purple lighten-2" text @click="reserve">
          Eliminar
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-btn color="green lighten-2" text @click="reserve"> Crear nuevo </v-btn>
  </v-container>
</template>

<script>

import axios from 'axios';
import { onMounted } from "vue";

//let allPrograms = [];

export default {
  name: "LandingPage",
  data: () => ({
      // mocked data just for testing purposes
      // will be over writen when api is called
    programs: [
      {
        uid: 1,
        name: "programa 1",
        last_saved: "2021-08-09",
        description: "descripcion del programa 1",
      },
      {
        uid: 2,
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
  created: function() {
        console.log("created");
        const self = this;
        console.log(self);
        // calls api to popullate programs array
        axios.get("http://localhost:8081/programs").then( (ans) => {
            console.log(ans.data.all);
            console.log(self.programs);
            self.programs = ans.data.all;
        });
    },

  setup() {
    onMounted(() => {
        axios.get("http://localhost:8081/programs").then( (ans) => {
            console.log(ans.data.all);
            // this.programs = ans.data.all;
        });

    });
  },
};
</script>


