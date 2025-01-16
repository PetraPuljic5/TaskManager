<script setup>
import api from './services/api';
import axios from "axios";
import Task from './components/Task.vue';
import Registracija from './components/Registracija.vue';
import Prijava from './components/Prijava.vue';
import { ref, onMounted } from "vue";

const tasks = ref([]);
const showNoviTaskForm = ref(false);
const showRegistracijaForm = ref(false);
const showPrijavaForm = ref(false);
const noviTaskNaslov = ref("");
const noviTaskOpis = ref("");
const noviTaskTags = ref("");

onMounted(() => {
    fetchTasks();
});

const fetchTasks = async () => {
    try {
        const response = await api.get("/tasks");
        tasks.value = response.data;
    } catch (error) {
        console.error("Greška u dohvaćanju zadataka", error);
    }
};

const addTask = async () => {
    if (!noviTaskNaslov.value.trim() || !noviTaskOpis.value.trim()) {
        alert("Naslov i opis su obavezni");
        return;
    }

    const tagsArray = noviTaskTags.value.split(",").map(tag => tag.trim());

    try {
        const response = await api.post("/tasks/novi", {
            naslov: noviTaskNaslov.value,
            opis: noviTaskOpis.value,
            tags: tagsArray
        });
        tasks.value.unshift(response.data);
        resetTaskForm();
        showNoviTaskForm.value = false;
    } catch (error) {
        console.error("Greška u dodavanju zadatka", error);
    }
};

const resetTaskForm = () => {
    noviTaskNaslov.value = "";
    noviTaskOpis.value = "";
    noviTaskTags.value = "";
};

const ukloniZadatak = (id) => {
    tasks.value = tasks.value.filter(task => task._id.toString() !== id);
};

</script>

<template>
  <div class="max-w-4xl mx-auto p-4">
    <!-- Header -->
    <header class="flex justify-between items-center bg-white p-4 shadow rounded-md mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Task Manager</h1>
      <div>
        <button @click="showNoviTaskForm = true" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Dodaj zadatak
        </button>
        <button @click="showRegistracijaForm = !showRegistracijaForm" class="ml-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
          Registriraj se
        </button>
        <button @click="showPrijavaForm = !showPrijavaForm" class="ml-2 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">
          Prijavi se
        </button>
      </div>
    </header>

    <!-- Registration Form -->
    <Registracija v-if="showRegistracijaForm" @close="showRegistracijaForm = false" />

    <!-- Login Form -->
    <Prijava v-if="showPrijavaForm" @close="showPrijavaForm = false" />

    <!-- New Task Form -->
    <div v-if="showNoviTaskForm" class="bg-white p-4 shadow rounded-md mb-6">
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2">Naslov zadatka:</label>
        <input v-model="noviTaskNaslov" type="text" class="w-full px-3 py-2 border rounded-md shadow-sm" />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2">Opis zadatka:</label>
        <textarea v-model="noviTaskOpis" rows="3" class="w-full px-3 py-2 border rounded-md shadow-sm"></textarea>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2">Tagovi (odvojeni zarezom):</label>
        <input v-model="noviTaskTags" type="text" class="w-full px-3 py-2 border rounded-md shadow-sm" />
      </div>
      <div class="flex space-x-4">
        <button @click="addTask" class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Spremi</button>
        <button @click="showNoviTaskForm = false" class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">Odustani</button>
      </div>
    </div>

    <!-- Task List -->
    <div class="bg-white p-4 shadow rounded-md">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Vaši zadaci</h2>
      <ul class="space-y-4">
        <Task
          v-for="task in tasks"
          :key="task._id.toString()"
          :id="task._id.toString()"
          :naslov="task.naslov"
          :opis="task.opis"
          :tags="task.tags"
          :zavrsen="task.zavrsen"
          @obrisiZadatak="ukloniZadatak"
        />
      </ul>
    </div>
  </div>
</template>

<style scoped></style>