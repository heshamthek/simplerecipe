import React, { useState, useEffect } from 'react';

const RecipeForm = ({ onRecipeAdded, onRecipeUpdated, recipe }) => {
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [time, setTime] = useState('');

    useEffect(() => {
        if (recipe) {
            setName(recipe.name);
            setIngredients(recipe.ingredients);
            setTime(recipe.time);
        }
    }, [recipe]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newRecipe = { name, ingredients, time };

        if (recipe) {
            // Update existing recipe
            fetch(`http://localhost:3001/recipes/${recipe.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newRecipe),
            })
                .then((response) => response.json())
                .then((data) => onRecipeUpdated(data));
        } else {
            // Add new recipe
            fetch('http://localhost:3001/recipes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newRecipe),
            })
                .then((response) => response.json())
                .then((data) => onRecipeAdded(data));
        }

        setName('');
        setIngredients('');
        setTime('');
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md mb-6">
            <h2 className="text-2xl font-bold mb-4">{recipe ? 'Edit Recipe' : 'Add a New Recipe'}</h2>
            <div className="mb-4">
                <label className="block mb-1">Recipe Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Ingredients</label>
                <input
                    type="text"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Time</label>
                <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    required
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
                {recipe ? 'Update Recipe' : 'Add Recipe'}
            </button>
        </form>
    );
};

export default RecipeForm;
