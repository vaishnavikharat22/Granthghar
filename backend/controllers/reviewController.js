const Review = require('../models/review');
const Book = require('../models/book');

// @desc    Add a review for a book
// @route   POST /api/reviews/:bookId
exports.addReview = async (req, res) => {
    const { rating, reviewText } = req.body;
    try {
        const book = await Book.findById(req.params.bookId);

        if (book) {
             const alreadyReviewed = await Review.findOne({
                bookId: req.params.bookId,
                userId: req.user._id,
            });

            if (alreadyReviewed) {
                return res.status(400).json({ message: 'Book already reviewed' });
            }

            const review = new Review({
                rating,
                reviewText,
                userId: req.user._id,
                bookId: req.params.bookId,
            });

            await review.save();
            res.status(201).json({ message: 'Review added' });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete a user's review
// @route   DELETE /api/reviews/:reviewId
exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.reviewId);

        if (review) {
            if (review.userId.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized' });
            }
            await review.deleteOne();
            res.json({ message: 'Review removed' });
        } else {
            res.status(404).json({ message: 'Review not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
