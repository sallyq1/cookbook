// pages/api/fetchRecipe.js
export default async function handler(req, res) {
    const { id } = req.query; // Get the recipe ID from the query parameters
  
    if (!id) {
      return res.status(400).json({ error: "Recipe ID is required" });
    }
  
    const apiUrl =  `https://api.edamam.com/api/recipes/v2/by-uri?type=public&uri=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_${id}&app_id=${process.env.NEXT_PUBLIC_APP_ID}&app_key=${process.env.NEXT_PUBLIC_API_KEY}`;
  
    try {

      const apiResponse = await fetch(apiUrl);
  
      if (!apiResponse.ok) {
        return res.status(apiResponse.status).json({ error: "Error fetching recipe" });
      }
  
      const recipeData = await apiResponse.json();

      console.log(recipeData.hits);
  
      // Forwarding the API response to the frontend
      return res.status(200).json(recipeData.hits);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  