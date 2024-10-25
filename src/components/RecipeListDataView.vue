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

const descriptionCleaned = (description: string) =>
  description.replace(/&nbsp;/g, " ").replace(/\u2014/g, "—");
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

    <DataView :value="displayedRecipes" paginator :rows="5" dataKey="id">
      <template #list="slotProps">
        <div class="flex flex-col">
          <div
            v-for="(item, index) in slotProps.items"
            :key="index"
            class="mb-6"
          >
            <div
              class="flex flex-col md:flex-row sm:items-center gap-4"
              :class="{
                'border-t border-surface-200 dark:border-surface-700':
                  index !== 0,
              }"
            >
              <div
                class="md:w-40 relative"
                @click="openModalRecipe(item)"
                @close="closeModalRecipe"
              >
                <img
                  class="block xl:block mx-auto rounded w-full"
                  :src="currentImage(item.image)"
                  :alt="item.name"
                  @error="imageErrorDisplay"
                />
              </div>
              <div
                class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6 mb-4"
              >
                <div
                  class="flex flex-col justify-between items-start gap-2"
                  @click="openModalRecipe(item)"
                >
                  <div>
                    <div class="text-lg font-medium mt-2">{{ item.name }}</div>
                  </div>
                  <div class="bg-surface-100 p-1" style="border-radius: 30px">
                    <p class="line-clamp-3 text-sm overflow-y-scroll">
                      {{ descriptionCleaned(item.description) }}
                    </p>
                  </div>
                </div>
                <div class="flex flex-col items-end gap-8">
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
