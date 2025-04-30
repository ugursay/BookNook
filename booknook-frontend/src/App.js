import React from "react";
import AddBook from "./components/AddBook";
import AddQuote from "./components/AddQuote";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
          BookNook
        </h1>
        <div className="p-2">
          <AddBook />
        </div>

        <div className="p-2">
          <AddQuote />
        </div>
      </div>
    </div>
  );
}

export default App;
