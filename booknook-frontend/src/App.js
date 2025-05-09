import React from "react";
import AddBook from "./components/AddBook";
import AddQuote from "./components/AddQuote";
import EditBook from "./components/EditBook";
import EditQuote from "./components/EditQuote";
import BookQuoteSlider from "./components/BookQuoteSlider";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { BookProvider } from "./context/BookContext";

function App() {
  return (
    <BookProvider>
      <div className="min-h-screen bg-gradient-to-r from-rose-100 via-sky-100 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="max-w-xl mx-auto bg-white/30 backdrop-blur-sm text-3xl font-extrabold text-center text-gray-900 p-2 bg-white rounded-2xl shadow-md transition-all duration-300 transform hover:scale-105">
            📔 BookNook 📔
          </h1>
          <BookQuoteSlider />

          <div className="grid md:grid-cols-4 gap-4 mt-8">
            <AddBook />
            <AddQuote />
            <EditBook />
            <EditQuote />
          </div>
        </div>
      </div>
    </BookProvider>
  );
}

export default App;
