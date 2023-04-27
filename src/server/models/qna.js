const mongoose = require('mongoose');

const QNASchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'Please provide question']
    },
    answer: {
        type: String,
        required: [true, 'Please provide answer']
    }
});

module.exports = mongoose.model('QnA', QNASchema);