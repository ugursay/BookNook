import React, { createContext, useState, useContext } from "react";

const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [booksWithQuotes, setBooksWithQuotes] = useState([]);

  return (
    <BookContext.Provider value={{ booksWithQuotes, setBooksWithQuotes }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => useContext(BookContext);
