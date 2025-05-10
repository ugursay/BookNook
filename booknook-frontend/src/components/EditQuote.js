import { useState, useEffect } from "react";
import axios from "axios";
import { GiNotebook } from "react-icons/gi";

const EditQuote = () => {
  const [quoteId, setQuoteId] = useState("");
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/quotes/${quoteId}`,
        {
          quote,
          author,
        }
      );
      setMessage(res.data.message);
    } catch (error) {
      console.error("Güncelleme hatası", error);
      setMessage("Alıntı güncellenemedi");
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/quotes/${quoteId}`
      );
      setMessage(res.data.message);
    } catch (error) {
      console.error("Silme hatası", error);
      setMessage("Alıntı silinemedi");
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
        setQuoteId("");
        setQuote("");
        setAuthor("");
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
        <h2 className="text-2xl font-bold mb-2 transition-all duration-300 transform hover:scale-105">
          Alıntı Güncelle 📝
        </h2>
        <div className="h-3 mb-4">
          {message && (
            <p
              className={`transition-opacity duration-500 text-sm text-blue-600 font-semibold ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              {message} 📝
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="quoteId"
            className="block text-sm font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Alıntı ID:
          </label>
          <input
            id="quoteId"
            type="number"
            placeholder="Alıntı ID"
            value={quoteId}
            onChange={(e) => {
              setQuoteId(e.target.value);
            }}
            className="mt-1 block w-full px-4 border-gray-300 rounded-lg transition-all duration-300 transform hover:scale-105"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="quote"
            className="block text-sm font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Yeni Alıntı:
          </label>
          <input
            id="quote"
            type="text"
            placeholder="Yeni Alıntı"
            value={quote}
            onChange={(e) => {
              setQuote(e.target.value);
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
          <GiNotebook className="rounded-full w-20 h-20 shadow-xl hover:blue-700 transition-all duration-300 transform hover:scale-125" />
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleUpdate}
            className="w-full py-2 px-4 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105"
          >
            Alıntıyı Güncelle
          </button>
          <button
            onClick={handleDelete}
            className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
          >
            Alıntıyı Sil
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditQuote;
