<script setup>
import TaskTag from "./TaskTag.vue";
import { ref } from "vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
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
  zavrsen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["obrisiZadatak"]);

const isZavrsen = ref(props.zavrsen);

const oznaciZavrsen = async () => {
  try {
    const response = await fetch(`http://localhost:8000/tasks/${props.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log("Oznacen kao dovrsen");
      isZavrsen.value = true;
    } else {
      console.error("Greska u azuriranju");
    }
  } catch (error) {
    console.error("Greska", error);
  }
};

const obrisiZadatak = async () => {
  if (!confirm("Zelite li obrisati zadatak?")) return;

  try {
    const response = await fetch(`http://localhost:8000/tasks/${props.id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log("Zadatak obrisan");
      emit("obrisiZadatak", props.id); 
    } else {
      console.error("Greska u brisanju zadatka");
    }
  } catch (error) {
    console.error("Greska", error);
  }
};
</script>

<template>
  <li
    :class="['flex flex-col p-4 rounded-md shadow', isZavrsen ? 'bg-green-100' : 'bg-gray-50']"
  >
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
        v-if="!isZavrsen"
        @click="oznaciZavrsen"
        class="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
      >
        Dovršeno
      </button>
      <button
        @click="obrisiZadatak"
        class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
      >
        Obriši
      </button>
    </div>
  </li>
</template>

<style scoped></style>