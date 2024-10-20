import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import Link from 'next/link';

const RecipeList = ({ searchQuery, filters }) => {
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch recipes based on the search query
  const getPopular = async (query) => {
    setLoading(true);

    const check = localStorage.getItem(query);

    if (check) {
      setPopularRecipes(JSON.parse(check));
      setLoading(false);
    } else {
      try {

        
        
    // // Filter out empty arrays from filters
    // const filteredFilters = Object.fromEntries(
    //   Object.entries(filters).filter(([key, value]) => value.length > 0)
    // );


        console.log('Fetching recipes with query:', query, 'and filters:', filters);

        const response = await fetch('/api/edamam', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            searchQuery: query,
            filters,  // Pass filters if applicable
            userId: null,  // Optional: Add userId if needed
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const formattedData = await response.json();
        setPopularRecipes(formattedData.savedRecipes);  // Update state with stored recipes
        localStorage.setItem(query, JSON.stringify(formattedData.savedRecipes));  // Cache results in localStorage
        console.log("retrieved recipes:",formattedData.savedRecipes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching or storing data:', error);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (searchQuery.trim()) {
      getPopular(searchQuery);
    }
  }, [searchQuery, filters]);

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-8">
      {loading && <p>Loading recipes...</p>}
      <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-6 gap-6 p-4">
        {popularRecipes.map((item, index) => {
          const { label, image, uri } = item;  // Adjust to match your recipe structure
          const recipeId = encodeURIComponent(uri.split('#recipe_')[1]);  // Generate recipe ID from URI

          return (
            <Link href={`/pages/recipes/${recipeId}`} key={index}>
              <RecipeCard recipeData={{ label, image }} />  {/* Pass relevant data to RecipeCard */}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RecipeList;
