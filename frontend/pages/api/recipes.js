import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    // Create a new recipe
    case 'POST':
      await createRecipe(req, res);
      break;

    // Get all recipes or a single recipe by ID
    case 'GET':
      await getRecipe(req, res);
      break;

    // Update a recipe by ID
    case 'PUT':
      await updateRecipe(req, res);
      break;

    // Delete a recipe by ID
    case 'DELETE':
      await deleteRecipe(req, res);
      break;

    // Handle unsupported methods
    default:
      res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

// CREATE: Create a new recipe
async function createRecipe(req, res) {
  const { title, description, ingredients, steps, userId } = req.body;

  try {
    const newRecipe = await prisma.recipe.create({
      data: {
        title,
        description,
        ingredients,
        steps,
        author: {
          connect: { id: userId }, // Assuming userId exists and is valid
        },
      },
    });
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating recipe" });
  }
}

// READ: Get all recipes or a single recipe by ID
async function getRecipe(req, res) {
  const { id } = req.query;

  try {
    if (id) {
      // Get a single recipe by ID
      const recipe = await prisma.recipe.findUnique({
        where: { id: parseInt(id) }, // Assuming ID is an integer
      });
      if (!recipe) {
        return res.status(404).json({ error: "Recipe not found" });
      }
      res.status(200).json(recipe);
    } else {
      // Get all recipes
      const recipes = await prisma.recipe.findMany();
      res.status(200).json(recipes);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching recipe(s)" });
  }
}

// UPDATE: Update an existing recipe by ID
async function updateRecipe(req, res) {
  const { id } = req.query;
  const { title, description, ingredients, steps } = req.body;

  try {
    const updatedRecipe = await prisma.recipe.update({
      where: { id: parseInt(id) }, // Assuming ID is an integer
      data: {
        title,
        description,
        ingredients,
        steps,
      },
    });
    res.status(200).json(updatedRecipe);
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      // Handle the case where the record doesn't exist
      res.status(404).json({ error: "Recipe not found" });
    } else {
      res.status(500).json({ error: "Error updating recipe" });
    }
  }
}

// DELETE: Delete a recipe by ID
async function deleteRecipe(req, res) {
  const { id } = req.query;

  try {
    const deletedRecipe = await prisma.recipe.delete({
      where: { id: parseInt(id) }, // Assuming ID is an integer
    });
    res.status(200).json(deletedRecipe);
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      // Handle the case where the record doesn't exist
      res.status(404).json({ error: "Recipe not found" });
    } else {
      res.status(500).json({ error: "Error deleting recipe" });
    }
  }
}
