const Book = require('../models/book');
const Chapter = require('../models/chapters');
const MCQ = require('../models/mcq');
const Flashcard = require('../models/flashcard');
exports.getAllBooks = (req, res) => Book.find({ isActive: true }).then(data => res.json(data));
exports.getBookById = (req, res) => Book.findById(req.params.id).then(data => res.json(data));
exports.createBook = (req, res) => Book.create(req.body).then(data => res.json(data));
exports.getChaptersByBook = (req, res) => Chapter.find({ bookId: req.params.bookId }).then(data => res.json(data));
exports.getChapterById = (req, res) => Chapter.findById(req.params.chapterId).then(data => res.json(data));
exports.getMCQsByChapter = (req, res) => MCQ.find({ chapterId: req.params.chapterId }).then(data => res.json(data));
exports.generateMCQs = (req, res) => {
  const { chapterId, concepts } = req.body;
  const mcqs = concepts.map(c => ({
    chapterId,
    question: `Dummy question for concept: ${c}`,
    options: [`Option A for ${c}`, `Option B for ${c}`, `Option C for ${c}`, `Option D for ${c}`],
    correctAnswer: `Option A for ${c}`
  }));
  MCQ.insertMany(mcqs).then(data => res.json({ message: 'Dummy MCQs generated', data }));
};
exports.getFlashcardsByChapter = (req, res) => Flashcard.find({ chapterId: req.params.chapterId }).then(data => res.json(data));
exports.generateFlashcards = (req, res) => {
  const { chapterId, concepts } = req.body;
  const flashcards = concepts.map(c => ({
    chapterId,
    front: `Concept: ${c}`,
    back: `Dummy explanation for concept: ${c}`
  }));
  Flashcard.insertMany(flashcards).then(data => res.json({ message: 'Dummy flashcards generated', data }));
};
