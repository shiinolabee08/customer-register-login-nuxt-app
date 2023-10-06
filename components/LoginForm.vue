<template>
  <div>
    <input v-model="email" type="email" placeholder="Email">
    <input v-model="password" type="password" placeholder="Password">
    <button @click="login">Login</button>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const username = ref('');
const password = ref('');


</script>