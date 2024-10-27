<script setup lang="ts">
import { useRecipeListStore } from "../stores/recipeStore";

const store = useRecipeListStore();
</script>

<template>
  <div class="flex py-4 md:py-8 justify-between items-center">
    <div class="md:text-xl">CookBook Recipe</div>
    <div
      class="bg-red-600 font-semibold text-white px-4 py-2 rounded-lg hover:bg-white hover:text-black hover:border hover:shadow-sm hover:cursor-pointer"
      @click="store.handleSavedPage"
    >
      My Recipe
    </div>
  </div>
</template>
