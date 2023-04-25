const mongoose = require('mongoose');
const qnaSchema = require('./qna');

const historySchema = new mongoose.Schema({
    name: {
        type: String
    },
    qnaSchema: {
        type: [qnaSchema],
        default: []
    }
});

module.exports = historySchema;