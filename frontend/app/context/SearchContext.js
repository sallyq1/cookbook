
"use client";


import { createContext, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

// Create the search context
export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');  // Global search query state
  const [showDropdown, setShowDropdown] = useState(false);  // Local state for dropdown visibility
  const dropdownRef = useRef(null);  // Ref for dropdown
  const inputRef = useRef(null);  // Ref for input field
  const router = useRouter();
  
  const [filters, setFilters] = useState({            // Global filters state

    
    diet: [],
    health: [],
    cuisineType: [],
    mealType: [],
    dishType: [],
  });

  // Function to handle search query change
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  // Function to handle filter selection
  const handleFilterSelect = (filterCategory, filterValue) => {
    setFilters((prevFilters) => {
      const prevCategoryFilters = prevFilters[filterCategory];
      // Toggle filter on/off
      if (prevCategoryFilters.includes(filterValue)) {
        return {
          ...prevFilters,
          [filterCategory]: prevCategoryFilters.filter((f) => f !== filterValue),
        };
      } else {
        return {
          ...prevFilters,
          [filterCategory]: [...prevCategoryFilters, filterValue],
        };
      }
    });
  };


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
      router.push(`/search?${queryParams.toString()}`);
    }
  }, [searchQuery, filters]);



  // Show dropdown when clicking on the navbar
  const handleNavbarClick = () => {
    setShowDropdown(true);
  };

// Hide dropdown when typing starts
  const handleInputChange = () => {
    setShowDropdown(false);
    
  };

  // Hide dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      inputRef.current &&  // Ensure the inputRef is valid
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
    <SearchContext.Provider value={{ searchQuery, handleSearchChange, filters, handleFilterSelect, handleNavbarClick, handleInputChange, inputRef, showDropdown, setShowDropdown  }}>
      {children}
    </SearchContext.Provider>
  );
};
