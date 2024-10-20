"use client";

import React, { useContext, useEffect, useState, useRef } from "react";
import { useRouter } from 'next/navigation';
import { SearchContext } from '../context/SearchContext';  // Import SearchContext
import SearchFilterDropdown from "../components/SearchFilterDropdown";
import RecipeList from "../components/RecipeList";
import Navbar from "../components/Navbar";
import "../styles/globals.css"

const SearchPage = () => {
  const { searchQuery, handleSearchChange, filters, handleFilterSelect } = useContext(SearchContext);  // Access context values
  const [showDropdown, setShowDropdown] = useState(false);  // Local state for dropdown visibility
  const dropdownRef = useRef(null);  // Ref for dropdown
  const inputRef = useRef(null);  // Ref for input field
  const router = useRouter();

  // Update the URL whenever filters or search query changes
  useEffect(() => {
    const queryParams = new URLSearchParams({
      ...(searchQuery && { searchQuery }),
      ...(filters.diet.length > 0 && { diet: filters.diet.join(",") }),
      ...(filters.health.length > 0 && { health: filters.health.join(",") }),
      ...(filters.cuisineType.length > 0 && { cuisineType: filters.cuisineType.join(",") }),
      ...(filters.mealType.length > 0 && { mealType: filters.mealType.join(",") }),
      ...(filters.dishType.length > 0 && { dishType: filters.dishType.join(",") }),
    });

    if (queryParams.toString()) {
      console.log("Queryparams: ", queryParams);
      router.push(`/search?${queryParams.toString()}`);
    }
  }, [searchQuery, filters]);

  // Show dropdown when clicking on the navbar
  const handleNavbarClick = () => {
    setShowDropdown(true);
  };

  // Hide dropdown when typing starts
  const handleInputChange = (event) => {
    setShowDropdown(false);
    handleSearchChange(event.target.value);  // Use context handler
  };

  // Hide dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      {/* <Navbar
        onNavbarClick={handleNavbarClick}  // Pass the navbar click handler
        onInputChange={handleInputChange}  // Pass input change handler
        inputRef={inputRef}  // Pass input ref
      /> */}

      {/* <SearchFilterDropdown
        showDropdown={showDropdown}
        dropdownRef={dropdownRef}  // Pass dropdown ref
        onFilterSelect={handleFilterSelect}  // Pass filter selection handler from context
        selectedFilters={filters}  // Pass the global filters from context
      /> */}
      <RecipeList searchQuery={searchQuery} filters={filters} />
    </div>
  );
};

export default SearchPage;
