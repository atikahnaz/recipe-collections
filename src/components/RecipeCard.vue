<script setup lang="ts">
import Carousel from "primevue/carousel";
import { ref } from "vue";
import DeleteRecipe from "./DeleteRecipe.vue";
import RecipeForm from "./RecipeForm.vue";

const props = defineProps({
  recipe: {
    type: Object,
    required: true,
  },
});

const recipeForm = ref<Object>({});

const imagedefault: string =
  "https://primefaces.org/cdn/primevue/images/usercard.png";

const currentImage = (image: string | string[] | undefined): string => {
  return image && image.length > 0
    ? image[0]
    : typeof image === "string"
    ? image
    : imagedefault;
};

const imageErrorDisplay = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = imagedefault; // Set the image source to default if the image is broken
};

// modal recipe
const modalVisible = ref<Boolean>(false);

const openModalRecipe = (item: Object): void => {
  modalVisible.value = true;
  recipeForm.value = item;
};

const closeModalRecipe = (): void => {
  modalVisible.value = false;
};

const responsiveOptions = ref([
  {
    breakpoint: "1400px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "1199px",
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: "767px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "575px",
    numVisible: 1,
    numScroll: 1,
  },
]);
</script>

<template>
  <RecipeForm
    v-if="modalVisible"
    :recipe="recipeForm"
    :isSavedRecipe="true"
    @close="closeModalRecipe"
  ></RecipeForm>
  <div class="px-10 border" v-if="props.recipe.length > 0">
    <Carousel
      :value="props.recipe"
      :numVisible="5"
      :numScroll="1"
      :responsiveOptions="responsiveOptions"
      class=""
    >
      <template #item="slotProps">
        <div
          class="border-surface-200 dark:border-surface-700 rounded m-4 h-80 md:h-96"
        >
          <div class="mb-4 h-2/3">
            <div
              class="relative mx-auto h-full"
              @click="openModalRecipe(slotProps.data)"
              @close="closeModalRecipe"
            >
              <img
                :src="currentImage(slotProps.data.image)"
                :alt="slotProps.data.name"
                @error="imageErrorDisplay"
                class="w-full h-full object-cover rounded"
              />
            </div>
          </div>

          <div class="flex flex-col justify-between items-center h-1/3">
            <div class="font-medium text-xs md:text-base">
              {{ slotProps.data.name }}
            </div>
            <DeleteRecipe :recipe="slotProps.data" />
          </div>
        </div>
      </template>
    </Carousel>
  </div>
  <div v-else class="border shadow-sm py-2 px-2">You have no recipe saved</div>
</template>
