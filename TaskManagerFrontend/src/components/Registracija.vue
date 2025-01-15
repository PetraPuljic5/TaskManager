<template>
    <div class="max-w-4xl mx-auto p-4">
      <div class="bg-white p-4 shadow rounded-md">
        <h1 class="text-2xl font-bold text-gray-800 mb-4">Registracija</h1>
        <form @submit.prevent="register">
          <div class="mb-4">
            <label for="username" class="block text-gray-700 font-medium mb-2">Korisničko ime:</label>
            <input id="username" v-model="username" type="text" class="w-full px-3 py-2 border rounded-md shadow-sm" required>
          </div>
          <div class="mb-4">
            <label for="password" class="block text-gray-700 font-medium mb-2">Lozinka:</label>
            <input id="password" v-model="password" type="password" class="w-full px-3 py-2 border rounded-md shadow-sm" required>
          </div>
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Registriraj se</button>
        </form>
      </div>
    </div>
</template>
  
<script setup>
import axios from 'axios';
import { ref } from 'vue';
  
const username = ref('');
const password = ref('');
  
const register = async () => {
    try {
      const response = await axios.post('http://localhost:8000/users/register', {
        username: username.value,
        password: password.value
      });
      alert('Uspjesna registracija');
      username.value = '';
      password.value = '';
    } catch (error) {
      alert('Neuspjesna registracija: ' + error.response.data.error);
    }
};
</script>
<style scoped>
</style>