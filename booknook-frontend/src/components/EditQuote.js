import { useState } from "react";
import axios from "axios";

const EditQuote = () => {
  const [quoteId, setQuoteId] = useState("");
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");

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

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Alıntı Güncelle</h2>
      {message && <p className="mb-4 text-blue-600 font-semibold">{message}</p>}
      <div className="mb-4">
        <label htmlFor="quoteId" className="block text-sm font-semibold">
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
          className="mt-1 block w-full px-4 border-gray-300 rounded-lg"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="quote" className="block text-sm font-semibold">
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
          Alıntıyı Güncelle
        </button>
        <button
          onClick={handleDelete}
          className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700"
        >
          Alıntıyı Sil
        </button>
      </div>
    </div>
  );
};

export default EditQuote;
