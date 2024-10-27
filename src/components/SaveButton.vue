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
    class="bg-white w-full text-black px-3 py-1 rounded-lg border shadow-sm"
  >
    Saved
  </button>

  <button
    v-else
    @click="() => store.saveRecipeToLocalStorage(props.recipe)"
    class="bg-black w-full text-white px-4 py-1 rounded-lg"
  >
    Save
  </button>
</template>
