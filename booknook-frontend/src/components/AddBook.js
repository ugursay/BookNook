import React, { useState, useEffect } from "react";
import axios from "axios";
import { GiSpellBook } from "react-icons/gi";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !author) {
      setError("Başlık ve Yazar alanları zorunludur!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/books", {
        title,
        author,
      });

      if (response.status === 201) {
        setSuccess(true);
        setTitle("");
        setAuthor("");
        setError("");
      }
    } catch (err) {
      setError("Kitap eklenirken bir hata oluştu!");
      console.log(err);
    }
  };

  useEffect(() => {
    if (success || error) {
      setIsVisible(true);

      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 1000);

      const removeTimeout = setTimeout(() => {
        setSuccess(false);
        setError("");
      }, 1500); // 500ms sonra kaldır

      return () => {
        clearTimeout(timeout);
        clearTimeout(removeTimeout);
      };
    }
  }, [success || error]);

  return (
    <div className="bg-white/40 rounded-xl shadow-lg p-6 my-6  h-full transition-all duration-300 transform hover:scale-105">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">
        <h2 className="text-2xl font-bold mb-4 transition-all duration-300 transform hover:scale-105">
          Kitap Ekle 📚
        </h2>

        <div className="h-3 mb-4">
          {error && (
            <p
              className={`transition-opacity duration-500 text-sm text-blue-600 font-semibold ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              {error}
            </p>
          )}
          {success && (
            <p
              className={`transition-opacity duration-500 text-sm text-blue-600 font-semibold ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              Kitap Başarıyla Eklendi 📚
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Başlık:
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              className="mt-1 block w-full px-4 border border-gray-300 rounded-lg transition-all duration-300 transform hover:scale-105"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="author"
              className="block text-sm font-semibold transition-all duration-300 transform hover:scale-105 "
            >
              Yazar:
            </label>
            <input
              id="author"
              type="text"
              value={author}
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
              className="mt-1 block w-full px-4 border border-gray-300 rounded-lg transition-all duration-300 transform hover:scale-105"
              required
            />
          </div>
          <div className="flex justify-center items-center mb-4">
            <GiSpellBook className="rounded-full w-20 h-20 shadow-xl hover:blue-700 transition-all duration-300 transform hover:scale-125" />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            Kitap Ekle
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
