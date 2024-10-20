
"use client";
import { useRouter } from 'next/navigation'; // Correct import for App Router
import { useParams } from 'next/navigation'; // Use useParams to get route params
import '@/app/styles/globals.css';

import { useEffect, useState } from 'react';
import RecipeItem from '@/app/components/RecipeItem';

const fetchRecipeById = async (id) => {
    const response = await fetch(`/api/fetchRecipe?id=${id}`);
    const data = await response.json();
    console.log(data);
    return data[0]; // Single recipe object
  };


  const RecipeDetailPage = () => {
    const { id } = useParams(); // Get the recipe ID from the URL using useParams
    const [recipe, setRecipe] = useState(null);
  
    useEffect(() => {
      if (id) {
        console.log("fetched id: ", id)
        fetchRecipeById(id).then((data) => {
            console.log("fetched data: ", data)
          setRecipe(data);
        });
      }
    }, [id]);
  
    if (!recipe) return <div>Loading...</div>;
  
    return (
      <div className="container mx-auto p-4">
 
        <RecipeItem recipeData={recipe} />
      </div>
    );
  };
  
  export default RecipeDetailPage;