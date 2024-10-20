
"use client";

import { useSearchParams } from 'next/navigation'; // For reading query params
import React, { useEffect, useState } from 'react';
import RecipeList from '../components/RecipeList'; // Assuming you have a RecipeList component

const SearchPage = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('searchQuery');
  const [filters, setFilters] = useState({
    diet: searchParams.get('diet') ? searchParams.get('diet').split(",") : [],
    health: searchParams.get('health') ? searchParams.get('health').split(",") : [],
    cuisineType: searchParams.get('cuisineType') ? searchParams.get('cuisineType').split(",") : [],
    mealType: searchParams.get('mealType') ? searchParams.get('mealType').split(",") : [],
    dishType: searchParams.get('dishType') ? searchParams.get('dishType').split(",") : [],
  });

  useEffect(() => {
    // Perform any data fetching or API calls based on searchQuery and filters here
    console.log('Search query:', searchQuery);
    console.log('Filters:', filters);
  }, [searchQuery, filters]);

  return (
    <div>
      <h1>Search Results for "{searchQuery}"</h1>
      {/* Display search results here */}
      <RecipeList searchQuery={searchQuery} filters={filters} />
    </div>
  );
};

export default SearchPage;
