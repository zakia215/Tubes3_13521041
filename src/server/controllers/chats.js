const QnA = require('../models/qna');
const History = require('../models/history');

const getAllChat = (req, res) => {
    res.send('all chats');
}

const createChat = (req, res) => {
    res.send('created a chat');
}

const getSingleChat = (req, res) => {
    res.send('Single chat');
}

const deleteChat = (req, res) => {
    res.send('Chat deleted');
}

const updateChat = (req, res) => {
    res.send('Chat updated');
}

const askQuestion = (req, res) => {
    res.send('Question sent');
}

module.exports = {
    getAllChat,
    createChat,
    getSingleChat,
    deleteChat,
    updateChat,
    askQuestion
}