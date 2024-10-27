<script setup lang="ts">
import CardSingle from "./CardSingle.vue";
import { useRecipeListStore } from "../stores/recipeStore";

const store = useRecipeListStore();
</script>

<template>
  <div class="bg-white dark:bg-gray-800 dark:text-white md:px-8 lg:px-10 py-4">
    <h1 class="text-xl font-semibold">My Recipe</h1>
    <button class="my-2 hover:cursor-pointer" @click="store.handleSavedPage">
      Back
    </button>
    <div class="flex flex-wrap h-full gap-2 justify-center">
      <div v-for="recipe in store.recipeLocallySaved" class="flex">
        <CardSingle :recipe="recipe" />
      </div>
    </div>
  </div>
</template>
