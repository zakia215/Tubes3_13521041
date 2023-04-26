const express = require('express');
const router = express.Router();
const {
    addQuestion,
    deleteQuestion
} = require('../controllers/questions');

router.route('/').post(addQuestion).delete(deleteQuestion);

module.exports = router;