const express = require('express');
const router = express.Router();
const {
    getAllChat,
    createChat,
    getSingleChat,
    deleteChat,
    updateChat,
    askQuestion
} = require('../controllers/chats');

router.route('/').get(getAllChat).post(createChat);
router.route('/:chatID').get(getSingleChat).post(askQuestion).patch(updateChat).delete(deleteChat);

module.exports = router;