<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import { useRecipeListStore } from "./stores/recipeStore";
import "./style.css";
import { onMounted, ref } from "vue";
import RecipeListDataView from "./components/RecipeListDataView.vue";

const store = useRecipeListStore();

onMounted(() => {
  store.fetchdata();
});
</script>

<template>
  <h1>Recipe Collections</h1>
  <RecipeListDataView />
</template>
