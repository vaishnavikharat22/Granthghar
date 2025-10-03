const Book = require('../models/book');
const Review = require('../models/review');

// @desc    Get all books with pagination and search/filter
// @route   GET /api/books
exports.getBooks = async (req, res) => {
  const pageSize = 5;
  const page = Number(req.query.pageNumber) || 1;
  
  const keyword = req.query.keyword ? {
    title: {
      $regex: req.query.keyword,
      $options: 'i',
    },
  } : {};
  
  const genreFilter = req.query.genre ? { genre: req.query.genre } : {};

  try {
    const count = await Book.countDocuments({ ...keyword, ...genreFilter });
    const books = await Book.find({ ...keyword, ...genreFilter })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    
    res.json({ books, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single book with reviews and average rating
// @route   GET /api/books/:id
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('addedBy', 'name');
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const reviews = await Review.find({ bookId: req.params.id }).populate('userId', 'name');
        
        let avgRating = 0;
        if (reviews.length > 0) {
            const totalRating = reviews.reduce((acc, item) => item.rating + acc, 0);
            avgRating = totalRating / reviews.length;
        }

        res.json({ book, reviews, avgRating: avgRating.toFixed(1) });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Add a new book
// @route   POST /api/books
exports.addBook = async (req, res) => {
    const { title, author, description, genre, year } = req.body;
    try {
        const book = new Book({
            title,
            author,
            description,
            genre,
            year,
            addedBy: req.user._id,
        });

        const createdBook = await book.save();
        res.status(201).json(createdBook);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update a book
// @route   PUT /api/books/:id
exports.updateBook = async (req, res) => {
    const { title, author, description, genre, year } = req.body;
    try {
        const book = await Book.findById(req.params.id);

        if (book) {
            if (book.addedBy.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized' });
            }
            book.title = title || book.title;
            book.author = author || book.author;
            book.description = description || book.description;
            book.genre = genre || book.genre;
            book.year = year || book.year;
            
            const updatedBook = await book.save();
            res.json(updatedBook);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
             if (book.addedBy.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized' });
            }
            await book.deleteOne();
            await Review.deleteMany({ bookId: req.params.id });
            res.json({ message: 'Book removed' });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
