import React, { useState, useEffect } from "react";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// import { useBooks } from "../context/BookContext";

const BookQuoteSlider = () => {
  const [booksWithQuotes, setBooksWithQuotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/books-with-quotes"
        );
        setBooksWithQuotes(response.data);
      } catch (error) {
        console.log("Veriler alınırken hata oluştu", error);
      }
    };
    fetchData();
  }, [booksWithQuotes]);

  return (
    <div className="max-w-7xl mx-auto py-10">
      <h2 className="max-w-xl mx-auto bg-white/30 backdrop-blur-sm text-2xl font-semibold text-center text-gray-900 p-2 bg-white rounded-2xl shadow-md transition-all duration-300 transform hover:scale-105">
        📚 Kitaplar Ve Alıntılar 📚
      </h2>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {booksWithQuotes.map((book) => (
          <SwiperSlide
            key={book.id}
            className="bg-white/40 rounded-xl shadow-lg p-6 my-6  h-full"
          >
            <div className="bg-white/80 rounded-2xl p-4 shadow-lg">
              <h3 className="text-xl font-semibold mb-2 transition-all duration-300 transform hover:scale-105">
                {book.title}
              </h3>
              <div className="transition-all duration-300 transform hover:scale-105">
                <p className="text-gray-600 mb-1">Yazar: {book.author}</p>
                <p className="text-gray-500 text-sm mb-4">
                  Kitap ID : {book.id}
                </p>
              </div>
              <div className="space-y-2 mt-4">
                {book.quotes.length > 0 ? (
                  book.quotes.map((quote) => (
                    <div
                      key={quote.id}
                      className="p-3 bg-gray-100 rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      {" "}
                      <p className="text-sm italic">"{quote.quote}"</p>
                      <p className="text-xs text-right mb-2">{quote.author}</p>
                      <p className="text-xs text-left">
                        Alıntı ID : {quote.id}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-400">
                    Bu kitap için alıntı yok.
                  </p>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BookQuoteSlider;
