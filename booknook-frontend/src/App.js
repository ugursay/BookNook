import React from "react";
import AddBook from "./AddBook";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
          BookNook
        </h1>
        <AddBook />
      </div>
    </div>
  );
}

export default App;
