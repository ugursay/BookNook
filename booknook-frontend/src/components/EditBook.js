import { useState } from "react";
import axios from "axios";

const EditBook = () => {
  const [bookId, setBookId] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/books/${bookId}`, {
        title,
        author,
      });
      setMessage(res.data.message);
    } catch (error) {
      console.error("Güncelleme hatası:", error);
      setMessage("kitap güncellenemedi");
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/books/${bookId}`
      );

      setMessage(res.data.message);
    } catch (error) {
      console.error("Silme hatası", error);
      setMessage("kitap silinemedi");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">
      <h2 className="text-2xl font-bold mb-4">Kitap güncelle / Sil</h2>
      {message && <p className="mb-4 text-blue-600 font-semibold">{message}</p>}
      <div className="mb-4">
        <label htmlFor="bookId" className="block text-sm font-semibold">
          Kitap ID:
        </label>
        <input
          id="bookId"
          type="number"
          placeholder="Kitap ID"
          value={bookId}
          onChange={(e) => {
            setBookId(e.target.value);
          }}
          className="mt-1 block w-full px-4 border-gray-300 rounded-lg"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-semibold">
          Yeni Başlık:
        </label>
        <input
          id="title"
          type="text"
          placeholder="Yeni Başlık"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="mt-1 block w-full px-4 border-gray-300 rounded-lg"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="author" className="block text-sm font-semibold">
          Yeni Yazar:
        </label>
        <input
          id="author"
          type="text"
          placeholder="Yeni Yazar"
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
          className="mt-1 block w-full px-4 border-gray-300 rounded-lg"
        />
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleUpdate}
          className="w-full py-2 px-4 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600"
        >
          Kitabı Güncelle
        </button>
        <button
          onClick={handleDelete}
          className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700"
        >
          Kitabı Sil
        </button>
      </div>
    </div>
  );
};

export default EditBook;
