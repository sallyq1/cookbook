"use client";
import {React, useContext }from "react";
import { SearchContext } from '../context/SearchContext';  // Import SearchContext


const SearchFilterDropdown = () => {
  
  const { filters, handleFilterSelect, showDropdown, dropdownRef } = useContext(SearchContext);  // Access global filters and filter handling

  
  if (!showDropdown) return null; // Only render if showDropdown is true


    // Example filters (can be dynamic)
    const dietFilters = ["balanced", "high-protein", "low-fat", "low-carb"];
    const healthFilters = ["vegan", "vegetarian", "peanut-free", "gluten-free"];
    const cuisineFilters = ["American", "Asian", "Italian", "French"];
    const mealFilters = ["Breakfast", "Lunch", "Dinner"];
    const dishFilters = ["Main course", "Dessert", "Appetizer"];
   


  return (
    <div
      className="absolute top-20 left-[305px]  w-[880px] mt-2  bg-white rounded-b-3xl shadow-xl z-10 p-5"
      ref={dropdownRef}
    >


<div className="p-4">
        <h4 className="font-semibold mb-2">Diet Filters</h4>
        {dietFilters.map((filter) => (
          <button
            key={filter}
            className={`px-4 py-1 m-1 border rounded ${
              filters.diet.includes(filter) ? "bg-gray-200" : ""
            }`}
            onClick={() => handleFilterSelect("diet", filter)} // Pass filter category and value
          >
            {filter}
          </button>
        ))}
        <h4 className="font-semibold mt-4 mb-2">Health Filters</h4>
        {healthFilters.map((filter) => (
          <button
            key={filter}
            className={`px-4 py-1 m-1 border rounded ${
              filters.health.includes(filter) ? "bg-gray-200" : ""
            }`}
            onClick={() => handleFilterSelect("health", filter)} // Pass filter category and value
          >
            {filter}
          </button>
        ))}
        <h4 className="font-semibold mt-4 mb-2">Cuisine Filters</h4>
        {cuisineFilters.map((filter) => (
          <button
            key={filter}
            className={`px-4 py-1 m-1 border rounded ${
              filters.cuisineType.includes(filter) ? "bg-gray-200" : ""
            }`}
            onClick={() => handleFilterSelect("cuisineType", filter)} // Pass filter category and value
          >
            {filter}
          </button>
        ))}
        <h4 className="font-semibold mt-4 mb-2">Meal Filters</h4>
        {mealFilters.map((filter) => (
          <button
            key={filter}
            className={`px-4 py-1 m-1 border rounded ${
              filters.mealType.includes(filter) ? "bg-gray-200" : ""
            }`}
            onClick={() => handleFilterSelect("mealType", filter)} // Pass filter category and value
          >
            {filter}
          </button>
        ))}
        <h4 className="font-semibold mt-4 mb-2">Dish Filters</h4>
        {dishFilters.map((filter) => (
          <button
            key={filter}
            className={`px-4 py-1 m-1 border rounded ${
              filters.dishType.includes(filter) ? "bg-gray-200" : ""
            }`}
            onClick={() => handleFilterSelect("dishType", filter)} // Pass filter category and value
          >
            {filter}
          </button>
        ))}
      </div>



        
      {/* <h3>Dietary Preferences</h3>
      <ul className="flex *:mr-3 *:my-3 ">
        <li>
          <button className="px-3 py-1 rounded-full  border-[1.5px] border-solid border-[#BFBFBF]">
            Vegan
          </button>
        </li>
        <li>
          <button className="px-3 py-1 rounded-full  border-[1.5px] border-solid border-[#BFBFBF]">
            Vegetarian
          </button>
        </li>
        <li>
          <button className="px-3 py-1 rounded-full  border-[1.5px] border-solid border-[#BFBFBF]">
            Pescatarian
          </button>
        </li>
      </ul>
      <h3>Cuisine</h3>
      <ul className="flex *:mr-3 *:my-3 ">
        <li>
          <button className="px-3 py-1 rounded-full  border-[1.5px] border-solid border-[#BFBFBF]">
            American
          </button>
        </li>
        <li>
          <button className="px-3 py-1 rounded-full  border-[1.5px] border-solid border-[#BFBFBF]">
            Italian
          </button>
        </li>
        <li>
          <button className="px-3 py-1 rounded-full  border-[1.5px] border-solid border-[#BFBFBF]">
            Asian
          </button>
        </li>
      </ul> */}
    </div> 
  );
};

export default SearchFilterDropdown;
