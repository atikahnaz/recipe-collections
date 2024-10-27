<script setup lang="ts">
//import HelloWorld from "./components/HelloWorld.vue";
import { useRecipeListStore } from "./stores/recipeStore";
import "./style.css";
import { onMounted } from "vue";
import RecipeListDataView from "./components/RecipeListDataView.vue";
import RecipeCard from "./components/RecipeCard.vue";
import SearchBar from "./components/SearchBar.vue";
import HeroImage from "./components/HeroImage.vue";
import NavigationBar from "./components/NavigationBar.vue";
import SavedRecipePage from "./components/SavedRecipePage.vue";

const store: any = useRecipeListStore();

onMounted(() => {
  store.fetchdata();
});
</script>

<template>
  <!-- <div class="relative">
    <HeroImage class="w-full" />
    <SearchBar class="absolute flex inset-0 justify-end" />
  </div> -->
  <div class="md:px-14 px-8">
    <NavigationBar />
  </div>

  <HeroImage />
  <div class="px-6 lg:py-10 lg:px-14">
    <h1 class="text-xl lg:text-2xl font-semibold py-3">My Recipe</h1>
    <div class="mt-2 mb-8">
      <RecipeCard :recipe="store.recipeLocallySaved" />
    </div>
    <h1 class="text-xl lg:text-2xl font-semibold py-3">Recipe Collections</h1>
    <SearchBar />
    <RecipeListDataView />
  </div>
  <div
    v-if="store.openSavedPage"
    class="fixed overflow-auto top-0 px-4 py-6 w-full h-full bg-white"
  >
    <SavedRecipePage />
  </div>
</template>
