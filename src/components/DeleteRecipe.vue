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
  <button @click="() => store.deleteRecipe(props.recipe.name)">Delete</button>
</template>
