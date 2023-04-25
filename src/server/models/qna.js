const mongoose = require('mongoose');

const qnaSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'Must provide question'],
        trim: true
    },
    answer: {
        type: String,
        required: [true, 'Must provide answer'],
        trim: true
    }
});

module.exports = qnaSchema;