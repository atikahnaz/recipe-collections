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
    class="bg-black text-white px-4 py-2 rounded-lg mr-2 md:text-base"
  >
    Delete
  </button>
</template>
