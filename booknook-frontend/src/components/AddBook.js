import React, { useState } from "react";
import axios from "axios";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

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

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md  transition-all duration-300 transform hover:scale-105">
      <h2 className="text-2xl font-bold mb-4">Kitap Ekle</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Kitap Başarıyla Eklendi</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-semibold">
            Başlık:
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="mt-1 block w-full px-4 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="author" className="block text-sm font-semibold">
            Yazar:
          </label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
            className="mt-1 block w-full px-4 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
        >
          Kitap Ekle
        </button>
      </form>
    </div>
  );
};

export default AddBook;
