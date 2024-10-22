import { defineStore } from "pinia";
import { ref } from "vue";

export const useRecipeListStore = defineStore("recipeListStore", () => {
  const API_URL: string = `https://raw.githubusercontent.com/micahcochran/json-cookbook/refs/heads/main/cookbook-100.json`;
  const recipeApi = ref<any[]>([]);
  const recipeLocallySaved = ref<any[]>([]);

  async function fetchdata(): Promise<void> {
    console.log("fetchdata");
    try {
      // retrive data from api
      const response: Response = await fetch(API_URL);
      const data: any[] = await response.json();
      recipeApi.value = data;

      // retrieve data from local storage
      const dataLocal: any | null = localStorage.getItem("recipeLocallySaved");
      console.log(dataLocal);
      console.log(recipeLocallySaved);
      recipeLocallySaved.value = dataLocal ? JSON.parse(dataLocal) : [];
      console.log(recipeLocallySaved.value);
    } catch (error) {
      //console.log(error);
    }
  }

  function saveRecipeToLocalStorage(item: object) {
    console.log("functn save");
    console.log(item);
    console.log(recipeLocallySaved.value);
    recipeLocallySaved.value.push(item);
    localStorage.setItem(
      "recipeLocallySaved",
      JSON.stringify(recipeLocallySaved.value)
    );
    console.log("save recipe");
    console.log(recipeLocallySaved);
  }

  return {
    recipeApi,
    recipeLocallySaved,
    fetchdata,
    saveRecipeToLocalStorage,
  };
});
