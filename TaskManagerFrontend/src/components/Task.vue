<script setup>
import TaskTag from "./TaskTag.vue";

defineProps({
  naslov: {
    type: String,
    required: true,
  },
  opis: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <li class="flex flex-col p-4 bg-gray-50 rounded-md shadow">
    <div class="mb-2">
      <p class="text-lg font-medium text-gray-800">{{ naslov }}</p>
      <p class="text-sm text-gray-600">{{ opis }}</p>
    </div>
    <div class="flex space-x-2 mb-2">
      <TaskTag v-for="(tag, index) in tags" :key="index" :tag="tag" />
    </div>
    <!-- Task Actions -->
    <div class="flex space-x-2">
      <button
        class="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600">
        Dovršeno
      </button>
      <button
        class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
        Obriši
      </button>
    </div>
  </li>
</template>

<style scoped></style>
