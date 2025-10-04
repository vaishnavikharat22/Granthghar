import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import BookCard from '../components/BookCard';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';

const BookListPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/books?pageNumber=${page}&keyword=${searchTerm}`);
        setBooks(data.books);
        setPages(data.pages);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch books', error);
        setLoading(false);
      }
    };
    // Debounce search
    const timerId = setTimeout(() => {
        setSearchTerm(keyword);
    }, 500);

    fetchBooks();

    return () => {
        clearTimeout(timerId);
    }
  }, [page, searchTerm, keyword]);

  return (
    <div className="animate-fade-in">
      <h1 className="text-4xl font-bold mb-4 text-center text-brand-dark">Explore the Library</h1>
      <p className="text-center text-brand-brown mb-8">Discover and review your next favorite book.</p>

      <div className="mb-8 max-w-lg mx-auto">
        <div className="relative">
            <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search by title..."
                className="w-full p-3 pl-10 border-2 border-brand-brown/50 rounded-full bg-white shadow-sm focus:ring-2 focus:ring-brand-tan focus:border-brand-tan outline-none transition-shadow"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute left-3 top-1/2 -translate-y-1/2 text-brand-brown" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : books.length === 0 ? (
        <p className="text-center text-brand-brown text-lg">No books found matching your search.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

