const Todo = require('../models/Todo');

exports.getTodos = async (req, res) => {
    const todos = await Todo.find({ user: req.user.id });
    res.json(todos);
};

exports.getTodo = async (req, res) => {
    try {
        const todo = await Todo.findOne({ _id: req.params.id, user: req.user.id });
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        res.json(todo);
    } catch (err) {
        res.status(400).json({ message: 'Invalid ID' });
    }
};

exports.createTodo = async (req, res) => {
    try {
        const todo = new Todo({
            title: req.body.title,
            user: req.user.id
        });
        await todo.save();
        res.status(201).json(todo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateTodo = async (req, res) => {
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
};

exports.deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        res.json({ message: 'Todo deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
