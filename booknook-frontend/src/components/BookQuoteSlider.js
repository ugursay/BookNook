import React, { useState, useEffect } from "react";
import axios, { formToJSON } from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import { useBooks } from "../context/BookContext";

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
      <h2 className="text-2xl font-bold mb-6 text-center">
        📚 Kitaplar Ve Alıntılar
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
            className="bg-white rounded-xl shadow-lg p-6 h-full"
          >
            <h3 className="text-xl font-semibold">{book.title}</h3>
            <p className="text-gray-600 mb-2">Yazar:{book.author}</p>
            <p className="text-gray-500 text-sm mb-4">Kitap ID: {book.id}</p>
            <div className="space-y-2 mt-4">
              {book.quotes.length > 0 ? (
                book.quotes.map((quote) => (
                  <div key={quote.id} className="p-3 bg-gray-100 rounded-lg">
                    {" "}
                    <p className="text-sm italic">"{quote.quote}"</p>
                    <p className="text-xs text-right">{quote.author}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400">
                  Bu kitap için alıntı yok.
                </p>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BookQuoteSlider;
