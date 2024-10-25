<script setup lang="ts">
//import HelloWorld from "./components/HelloWorld.vue";
import { useRecipeListStore } from "./stores/recipeStore";
import "./style.css";
import { onMounted, ref } from "vue";
import RecipeListDataView from "./components/RecipeListDataView.vue";
import RecipeCard from "./components/RecipeCard.vue";
import SearchBar from "./components/SearchBar.vue";

const store: any = useRecipeListStore();

onMounted(() => {
  store.fetchdata();
});
</script>

<template>
  <div class="px-6 lg:py-10 lg:px-14">
    <h1 class="text-xl lg:text-2xl font-semibold py-3">My Recipe</h1>
    <div class="mt-2 mb-8">
      <RecipeCard :recipe="store.recipeLocallySaved" />
    </div>
    <h1 class="text-xl lg:text-2xl font-semibold py-3">Recipe Collections</h1>
    <SearchBar />
    <RecipeListDataView />
  </div>
</template>
