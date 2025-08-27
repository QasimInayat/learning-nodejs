const express = require('express');
const { getTodos, getTodo, createTodo, updateTodo, deleteTodo } = require('../controllers/TodoController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', auth, getTodos);
router.get('/:id', auth, getTodo);
router.post('/', auth, createTodo);
router.put('/:id', auth, updateTodo);
router.delete('/:id', auth, deleteTodo);

module.exports = router;
