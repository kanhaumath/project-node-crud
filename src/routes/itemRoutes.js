const express = require('express');
const Item = require('../models/itemModel'); // Ensure you have this model defined
const router = express.Router();

// In-memory message to be updated dynamically
let dynamicMessage = 'Welcome to the main API endpoint!';

// Test /main endpoint (GET)
router.get('/main', (req, res) => {
  res.json({ message: dynamicMessage });
});

// Update the /main message (POST)
router.post('/main', (req, res) => {
  const { message } = req.body;
  if (message) {
    dynamicMessage = message;
    res.json({ message: 'Message updated successfully!' });
  } else {
    res.status(400).json({ error: 'Message value is required.' });
  }
});

// Create
router.post('/items', async (req, res) => {
  try {
    const item = new Item(req.body);
    const savedItem = await item.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read all
router.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update
router.put('/items/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete
router.delete('/items/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
