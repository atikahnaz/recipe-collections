<script setup lang="ts">
import { useRecipeListStore } from "../stores/recipeStore";
import { defineProps } from "vue";

const store = useRecipeListStore();
const props = defineProps({
  recipe: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <button
    @click="() => store.saveRecipeToLocalStorage(props.recipe)"
    class="bg-black text-white px-3 py-1 rounded-lg mr-2"
  >
    Save
  </button>
</template>
