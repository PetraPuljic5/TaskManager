<script setup>
defineProps({
  naslov: {
    type: String,
    required: true,
  },
  opis: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <li class="flex justify-between items-center p-4 bg-gray-50 rounded-md shadow">
    <div>
      <p class="text-lg font-medium text-gray-800">{{ naslov }}</p>
      <p class="text-sm text-gray-600">{{ opis }}</p>
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
    <!--/Task Actions-->
  </li>
</template>

<style scoped></style>
