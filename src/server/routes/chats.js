const express = require('express');
const router = express.Router();
const {
    getAllChat,
    createChat,
    getSingleChat,
    deleteChat,
    updateChat
} = require('../controllers/chats');

// api/chat/
router.route('/').get(getAllChat).post(createChat);
// api/chat/:id
router.route('/:id').get(getSingleChat).patch(updateChat).delete(deleteChat);

module.exports = router;