import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';

const AddEditBookPage = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { id } = useParams(); // Check if we are editing

  useEffect(() => {
    if (id) {
      const fetchBook = async () => {
        try {
          const { data } = await api.get(`/books/${id}`);
          setTitle(data.book.title);
          setAuthor(data.book.author);
          setDescription(data.book.description);
          setGenre(data.book.genre);
          setYear(data.book.year);
        } catch (err) {
          console.error(err);
          setError('Could not fetch book data.');
        }
      };
      fetchBook();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookData = { title, author, description, genre, year: Number(year) };
    try {
        if (id) {
            // Update book
            await api.put(`/books/${id}`, bookData);
        } else {
            // Add new book
            await api.post('/books', bookData);
        }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save book');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">{id ? 'Edit Book' : 'Add New Book'}</h2>
        {error && <p className="text-red-500 bg-red-100 p-3 rounded mb-4">{error}</p>}
        
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded mt-1" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Author</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full p-2 border rounded mt-1" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="5" className="w-full p-2 border rounded mt-1" required />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
                 <label className="block text-gray-700">Genre</label>
                 <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} className="w-full p-2 border rounded mt-1" required />
            </div>
             <div>
                 <label className="block text-gray-700">Published Year</label>
                 <input type="number" value={year} onChange={(e) => setYear(e.target.value)} className="w-full p-2 border rounded mt-1" required />
            </div>
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          {id ? 'Update Book' : 'Add Book'}
        </button>
      </form>
    </div>
  );
};

export default AddEditBookPage;
