<template>
  <div class="card-devices" >
     <div class="header">
        <h1> Assign </h1>
     </div>
    <div class="body" >
        <span>Variable name: </span>

        <input type="text" df-variable>
     </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    operations: ['+', '-', '*', '/']
  }),
  methods: {
    Clicked() {
      alert("hello-drawflow");
    }
  }
}
</script>