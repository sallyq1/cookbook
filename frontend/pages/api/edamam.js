import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  const { searchQuery, filters, userId } = req.body;  // Optionally accept a userId from the client
  const app_id = process.env.NEXT_PUBLIC_APP_ID;
  const app_key = process.env.NEXT_PUBLIC_API_KEY;

  // Build the query string for filters
  const buildQueryParams = (filters) => {
    const params = new URLSearchParams();
    if (filters.diet) {
      filters.diet.forEach((diet) => params.append('diet', diet));
    }
    if (filters.health) {
      filters.health.forEach((health) => params.append('health', health));
    }
    if (filters.cuisineType) {
      filters.cuisineType.forEach((cuisine) => params.append('cuisineType', cuisine));
    }
    if (filters.mealType) {
      filters.mealType.forEach((meal) => params.append('mealType', meal));
    }
    if (filters.dishType) {
      filters.dishType.forEach((dish) => params.append('dishType', dish));
    }
    return params.toString();
  };

  const queryParams = buildQueryParams(filters);
  // const url = `https://api.edamam.com/search?q=${searchQuery}&app_id=${app_id}&app_key=${app_key}&from=0&to=60`;

  const url = `https://api.edamam.com/search?q=${searchQuery}&app_id=${app_id}&app_key=${app_key}&from=0&to=60${queryParams ? '&' + queryParams : ''}`;
  console.log("url: ", url)


  try {
    // Fetch recipes from Edamam API
    const apiResult = await fetch(url);
    const data = await apiResult.json();

    if (!data.hits || !Array.isArray(data.hits)) {
      return res.status(400).json({ error: 'No recipes found or invalid response from Edamam API' });
    }

    const recipesToSave = data.hits.map((hit) => {
        return {
          label: hit.recipe.label,
          image: hit.recipe.image,
          uri: hit.recipe.uri,
          source: hit.recipe.source,
          url: hit.recipe.url,
          yield: hit.recipe.yield || null,
          dietLabels: hit.recipe.dietLabels || [],
          healthLabels: hit.recipe.healthLabels || [],
          cautions: hit.recipe.cautions || [],
          ingredientLines: hit.recipe.ingredientLines || [],
          ingredients: hit.recipe.ingredients || [],
          calories: hit.recipe.calories || 0,
          totalTime: hit.recipe.totalTime || 0,
          cuisineType: hit.recipe.cuisineType || [],
          mealType: hit.recipe.mealType || [],
          dishType: hit.recipe.dishType || [],
          totalNutrients: hit.recipe.totalNutrients || {},
          totalDaily: hit.recipe.totalDaily || {},
          userId: userId || null,  // Associate the recipe with a user if userId is provided
        };
      });
    

    // Store each recipe in the database
    const storedRecipes = await prisma.recipe.createMany({
      data: recipesToSave,
      skipDuplicates: true,  // Prevent storing duplicates based on the unique URI
    });

    // Fetch the stored recipes after insertion to return them
    const savedRecipes = await prisma.recipe.findMany({
      where: {
        uri: {
          in: recipesToSave.map((r) => r.uri),  // Find recipes based on their URI
        },
      },
      orderBy: {
        id: 'desc',  // Return the most recently inserted recipes first
      },
      take:60,
      
    });

    res.status(200).json({ message: 'Recipes stored successfully', savedRecipes });
  } catch (error) {
    console.error('Error fetching or storing recipes:', error);
    res.status(500).json({ error: 'Error fetching or storing recipes' });
  }
}
