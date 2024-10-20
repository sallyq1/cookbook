"use client";

import { useState } from 'react';

export default function RecipeTest() {
  const [status, setStatus] = useState('');
  const [recipe, setRecipe] = useState(null);

  // Form state for creating/updating recipes
  const [createForm, setCreateForm] = useState({
    title: '',
    description: '',
    ingredients: '',
    steps: '',
    userId: '1', // Default user ID, update as necessary
  });

  const [updateForm, setUpdateForm] = useState({
    id: '',
    title: '',
    description: '',
    ingredients: '',
    steps: '',
  });

  const [recipeIdToFetch, setRecipeIdToFetch] = useState('');
  const [recipeIdToDelete, setRecipeIdToDelete] = useState('');

  // Handle form inputs for create and update
  const handleCreateInputChange = (e) => {
    setCreateForm({ ...createForm, [e.target.name]: e.target.value });
  };

  const handleUpdateInputChange = (e) => {
    setUpdateForm({ ...updateForm, [e.target.name]: e.target.value });
  };

  // Create a new recipe
  const createRecipe = async (e) => {
    e.preventDefault(); // Prevent page refresh
    const response = await fetch('/api/recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createForm),
    });

    const data = await response.json();
    setStatus(`Create: ${response.ok ? 'Success' : 'Error'} - ${JSON.stringify(data)}`);
  };

  // Fetch a recipe by ID
  const fetchRecipe = async (e) => {
    e.preventDefault(); // Prevent page refresh
    const response = await fetch(`/api/recipes?id=${recipeIdToFetch}`, {
      method: 'GET',
    });

    const data = await response.json();
    setRecipe(data);
    setStatus(`Fetch: ${response.ok ? 'Success' : 'Error'} - ${JSON.stringify(data)}`);
  };

  // Update a recipe by ID
  const updateRecipe = async (e) => {
    e.preventDefault(); // Prevent page refresh
    const response = await fetch(`/api/recipes?id=${updateForm.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: updateForm.title,
        description: updateForm.description,
        ingredients: updateForm.ingredients,
        steps: updateForm.steps,
      }),
    });

    const data = await response.json();
    setStatus(`Update: ${response.ok ? 'Success' : 'Error'} - ${JSON.stringify(data)}`);
  };

  // Delete a recipe by ID
  const deleteRecipe = async (e) => {
    e.preventDefault(); // Prevent page refresh
    const response = await fetch(`/api/recipes?id=${recipeIdToDelete}`, {
      method: 'DELETE',
    });

    const data = await response.json();
    setStatus(`Delete: ${response.ok ? 'Success' : 'Error'} - ${JSON.stringify(data)}`);
  };

  return (
    <div>
      <h1>Recipe CRUD Operations</h1>

      {/* Form to create a new recipe */}
      <h2>Create a Recipe</h2>
      <form onSubmit={createRecipe}>
        <input
          name="title"
          type="text"
          placeholder="Title"
          value={createForm.title}
          onChange={handleCreateInputChange}
        />
        <input
          name="description"
          type="text"
          placeholder="Description"
          value={createForm.description}
          onChange={handleCreateInputChange}
        />
        <input
          name="ingredients"
          type="text"
          placeholder="Ingredients"
          value={createForm.ingredients}
          onChange={handleCreateInputChange}
        />
        <input
          name="steps"
          type="text"
          placeholder="Steps"
          value={createForm.steps}
          onChange={handleCreateInputChange}
        />
        <button type="submit">Create Recipe</button>
      </form>

      {/* Form to fetch a recipe by ID */}
      <h2>Fetch Recipe by ID</h2>
      <form onSubmit={fetchRecipe}>
        <input
          type="text"
          placeholder="Recipe ID"
          value={recipeIdToFetch}
          onChange={(e) => setRecipeIdToFetch(e.target.value)}
        />
        <button type="submit">Fetch Recipe</button>
      </form>

      {/* Form to update a recipe */}
      <h2>Update a Recipe by ID</h2>
      <form onSubmit={updateRecipe}>
        <input
          name="id"
          type="text"
          placeholder="Recipe ID"
          value={updateForm.id}
          onChange={handleUpdateInputChange}
        />
        <input
          name="title"
          type="text"
          placeholder="New Title"
          value={updateForm.title}
          onChange={handleUpdateInputChange}
        />
        <input
          name="description"
          type="text"
          placeholder="New Description"
          value={updateForm.description}
          onChange={handleUpdateInputChange}
        />
        <input
          name="ingredients"
          type="text"
          placeholder="New Ingredients"
          value={updateForm.ingredients}
          onChange={handleUpdateInputChange}
        />
        <input
          name="steps"
          type="text"
          placeholder="New Steps"
          value={updateForm.steps}
          onChange={handleUpdateInputChange}
        />
        <button type="submit">Update Recipe</button>
      </form>

      {/* Form to delete a recipe by ID */}
      <h2>Delete a Recipe by ID</h2>
      <form onSubmit={deleteRecipe}>
        <input
          type="text"
          placeholder="Recipe ID"
          value={recipeIdToDelete}
          onChange={(e) => setRecipeIdToDelete(e.target.value)}
        />
        <button type="submit">Delete Recipe</button>
      </form>

      {/* Display status and fetched recipe */}
      <p>Status: {status}</p>
      {recipe && (
        <div>
          <h2>Fetched Recipe:</h2>
          <pre>{JSON.stringify(recipe, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
