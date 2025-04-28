import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/books");
        setBooks(response.data);
      } catch (err) {
        console.error("Bir hata oluştu:", err);
        setError("Kitaplar alınırken bir hata oluştu!");
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
          Kitaplar
        </h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="space-y-4">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:bg-gray-50 transition"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {book.title}
              </h2>
              <p className="text-gray-600">Yazar: {book.author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
