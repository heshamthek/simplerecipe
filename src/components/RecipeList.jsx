import React, { useEffect, useState } from 'react';
import RecipeForm from './RecipeForm';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingRecipe, setEditingRecipe] = useState(null); // Track the recipe being edited

    useEffect(() => {
        fetch('http://localhost:3001/recipes')
            .then((response) => response.json())
            .then((data) => {
                setRecipes(data);
                setLoading(false);
            });
    }, []);

    const handleRecipeAdded = (newRecipe) => {
        setRecipes([...recipes, newRecipe]);
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:3001/recipes/${id}`, { method: 'DELETE' })
            .then(() => setRecipes(recipes.filter((recipe) => recipe.id !== id)));
    };

    const handleEdit = (recipe) => {
        setEditingRecipe(recipe);
    };

    const handleRecipeUpdated = (updatedRecipe) => {
        setRecipes(recipes.map((recipe) => (recipe.id === updatedRecipe.id ? updatedRecipe : recipe)));
        setEditingRecipe(null); // Exit edit mode
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            {editingRecipe ? (
                <RecipeForm onRecipeUpdated={handleRecipeUpdated} recipe={editingRecipe} />
            ) : (
                <RecipeForm onRecipeAdded={handleRecipeAdded} />
            )}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {recipes.map((recipe) => (
                    <div key={recipe.id} className="bg-white p-4 rounded-md shadow-md">
                        <h2 className="text-2xl font-bold">{recipe.name}</h2>
                        <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                        <p><strong>Time:</strong> {recipe.time}</p>
                        <button
                            onClick={() => handleEdit(recipe)}
                            className="bg-yellow-500 text-white p-2 rounded-md mt-4"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(recipe.id)}
                            className="bg-red-500 text-white p-2 rounded-md mt-4 ml-2"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipeList;
