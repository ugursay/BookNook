import { useState, useEffect } from "react";
import axios from "axios";
import { GiBookmarklet } from "react-icons/gi";

const EditBook = () => {
  const [bookId, setBookId] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

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

  useEffect(() => {
    if (message) {
      setIsVisible(true);

      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 1000);

      const removeTimeout = setTimeout(() => {
        setMessage("");
        setTitle("");
        setAuthor("");
        setBookId("");
      }, 1500); // 500ms sonra kaldır

      return () => {
        clearTimeout(timeout);
        clearTimeout(removeTimeout);
      };
    }
  }, [message]);

  return (
    <div className="bg-white/40 rounded-xl shadow-lg p-6 my-6  h-full transition-all duration-300 transform hover:scale-105">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">
        <h2 className="text-2xl font-bold mb-4 transition-all duration-300 transform hover:scale-105">
          Kitap Güncelle / Sil 🕮
        </h2>
        <div className="h-3 mb-4">
          {message && (
            <p
              className={`transition-opacity duration-500 text-sm text-blue-600 font-semibold ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              {message} 🕮
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="bookId"
            className="block text-sm font-semibold transition-all duration-300 transform hover:scale-105"
          >
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
            className="mt-1 block w-full px-4 border-gray-300 rounded-lg transition-all duration-300 transform hover:scale-105"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-semibold transition-all duration-300 transform hover:scale-105"
          >
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
            className="mt-1 block w-full px-4 border-gray-300 rounded-lg transition-all duration-300 transform hover:scale-105"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="author"
            className="block text-sm font-semibold transition-all duration-300 transform hover:scale-105"
          >
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
            className="mt-1 block w-full px-4 border-gray-300 rounded-lg transition-all duration-300 transform hover:scale-105"
          />
        </div>
        <div className="flex justify-center items-center mb-4">
          <GiBookmarklet className="rounded-full w-20 h-20 shadow-xl hover:blue-700 transition-all duration-300 transform hover:scale-125" />
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleUpdate}
            className="w-full py-2 px-4 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105"
          >
            Kitabı Güncelle
          </button>

          <button
            onClick={handleDelete}
            className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
          >
            Kitabı Sil
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
