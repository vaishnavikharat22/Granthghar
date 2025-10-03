import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import BookCard from '../components/BookCard';
import Pagination from '../components/Pagination';

const BookListPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/books?pageNumber=${page}&keyword=${keyword}`);
        setBooks(data.books);
        setPages(data.pages);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch books', error);
        setLoading(false);
      }
    };
    fetchBooks();
  }, [page, keyword]);
  
  const searchHandler = (e) => {
      e.preventDefault();
      setPage(1); // Reset to first page on new search
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Latest Books</h1>

      <form onSubmit={searchHandler} className="mb-6 flex">
        <input 
            type="text" 
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search by title..."
            className="w-full p-2 border rounded-l-md"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-md">Search</button>
      </form>
      
      {loading ? (
        <p>Loading...</p>
      ) : books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
          <Pagination page={page} pages={pages} onPageChange={setPage} />
        </>
      )}
    </div>
  );
};

export default BookListPage;
