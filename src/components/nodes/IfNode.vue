<template>
  <div class="card-devices" >
     <div class="header">
        <h1> If-Else </h1>
     </div>
    <div class="body" >
        <span> </span>

        <select df-operation>
            <option v-for="conditional in conditionals" :key="conditional">{{conditional}} </option>
        </select>
     </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    conditionals: ['<', '>', '==', '!=']
  }),
  methods: {
    Clicked() {
      alert("hello-drawflow");
    }
  }
}
</script>