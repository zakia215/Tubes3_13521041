const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide name'],
        trim: true
    },
    questionList: {
        type: [],
        default: []
    }
});

module.exports = mongoose.model('History', HistorySchema);