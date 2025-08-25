const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');
router.use(ClerkExpressRequireAuth());

router.get('/', async (req, res) => {
  try {
    const books = await Book.find({ ...req.query, isActive: true })
      .select('title stateBoard language subject grade description')
      .sort({ title: 1 });
    
    res.json({ success: true, count: books.length, data: books });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching books' });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }
    res.json({ success: true, data: book });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching book' });
  }
});
router.route('/:id')
  .put(async (req, res) => {
    try {
      const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!book) {
        return res.status(404).json({ success: false, message: 'Book not found' });
      }
      res.json({ success: true, message: 'Book updated successfully', data: book });
    } catch (error) {
      res.status(400).json({ success: false, message: 'Error updating book' });
    }
  })
  .delete(async (req, res) => {
    try {
      const book = await Book.findByIdAndUpdate(req.params.id, { isActive: false });
      if (!book) {
        return res.status(404).json({ success: false, message: 'Book not found' });
      }
      res.json({ success: true, message: 'Book deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error deleting book' });
    }
  });

router.post('/', async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({ success: true, message: 'Book created successfully', data: book });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error creating book' });
  }
});

module.exports = router;
