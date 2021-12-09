<template>
  <div class="card-devices" >
     <div class="header">
        <h1> Number </h1>
     </div>
    <div class="body" >
        <input df-value type="number" > 
     </div>
  </div>
</template>

<script>
export default {
  
  methods: {
    Clicked() {
      alert("hello-drawflow");
    }
  }
}
</script>

<style scoped>
input{
    width: 100px;
    border: solid;
    border-color: blue;
}
</style>