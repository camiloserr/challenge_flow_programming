<template>
  <v-app>
    <v-main>
      <Program/>
    </v-main>
  </v-app>
</template>

<script>
//import LandingPage from './components/LandingPage.vue'
import Program from './components/Program.vue'
export default {
  name: 'App',

  components: {
  //  LandingPage,
    Program
  },

  data: () => ({
    //
  }),
}
</script>
