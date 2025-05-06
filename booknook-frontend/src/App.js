import React from "react";
import AddBook from "./components/AddBook";
import AddQuote from "./components/AddQuote";
import EditBook from "./components/EditBook";
import BookQuoteSlider from "./components/BookQuoteSlider";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { BookProvider } from "./context/BookContext";

function App() {
  return (
    <BookProvider>
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
            BookNook
          </h1>
          <BookQuoteSlider />

          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <AddBook />
            <AddQuote />
            <EditBook />
          </div>
        </div>
      </div>
    </BookProvider>
  );
}

export default App;
