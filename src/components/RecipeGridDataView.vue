<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
//import { ProductService } from "@/service/ProductService";
import { useRecipeListStore } from "../stores/recipeStore";
import DataView from "primevue/dataview";
import SaveButton from "./SaveButton.vue";
import RecipeForm from "./RecipeForm.vue";

const store = useRecipeListStore();

// onMounted(() => {
//   ProductService.getProductsSmall().then((data) => (products.value = data));
// });
onMounted(() => {
  store.fetchdata();
});

const recipeForm = ref<Object>({});

const displayedRecipes = computed(() => {
  return store.searchRecipeResult.length > 0
    ? store.searchRecipeResult
    : store.recipeApi;
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

const descriptionCleaned = (description: string) => {
  if (description) {
    return description.replace(/&nbsp;/g, " ").replace(/\u2014/g, "—");
  } else {
    return;
  }
};
</script>

<template>
  <RecipeForm
    v-if="modalVisible"
    :recipe="recipeForm"
    :isSavedRecipe="false"
    @close="closeModalRecipe"
  ></RecipeForm>
  <div class="card">
    <p v-if="store.noRecipeMessage" class="py-3">{{ store.noRecipeMessage }}</p>

    <DataView :value="displayedRecipes" paginator :rows="10" dataKey="id">
      <template #list="slotProps">
        <div class="flex flex-col lg:grid lg:grid-cols-2 lg:gap-3">
          <div
            v-for="(item, index) in slotProps.items"
            :key="index"
            class="mb-6"
          >
            <div
              class="flex md:flex-row sm:items-center gap-4 border shadow overflow-hidden rounded-xl"
              :class="{
                'border-t border-surface-200 dark:border-surface-700':
                  index !== 0,
              }"
            >
              <div
                class="w-40 h-40 flex md:w-40 relative"
                @click="openModalRecipe(item)"
                @close="closeModalRecipe"
              >
                <img
                  class="block xl:block mx-auto rounded w-full h-full object-cover"
                  :src="currentImage(item.image)"
                  :alt="item.name"
                  @error="imageErrorDisplay"
                />
              </div>

              <div
                class="flex flex-col justify-between pt-4 pb-2 flex-1 gap-6 pr-2"
              >
                <div
                  class="flex flex-col justify-between items-start gap-2"
                  @click="openModalRecipe(item)"
                >
                  <div>
                    <div class="text-base font-medium mt-2">
                      {{ item.name }}
                    </div>
                  </div>
                  <!-- <div class="bg-surface-100 p-1" style="border-radius: 30px">
                    <p class="line-clamp-3 text-sm overflow-y-scroll">
                      {{ descriptionCleaned(item.description) }}
                    </p>
                  </div> -->
                </div>
                <div class="flex flex-col gap-8 max-w-48">
                  <SaveButton :recipe="item"></SaveButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>
