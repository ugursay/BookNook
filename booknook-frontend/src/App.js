import React from "react";
import AddBook from "./components/AddBook";
import AddQuote from "./components/AddQuote";
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

          <div className="flex justify-between mt-8">
            <div className="p-2 w-1/2">
              <AddBook />
            </div>

            <div className="p-2 w-1/2">
              <AddQuote />
            </div>
          </div>
        </div>
      </div>
    </BookProvider>
  );
}

export default App;
