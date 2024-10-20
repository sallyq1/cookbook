import React from "react";
import Link from "next/link";
import Image from "next/image";

import { StopwatchIcon, SaveIcon, SavedIcon, RightArrow, BackArrow, StarSolid, StarEmpty, ExternalLink, LocationIcon, DropdownArrow, ShoppingCart, ServingSize, CaloriesIcon } from "@/app/assets";


const RecipeItem = ({ recipeData }) => {
  // Destructure the necessary fields from the recipeData object
  const {
    label,
    image,
    ingredientLines,
    source,
    url,
    calories,
    yield: servings,
    totalTime,
    dietLabels,
    healthLabels,
    totalNutrients,
  } = recipeData.recipe;

  // Function to filter health labels based on conditions
  const filterHealthLabels = (healthLabels) => {
    const relevantHealthLabels = [
      "Vegan",
      "Vegetarian",
      "Gluten-Free",
      "Dairy-Free",
      "Paleo",
      "Sugar-Conscious",
      "Peanut-Free",
      "Soy-Free",
      "Tree-Nut-Free",
    ];



    // Check if "Vegan" is present and exclude "Vegetarian" if it is
    if (healthLabels.includes("Vegan")) {
      return healthLabels.filter(
        (label) =>
          relevantHealthLabels.includes(label) && label !== "Vegetarian"
      );
    }

    // Return all relevant health labels if "Vegan" is not present
    return healthLabels.filter((label) => relevantHealthLabels.includes(label));
  };

  // Get the filtered health labels
  const filteredHealthLabels = filterHealthLabels(healthLabels);

  return (
    <div className="recipe-item container mx-auto p-4">
      <div>
        <div className="recipe-item max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-lg">
          {/* Back and Save Section */}
          <div className="recipe-header flex justify-between items-center mb-4">
            <div className="back-save flex items-center space-x-2">
              <button className="back-button text-xl text-gray-600 hover:text-gray-800">
               <BackArrow className="scale-[0.70]"/>
              </button>
              <h1 className="recipe-title text-2xl font-semibold">
                {recipeData.recipe.label}
              </h1>
            </div>
            <div className="flex">

              <button className="mr-3 font-semibold flex items-center">soups <DropdownArrow className="ml-2"/> </button>
              <button className="save-button bg-black text-white px-4 py-2 rounded-full">
                Save
              </button>
            </div>
          </div>

          {/* Recipe Details */}
          <div className="recipe-details mb-4">
            <div className="time-and-ratings flex items-center space-x-4 text-gray-600 mb-2">
              <span className="time flex items-center space-x-1">
                <StopwatchIcon/>
                <span>{totalTime} min</span>
              </span>
              <span className="ingredients">
                • {ingredientLines.length + 1} ingredients
              </span>
              <span className="rating flex items-center space-x-1">
                <span className="flex scale-[0.7] *:m-1"><StarSolid/> <StarSolid/> <StarSolid/> <StarSolid/> <StarEmpty/> </span>
                <span className="rating-value">4.83</span>
                <span>(130)</span>
              </span>
            </div>

            {/* Diet and Health Labels */}

           
           <div className="flex width-[80]">
           {dietLabels.length > 0 && (
              <div className="labels flex space-x-2 mb-2">
                {dietLabels.map((label, index) => (
                  <span
                    key={index}
                    className=" bg-white shadow-[inset_0px_0px_6px_0px_rgba(0,_0,_0,_0.1)] text-gray-800 px-3 py-2 rounded-full text-nowrap font-semibold"
                  >
                    {label}
                  </span>
                ))}
              </div>
            )}
            {filteredHealthLabels.length > 0 && (
              <div className="labels flex space-x-2 mb-2">
                {filteredHealthLabels.map((label, index) => (
                  <span
                    key={index}
                    className=" bg-white shadow-[inset_0px_0px_6px_0px_rgba(0,_0,_0,_0.1)] text-gray-800 px-3 py-2 rounded-full text-nowrap font-semibold"
                  >
                    {label}
                  </span>
                ))}
              </div>
            )}

           </div>
           
   

            {/* Recipe Source */}

            <Link href={url} passHref>
              <button className="bg-black text-white flex items-center px-10 py-3 rounded-full "  ><h5>See Recipe</h5> <ExternalLink className="pl-1"/> </button>
            </Link>
          </div>

          <Image
            src={image}
            alt={label}
            width={700}
            height={100}
            className="rounded-lg height-[300px]"
          />

          {/* Additional Info */}
          <div className="additional-info mb-4">
            <div className="prep-time flex justify-between text-gray-600">
              {/* Calories and Time */}
              <div className="flex items-center justify-between mt-4 *:mr-5">
                <p className="flex items-center"><ServingSize className="scale-[0.7] mr-1"/>Servings: {servings}</p>
                <p className="flex items-center"><StopwatchIcon className="scale-[1.8] mr-5"/>Total Time: {totalTime} min</p>

                <p className="flex items-center"><CaloriesIcon className="mr-1 scale-[0.7]"/>Calories: {Math.round(calories)} kcal</p>
              </div>
            </div>
          </div>


<span className="flex">
        {/* Ingredients List */}
          <div className="ingredients mb-4">
            <h2 className="text-xl font-semibold ">Ingredients</h2>
            <ul className="pl-5 space-y-1">
              {ingredientLines.map((ingredient, index) => (
                <li key={index} className=" list-none">
                  {ingredient}
                  <input type="checkbox" className="mr-2" />
                </li>
              ))}

              <li>1 cup unsalted butter</li>
            </ul>
          </div>

          {/* Shopping Cart Section */}
          <div className="shopping-cart bg-gray-100 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Shopping Cart</h3>
            <div className="location mb-2">
              <span className="location-icon"><LocationIcon/></span> Allen, TX 75002
            </div>
            <div className="instacart bg-white p-2 rounded-lg shadow-sm flex justify-between items-center">
              <span className="font-medium">Instacart</span>
            </div>
            <button className="get-ingredients-button mt-4 bg-black text-white px-4 py-2 rounded-full w-full">
              Get ingredients <ShoppingCart/>
            </button>
          </div>

          </span>
          {/* Nutrition Facts */}
          <div className="mt-4">
            <h3 className="font-bold text-lg mb-2">Nutritional Information</h3>
            <ul className="list-disc list-inside">
              <li>
                Energy: {Math.round(totalNutrients.ENERC_KCAL.quantity)} kcal
              </li>
              <li>
                Fat:{" "}
                {totalNutrients.FAT
                  ? totalNutrients.FAT.quantity.toFixed(2)
                  : "N/A"}{" "}
                g
              </li>
              <li>
                Carbs:{" "}
                {totalNutrients.CHOCDF
                  ? totalNutrients.CHOCDF.quantity.toFixed(2)
                  : "N/A"}{" "}
                g
              </li>
              <li>
                Protein:{" "}
                {totalNutrients.PROCNT
                  ? totalNutrients.PROCNT.quantity.toFixed(2)
                  : "N/A"}{" "}
                g
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeItem;
