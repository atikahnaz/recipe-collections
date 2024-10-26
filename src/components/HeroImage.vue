<script setup lang="ts">
import heroImage from "../assets/pexels-ella-olsson-572949-1640770.jpg";
import SearchBar from "./SearchBar.vue";
</script>
<template>
  <div class="relative">
    <div class="md:h-96 lg:h-[600px]">
      <img
        :src="heroImage"
        alt="recipe-search"
        class="h-full w-full object-cover"
      />
    </div>
    <div class="absolute flex flex-col items-center justify-center inset-0">
      <div
        class="bg-white bg-opacity-60 flex flex-col w-fit justify-center items-center py-6"
      >
        <h2
          class="text-lg sm:text-2xl md:text-3xl font-semibold tracking-wide w-2/3 text-gray-800 text-left"
        >
          Discover and save recipes you'll love
        </h2>
        <div class="w-2/3 pt-2">
          <SearchBar />
        </div>
      </div>
    </div>
  </div>
</template>
