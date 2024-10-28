<script setup lang="ts">
import { useRecipeListStore } from "../stores/recipeStore";

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
    @click="() => store.deleteRecipe(props.recipe.name)"
    class="bg-red-600 w-full hover:bg-white hover:text-slate-900 shadow text-white px-4 py-2 rounded-lg md:text-base"
  >
    Delete
  </button>
</template>
