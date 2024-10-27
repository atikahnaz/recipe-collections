<script setup lang="ts">
import Card from "primevue/card";
import { ref } from "vue";
import RecipeForm from "./RecipeForm.vue";

const props = defineProps({
  recipe: {
    type: Object,
    required: true,
  },
});
const recipeForm = ref<Object>({});
// modal recipe
const modalVisible = ref<Boolean>(false);

const openModalRecipe = (item: Object): void => {
  modalVisible.value = true;
  recipeForm.value = item;
};

const closeModalRecipe = (): void => {
  modalVisible.value = false;
};
const imagedefault: string =
  "https://primefaces.org/cdn/primevue/images/usercard.png";

const currentImage = (image: string | string[] | undefined): string => {
  if (!image) return imagedefault; // Return default if no image is provided
  if (Array.isArray(image) && image.length > 0) {
    return image[0]; // Use the first image if it's an array
  }
  return typeof image === "string" ? image : imagedefault; // Return string if it's a valid URL
};

const imageErrorDisplay = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = imagedefault; // Set the image source to default if the image is broken
};
</script>

<template>
  <RecipeForm
    v-if="modalVisible"
    :recipe="recipeForm"
    :isSavedRecipe="true"
    @close="closeModalRecipe"
  ></RecipeForm>
  <Card
    class="overflow-hidden my-4 w-40 sm:min-w-48 flex"
    @click="openModalRecipe(props.recipe)"
    @close="closeModalRecipe"
  >
    <template #header>
      <div class="w-full h-48">
        <img
          alt="user header"
          :src="currentImage(props.recipe.image)"
          class="w-full h-full object-cover"
          @error="imageErrorDisplay"
        />
      </div>
    </template>

    <template #subtitle>
      <p class="">{{ props.recipe.name }}</p>
    </template>

    <!-- <template #footer>
      <div class="flex gap-4 mt-1">
        <SaveButton :recipe="props.recipe"></SaveButton>
        <DeleteRecipe :recipe="props.recipe" />
      </div>
    </template> -->
  </Card>
</template>
