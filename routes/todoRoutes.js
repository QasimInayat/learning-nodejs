const express = require('express');
const { getTodos, getTodo, createTodo, updateTodo, deleteTodo } = require('../controllers/TodoController');
const { createTodoValidation, updateTodoValidation } = require('../validators/todoValidators');
const validateRequest = require('../middleware/validateRequest');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', auth, getTodos);
router.get('/:id', auth, getTodo);
router.post('/', auth, createTodoValidation, validateRequest, createTodo);
router.put('/:id', auth, updateTodoValidation, validateRequest, updateTodo);
router.delete('/:id', auth, deleteTodo);

module.exports = router;
