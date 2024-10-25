<script setup lang="ts">
import DeleteRecipe from "./DeleteRecipe.vue";
import SaveButton from "./SaveButton.vue";
import "primeicons/primeicons.css";

const props = defineProps({
  recipe: {
    type: Object,
    required: true,
  },
  isSavedRecipe: {
    type: Boolean,
  },
});

const imagedefault: string =
  "https://primefaces.org/cdn/primevue/images/usercard.png";

const currentImage = (image: string | string[] | undefined): string => {
  if (!image) return imagedefault; // Return default if no image is provided
  if (Array.isArray(image) && image.length > 0) {
    return image[0]; // Use the first image if it's an array
  }
  return typeof image === "string" ? image : imagedefault; // Return string if it's a valid URL
};

const imageErrorDisplay = (event: Event): void => {
  if (!event || !(event.target instanceof HTMLImageElement)) {
    return; // Exit if the event is undefined or target is not an image element
  }
  const target = event.target;
  if (target.src !== imagedefault) {
    target.src = imagedefault;
  }
};

const emit = defineEmits(["close"]);
</script>

<template>
  <div class="bg-white z-40 fixed top-0 w-full h-full overflow-y-scroll left-0">
    <div class="p-5 md:w-1/2 m-auto md:border md:my-4">
      <div class="flex justify-between py-4">
        <img
          :src="currentImage(props.recipe.image)"
          alt="Image"
          width="250"
          preview
          @error="imageErrorDisplay"
        />
        <button
          @click="emit('close')"
          class="self-start rounded-full mr-2 pointer"
        >
          <i class="pi pi-times"></i>
        </button>
      </div>

      <div class="space-y-3">
        <h6 class="font-semibold">{{ props.recipe.name }}</h6>
        <div v-if="props.recipe.author && props.recipe.author.length > 0">
          <p>
            <span class="font-medium">Author: </span
            >{{ props.recipe.author.name }}
          </p>
        </div>
        <div v-else>No author</div>

        <div>
          <h6 class="font-medium">Ingredients</h6>
          <div
            v-if="
              props.recipe.recipeIngredient &&
              props.recipe.recipeIngredient.length > 0
            "
          >
            <div
              v-for="(ingredient, index) in props.recipe.recipeIngredient"
              :key="index"
            >
              <li>{{ ingredient }}</li>
            </div>
          </div>
          <div v-else>No ingredients available</div>
        </div>

        <div>
          <h6 class="font-medium">Instructions</h6>
          <div
            v-if="
              Array.isArray(props.recipe.recipeInstructions) &&
              props.recipe.recipeInstructions &&
              props.recipe.recipeInstructions.length > 0
            "
          >
            <div
              v-for="(instruction, index) in props.recipe.recipeInstructions"
            >
              <p>{{ index }} - {{ instruction.text }}</p>
            </div>
          </div>
          <div v-else-if="props.recipe.recipeInstructions">
            {{ props.recipe.recipeInstructions }}
          </div>
          <div v-else>No instruction availabe</div>
        </div>
      </div>
      <div v-if="props.isSavedRecipe" class="text-center">
        <DeleteRecipe
          :recipe="props.recipe"
          @click="emit('close')"
          class="mt-5 py-1 w-full lg:w-1/2"
        />
      </div>
      <div v-else class="text-center">
        <SaveButton
          :recipe="props.recipe"
          @click="emit('close')"
          class="mt-5 py-1 w-full lg:w-1/2"
        />
      </div>
    </div>
  </div>
</template>
