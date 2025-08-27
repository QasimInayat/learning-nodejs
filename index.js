const express = require('express');
const app = express();
const PORT = 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Home route
app.get('/', (req, res) => {
    res.send('Todo API is running...');
});


let todos = []; // fake DB
let id = 1;

// Get all todos
app.get('/api/todos', (req, res) => {
    res.json(todos);
});

// Get single todo
app.get('/api/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json(todo);
});

// Create todo
app.post('/api/todos', (req, res) => {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const newTodo = { id: id++, title, completed: false };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Update todo
app.put('/api/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    const { title, completed } = req.body;
    if (title) todo.title = title;
    if (typeof completed === 'boolean') todo.completed = completed;

    res.json(todo);
});

// Delete todo
app.delete('/api/todos/:id', (req, res) => {
    const index = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Todo not found' });

    todos.splice(index, 1);
    res.json({ message: 'Todo deleted' });
});



app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});