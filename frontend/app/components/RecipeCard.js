import React, { useState, useEffect } from "react";

import Image from "next/image";

import { StopwatchIcon, SaveIcon, SavedIcon } from "@/app/assets";
import SaveRecipeDropdown from "./SaveRecipeDropdown"


const randomHeight = () => {
    return Math.floor(Math.random() * 200) + 200; // Random height between 150px and 250px
  };


const RecipeCard = ({ recipeData }) => {

  const [showDropdown, setShowDropdown] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [height, setHeight] = useState(0);

    const formatHeading = (heading) => {
        // Check if the name contains a '-' or ':' and remove everything after the first occurrence
        return heading.split(/[:(){}—]/)[0].trim();
      };

    
      // Handle mouse enter event with delay
      const handleMouseEnter = () => {
        const timeout = setTimeout(() => {
          setShowDropdown(true);
        }, 100); // 1 second delay before showing the dropdown
        setHoverTimeout(timeout);
      };
    
      // Handle mouse leave event
      const handleMouseLeave = () => {
        clearTimeout(hoverTimeout);
        setShowDropdown(false);
      };

      useEffect(() => {

        if (height==0)
        {
          setHeight(randomHeight());
        }
    
      }, []);
    
      
  return (
    <div className="recipe-card relative">
     <div className= "w-full overflow-hidden transition-transform transform hover:scale-105  break-inside-avoid mb-6 ">
   
     <div className="relative group ">
   
    <Image
      src={recipeData.image}
      alt={formatHeading(recipeData.label)}
      width={400}
      height={600}
      style={{ height: `${height}px` }}
      className=" object-cover hover:shadow-lg rounded-3xl"
      
    />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl ">
         <div className="flex justify-between my-4 mx-5 items-center">
         <h2 className="text-white text-shadow font-medium cursor-pointer">title</h2>
          
          <button className="bg-white text-black font-semibold py-3 px-3 rounded-full shadow-lg hover:bg-gray-200"
                   onMouseEnter={handleMouseEnter}
                   onMouseLeave={handleMouseLeave}>
            <SaveIcon className="scale-75"/>
          </button>

         </div>
         
       
        </div>

    </div>

    <div className="ml-2 cursor-pointer">
      <h5 className="mt-3 font-semibold text-md ">{formatHeading(recipeData.label)}</h5>
      <div className="flex items-center mt-1">
        <StopwatchIcon className=" mr-2"/>
        <h6 className="text-[14px] flex items-center ">
            <div className="flex items-center mr-1 font-medium"> {recipeData.totalTime} min</div>
         <span className="text-[#8f8f8f] "> • {recipeData.ingredients} ingredients
          </span>
        </h6>
      </div>
    </div>
  </div>

   {/* Dropdown Menu */}
   {showDropdown && <SaveRecipeDropdown />}
  </div>
  );
};

export default RecipeCard;