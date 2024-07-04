const express = require('express');
const router = express.Router();
const Audiobook = require('../models/Audiobook');

// Get all audiobooks
router.get('/', async (req, res) => {
  try {
    const audiobooks = await Audiobook.find();
    res.json(audiobooks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single audiobook by ID
router.get('/:id', async (req, res) => {
  try {
    const audiobook = await Audiobook.findById(req.params.id);
    if (!audiobook) return res.status(404).json({ message: 'Audiobook not found' });
    res.json(audiobook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Submit a review
router.post('/:id/reviews', async (req, res) => {
  try {
    const audiobook = await Audiobook.findById(req.params.id);
    if (!audiobook) return res.status(404).json({ message: 'Audiobook not found' });

    const { text, rating } = req.body;
    const review = { text, rating };
    audiobook.reviews.push(review);
    await audiobook.save();

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
