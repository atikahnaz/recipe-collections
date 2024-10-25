<script setup lang="ts">
import InputText from "primevue/inputtext";
import { useRecipeListStore } from "../stores/recipeStore";
import { ref } from "vue";
import InputIcon from "primevue/inputicon";

const store = useRecipeListStore();
const searchText = ref<string>("");

const handleSearch = (): void => {
  store.searchRecipe(searchText.value);
};
</script>

<template>
  <div class="flex items-center gap-2 my-2">
    <InputText
      placeholder="Search Ingredients"
      type="text"
      class="w-40 sm:w-auto"
      v-model="searchText"
    />
    <InputIcon>
      <i class="pi pi-search mx-2" @click="handleSearch" />
    </InputIcon>
  </div>
</template>
