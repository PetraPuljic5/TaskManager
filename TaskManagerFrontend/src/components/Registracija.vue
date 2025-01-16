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
        <div class="flex justify-end space-x-4">
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Registriraj se</button>
        <button type="button" @click="closeForm" class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">Odustani</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import api from '../services/api';
import { ref } from 'vue';

const username = ref('');
const password = ref('');
const emit = defineEmits(['close']);

const register = async () => {
  try {
    const response = await api.post('users/register', {
      username: username.value,
      password: password.value
    });
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      alert('Uspješna registracija. Dobrodošli!');
      username.value = '';
      password.value = '';
      emit('close');
    } else {
      alert('Registracija nije uspjela, token nije primljen.' + response.data.error);
    }
  } catch (error) {
    console.log(error);
    alert('Neuspješna registracija: ' + (error.response.data?.error || error.message));
  }
};

const closeForm = () => {
  emit('close');
};
</script>
<style scoped>
</style>