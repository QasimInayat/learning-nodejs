const { body } = require('express-validator');

exports.createTodoValidation = [
    body('title').notEmpty().withMessage('Title is required')
];

exports.updateTodoValidation = [
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('completed').optional().isBoolean().withMessage('Completed must be true/false')
];
