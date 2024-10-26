<script setup lang="ts">
import InputText from "primevue/inputtext";
import { useRecipeListStore } from "../stores/recipeStore";
import { ref } from "vue";

const store = useRecipeListStore();
const searchText = ref<string>("");

const handleSearch = (): void => {
  store.searchRecipe(searchText.value);
};
</script>

<template>
  <div class="flex items-center gap-2 md:py-4 my-2 relative">
    <InputText
      placeholder="Search Ingredients"
      type="text"
      class="w-full"
      v-model="searchText"
    />
    <i class="pi pi-search mx-2 absolute right-2" @click="handleSearch" />
    <!-- <InputIcon>
      <i class="pi pi-search mx-2" @click="handleSearch" />
    </InputIcon> -->
  </div>
</template>
