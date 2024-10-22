<script setup lang="ts">
import { onMounted } from "vue";
//import { ProductService } from "@/service/ProductService";
import { useRecipeListStore } from "../stores/recipeStore";
import DataView from "primevue/dataview";
import SaveButton from "./SaveButton.vue";

const store = useRecipeListStore();

// onMounted(() => {
//   ProductService.getProductsSmall().then((data) => (products.value = data));
// });
onMounted(() => {
  store.fetchdata();
});

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
</script>

<template>
  <div class="card">
    <DataView :value="store.recipeApi" paginator :rows="5">
      <template #list="slotProps">
        <div class="flex flex-col">
          <div v-for="(item, index) in slotProps.items" :key="index">
            <div
              class="flex flex-col sm:flex-row sm:items-center p-6 gap-4"
              :class="{
                'border-t border-surface-200 dark:border-surface-700':
                  index !== 0,
              }"
            >
              <div class="md:w-40 relative">
                <img
                  class="block xl:block mx-auto rounded w-full"
                  :src="currentImage(item.image)"
                  :alt="item.name"
                  @error="imageErrorDisplay"
                />
                <div
                  class="absolute bg-black/70 rounded-border"
                  style="left: 4px; top: 4px"
                >
                  <p>status</p>
                </div>
              </div>
              <div
                class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6"
              >
                <div
                  class="flex flex-row md:flex-col justify-between items-start gap-2"
                >
                  <div>
                    <span
                      class="font-medium text-surface-500 dark:text-surface-400 text-sm"
                      >category</span
                    >
                    <div class="text-lg font-medium mt-2">{{ item.name }}</div>
                  </div>
                  <div class="bg-surface-100 p-1" style="border-radius: 30px">
                    <div
                      class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2"
                      style="
                        border-radius: 30px;
                        box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04),
                          0px 1px 2px 0px rgba(0, 0, 0, 0.06);
                      "
                    >
                      <span class="text-surface-900 font-medium text-sm"
                        >rating</span
                      >
                      <i class="pi pi-star-fill text-yellow-500"></i>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col md:items-end gap-8">
                  <p>price</p>
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
