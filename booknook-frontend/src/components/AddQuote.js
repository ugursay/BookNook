import React, { useState } from "react";
import axios from "axios";

const AddQuote = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [bookId, setBookId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/quotes", {
        book_id: bookId,
        quote,
        author,
      });

      if (response.status === 201) {
        setSuccess(true);
        setQuote("");
        setAuthor("");
        setBookId("");
        setError("");
      }
    } catch (err) {
      setError("Kitap eklenirken bir hata oluştu!");
      console.log(err);
    }
  };

  return (
    <div className="bg-white/40 rounded-xl shadow-lg p-6 my-6  h-full transition-all duration-300 transform hover:scale-105">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">
        <h2 className="text-2xl font-bold mb-4 transition-all duration-300 transform hover:scale-105">
          Alıntı Ekle
        </h2>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">Kitap Başarıyla Eklendi</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="bookId"
              className="block text-sm font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Kitap ID:
            </label>
            <input
              id="bookId"
              value={bookId}
              onChange={(e) => {
                setBookId(e.target.value);
              }}
              className="mt-1 block w-full px-4 border border-gray-300 rounded-lg transition-all duration-300 transform hover:scale-105"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="quote"
              className="block text-sm font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Alıntı:
            </label>
            <textarea
              id="quote"
              value={quote}
              onChange={(e) => {
                setQuote(e.target.value);
              }}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg transition-all duration-300 transform hover:scale-105"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="author"
              className="block text-sm font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Alıntı Yazarı:
            </label>
            <input
              id="author"
              value={author}
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
              className="mt-1 block w-full px-4 border border-gray-300 rounded-lg transition-all duration-300 transform hover:scale-105"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:blue-700 transition-all duration-300 transform hover:scale-105"
          >
            Alıntı Ekle
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddQuote;
