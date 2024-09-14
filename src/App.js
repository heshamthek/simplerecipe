import React from 'react';
import RecipeList from './components/RecipeList';

const App = () => {
  return (
      <div className="container mx-auto p-4">
<h1 className="text-4xl font-bold text-center mb-6">Recipe Manager</h1>
<RecipeList />
      </div>
  )
}
export default App;