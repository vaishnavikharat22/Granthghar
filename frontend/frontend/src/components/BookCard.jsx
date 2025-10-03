import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  return (
    <div className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
      <h2 className="text-xl font-bold mb-2">{book.title}</h2>
      <p className="text-gray-600 mb-2">by {book.author}</p>
      <p className="text-gray-500 text-sm mb-4">Genre: {book.genre} ({book.year})</p>
      <Link to={`/book/${book._id}`} className="text-blue-500 hover:underline">
        View Details & Reviews
      </Link>
    </div>
  );
};

export default BookCard;
