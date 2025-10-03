const express = require('express');
const router = express.Router();
const { addReview, deleteReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

router.route('/:bookId').post(protect, addReview);
router.route('/:reviewId').delete(protect, deleteReview);


module.exports = router;
