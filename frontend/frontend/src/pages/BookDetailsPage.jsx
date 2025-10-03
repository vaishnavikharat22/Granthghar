import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const BookDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [error, setError] = useState('');


  const fetchBookDetails = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/books/${id}`);
      setBook(data.book);
      setReviews(data.reviews);
      setAvgRating(data.avgRating);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch book details", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookDetails();
  }, [id]);
  
  const deleteBookHandler = async () => {
      if (window.confirm('Are you sure you want to delete this book?')) {
          try {
              await api.delete(`/books/${id}`);
              navigate('/');
          } catch(err) {
              console.error(err);
              setError('Failed to delete book.');
          }
      }
  }

  const submitReviewHandler = async (e) => {
    e.preventDefault();
    if(rating === 0 || reviewText.trim() === '') {
        setError('Please provide a rating and a review.');
        return;
    }
    try {
        await api.post(`/reviews/${id}`, { rating, reviewText });
        setRating(0);
        setReviewText('');
        setError('');
        fetchBookDetails(); // Refresh reviews
    } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to submit review.');
    }
  }

  if (loading) return <p>Loading...</p>;
  if (!book) return <p>Book not found.</p>;

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold">{book.title}</h1>
              <h2 className="text-xl text-gray-700 mt-1">by {book.author}</h2>
              <p className="text-lg mt-2">Average Rating: <span className="font-bold text-yellow-500">{avgRating} ★</span> ({reviews.length} reviews)</p>
            </div>
            {user && user._id === book.addedBy._id && (
                <div className="flex space-x-2">
                    <Link to={`/edit-book/${id}`} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</Link>
                    <button onClick={deleteBookHandler} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                </div>
            )}
        </div>
        <p className="mt-4 text-gray-600">{book.description}</p>
      </div>

      <div className="p-6 bg-white shadow-md rounded-lg">
        <h3 className="text-2xl font-bold mb-4">Reviews</h3>
        {reviews.length > 0 ? (
            reviews.map(review => (
            <div key={review._id} className="border-b py-4">
                <strong>{review.userId.name}</strong> rated it <span className="font-bold text-yellow-500">{review.rating}/5 ★</span>
                <p className="text-gray-600 mt-1">{review.reviewText}</p>
            </div>
            ))
        ) : (
            <p>No reviews yet.</p>
        )}
      </div>

      {user && (
          <div className="p-6 bg-white shadow-md rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Write a Review</h3>
               {error && <p className="text-red-500 bg-red-100 p-2 rounded mb-4">{error}</p>}
              <form onSubmit={submitReviewHandler}>
                  <div className="mb-4">
                      <label className="block mb-2">Rating</label>
                      <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="w-full p-2 border rounded">
                          <option value="0">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                      </select>
                  </div>
                   <div className="mb-4">
                      <label className="block mb-2">Review</label>
                      <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} rows="4" className="w-full p-2 border rounded"></textarea>
                  </div>
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit Review</button>
              </form>
          </div>
      )}
    </div>
  );
};

export default BookDetailsPage;
