import { defineStore } from "pinia";
import { ref } from "vue";

export const useRecipeListStore = defineStore("recipeListStore", () => {
  const API_URL: string = `https://raw.githubusercontent.com/micahcochran/json-cookbook/refs/heads/main/cookbook-100.json`;
  const recipeApi = ref<any[]>([]);
  const recipeLocallySaved = ref<any[]>([]);
  const searchRecipeResult = ref<any[]>([]);
  const noRecipeMessage = ref<string>();
  const openSavedPage = ref<boolean>(false);

  async function fetchdata(): Promise<void> {
    try {
      // retrive data from api
      const response: Response = await fetch(API_URL);
      const data: any[] = await response.json();
      recipeApi.value = data;

      // retrieve data from local storage
      const dataLocal: any | null = localStorage.getItem("recipeLocallySaved");

      recipeLocallySaved.value = dataLocal ? JSON.parse(dataLocal) : [];
    } catch (error) {
      //console.log(error);
    }
  }

  function saveRecipeToLocalStorage(item: object) {
    recipeLocallySaved.value.push(item);
    localStorage.setItem(
      "recipeLocallySaved",
      JSON.stringify(recipeLocallySaved.value)
    );
  }

  function deleteRecipe(name: string) {
    const updatedRecipe = recipeLocallySaved.value.filter((recipe) => {
      return recipe.name !== name;
    });

    recipeLocallySaved.value = updatedRecipe;

    localStorage.setItem("recipeLocallySaved", JSON.stringify(updatedRecipe));
  }

  function searchRecipe(ingredient: string) {
    if (!recipeApi.value.length) {
      console.error("No recipes available to search");
      return;
    }

    const resultRecipe = recipeApi.value.filter((recipe) => {
      if (!Array.isArray(recipe.recipeIngredient)) {
        return false;
      }
      return recipe.recipeIngredient.some((item: string) =>
        item.toLowerCase().includes(ingredient.toLowerCase())
      );
    });

    if (resultRecipe.length === 0) {
      console.log("No recipes found for the provided ingredient");
      noRecipeMessage.value = "No recipes found";
    } else {
      noRecipeMessage.value = "";
    }

    searchRecipeResult.value = resultRecipe;
  }
  const handleSavedPage = () => (openSavedPage.value = !openSavedPage.value);

  return {
    recipeApi,
    recipeLocallySaved,
    searchRecipeResult,
    noRecipeMessage,
    openSavedPage,
    fetchdata,
    saveRecipeToLocalStorage,
    deleteRecipe,
    searchRecipe,
    handleSavedPage,
  };
});
