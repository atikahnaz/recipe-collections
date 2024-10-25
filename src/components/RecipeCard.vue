<script setup lang="ts">
import Carousel from "primevue/carousel";
import { ref, computed } from "vue";
import DeleteRecipe from "./DeleteRecipe.vue";
import RecipeForm from "./RecipeForm.vue";

//const products = ref<Object>({});
const props = defineProps({
  recipe: {
    type: Object,
    required: true,
  },
});

const recipeForm = ref<Object>({});
// const displayedSavedRecipes = computed(() => {
//   console.log(props.recipe);
//   return props.recipe.length > 0 && props.recipe;
// });

const imagedefault: string =
  "https://primefaces.org/cdn/primevue/images/usercard.png";

const currentImage = (image: string | string[] | undefined): string => {
  //console.log(image);
  //console.log(image[0]);
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

const openModalRecipe = (item: Object) => {
  modalVisible.value = true;
  recipeForm.value = item;
  console.log(item);
};

const closeModalRecipe = () => {
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

console.log("card");
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
          class="border-surface-200 dark:border-surface-700 rounded m-2 h-72 md:h-96"
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
                class="w-full h-full object-contain rounded"
              />
              <!-- <Tag :value="slotProps.data.inventoryStatus" :severity="getSeverity(slotProps.data.inventoryStatus)" class="absolute" style="left:5px; top: 5px"/> -->
            </div>
          </div>

          <div class="flex flex-col justify-between items-center">
            <div class="mb-4 font-medium">{{ slotProps.data.name }}</div>
            <DeleteRecipe :recipe="slotProps.data" />
            <!-- <div class="mt-0 font-semibold text-xl">${{ slotProps.data.price }}</div> -->
            <!-- <span>
              <Button icon="pi pi-heart" severity="secondary" outlined />
              <Button icon="pi pi-shopping-cart" class="ml-2" />
              
            </span> -->
          </div>
        </div>
      </template>
    </Carousel>
  </div>
  <div v-else class="border shadow-sm py-2 px-2">You have no recipe saved</div>
</template>
