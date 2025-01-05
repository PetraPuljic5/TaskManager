<script setup>
defineProps({
  tag: {
    type: String,
    required: true,
  },
});

const tagBoje = {
  HITNO: "bg-red-400/70 text-white",
  FAKS: "bg-blue-400/70 text-white",
  POMALO: "bg-green-400/70 text-white",
};
</script>

<template>
  <span
    :class="['px-1.5 py-0.5 rounded-md text-xs', tagBoje[tag] || 'bg-gray-300 text-black']"
  >
    {{ tag }}
  </span>
</template>

<style scoped></style>
