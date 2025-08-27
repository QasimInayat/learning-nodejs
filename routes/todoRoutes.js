const express = require('express');
const Todo = require('../models/Todo');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

// Get all todos
router.get('/', auth, async (req, res) => {
    const todos = await Todo.find({ user: req.user.id });
    res.json(todos);
});


// Get single todo
router.get('/:id', auth, async (req, res) => {
    try {

        const todo = await Todo.findOne({ _id: req.params.id, user: req.user.id });
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        res.json(todo);
    } catch (err) {
        res.status(400).json({ message: 'Invalid ID' });
    }
});

// Create todo
router.post('/', auth, async (req, res) => {
    try {
        const todo = new Todo({ title: req.body.title, user: req.user.id });
        await todo.save();
        res.status(201).json(todo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update todo
router.put('/:id', auth, async (req, res) => {
    try {
        const todo = await Todo.findOne({ _id: req.params.id, user: req.user.id });
        if (!todo) return res.status(404).json({ message: 'Todo not found' });

        if (req.body.title) todo.title = req.body.title;
        if (typeof req.body.completed === 'boolean') todo.completed = req.body.completed;

        await todo.save();
        res.json(todo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete todo
router.delete('/:id', auth, async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        res.json({ message: 'Todo deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
