<script setup lang="ts">
import { useRecipeListStore } from "../stores/recipeStore";
import { defineProps, computed } from "vue";

const store = useRecipeListStore();
const props = defineProps({
  recipe: {
    type: Object,
    required: true,
  },
});

const isRecipeSaved = computed<boolean>(() =>
  store.recipeLocallySaved.some(
    (item: { name: string }) => item.name === props.recipe.name
  )
);
</script>
<template>
  <button
    v-if="isRecipeSaved"
    class="bg-white w-full text-black px-4 py-2 rounded-lg border shadow-sm md:text-base hover:cursor-default"
  >
    Saved
  </button>

  <button
    v-else
    @click="() => store.saveRecipeToLocalStorage(props.recipe)"
    class="bg-red-600 w-full hover:bg-white hover:text-slate-900 shadow text-white px-4 py-2 rounded-lg md:text-base"
  >
    Save
  </button>
</template>
