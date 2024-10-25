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
    class="bg-black text-white px-3 py-1 rounded-lg mr-2"
  >
    Delete
  </button>
</template>
