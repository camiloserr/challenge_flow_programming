<template>
  <div class="card-devices" >
     <div class="header">
        <h1> Operation </h1>
     </div>
    <div class="body" >
        <span> </span>

        <select df-operation>
            <option v-for="operation in operations" :key="operation">{{operation}} </option>
        </select>
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