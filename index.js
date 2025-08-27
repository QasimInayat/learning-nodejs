const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/todoapp')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

// Home
app.get('/', (req, res) => res.send('Todo API with MongoDB is running...'));

const todoRoutes = require('./routes/todoRoutes');
app.use('/api/todos', todoRoutes);


const authRoutes = require('./routes/authRoutes');
app.use('/api/', authRoutes);


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
