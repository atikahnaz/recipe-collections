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

const descriptionCleaned = (description: string) => {
  if (description) {
    return description.replace(/&nbsp;/g, " ").replace(/\u2014/g, "—");
  } else {
    return;
  }
};

const emit = defineEmits(["close"]);
</script>

<template>
  <div
    class="bg-white dark:bg-gray-800 text-black dark:text-white z-40 fixed top-0 w-full h-full overflow-y-scroll left-0"
  >
    <div
      class="p-5 m-auto sm:px-8 md:w-2/3 md:border md:shadow-sm md:rounded-md md:my-4"
    >
      <div class="flex justify-between">
        <div class="font-semibold text-lg">{{ props.recipe.name }}</div>
        <button @click="emit('close')" class="self-start rounded-full pointer">
          <i class="pi pi-times"></i>
        </button>
      </div>
      <div v-if="props.recipe.author" class="text-sm">
        <p><span class="">By </span>{{ props.recipe.author.name }}</p>
      </div>

      <div class="py-2 xl:hidden">
        {{ descriptionCleaned(props.recipe.description) }}
      </div>

      <div class="flex py-4 md:py-8">
        <div>
          <img
            :src="currentImage(props.recipe.image)"
            alt="Image"
            width="250"
            preview
            @error="imageErrorDisplay"
            class="w-full lg:max-w-96 lg:max-h-auto object-cover"
          />
        </div>
        <div class="hidden xl:flex py-2 xl:w-1/2 xl:pl-8">
          {{ descriptionCleaned(props.recipe.description) }}
        </div>

        <!-- <div class="hidden xl:flex flex-col xl:w-1/2 xl:ml-8">
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
        </div> -->
      </div>

      <div class="space-y-3">
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
              <p>{{ index + 1 }} - {{ instruction.text }}</p>
            </div>
          </div>
          <div v-else-if="props.recipe.recipeInstructions">
            {{ props.recipe.recipeInstructions }}
          </div>
          <div v-else>No instruction availabe</div>
        </div>
      </div>

      <div class="flex items-center w-full justify-center gap-3 py-4">
        <div
          class="bg-slate-200 text-black px-4 py-2 rounded-lg w-1/2 md:text-base text-center hover:bg-white shadow hover:cursor-pointer"
          @click="emit('close')"
        >
          <button>Close</button>
        </div>
        <div
          v-if="props.isSavedRecipe"
          class="text-center w-1/2 lg:text-start py-4"
        >
          <DeleteRecipe
            :recipe="props.recipe"
            @click="emit('close')"
            class="py-1 w-full"
          />
        </div>
        <div v-else class="text-center w-1/2 lg:text-start py-4">
          <SaveButton
            :recipe="props.recipe"
            @click="emit('close')"
            class="py-1 w-full"
          />
        </div>
      </div>
    </div>
  </div>
</template>
