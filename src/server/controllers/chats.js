const History = require('../models/history');
const QnA = require('../models/qna');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

const getAllChat = asyncWrapper(async (req, res) => {
    const chats = await History.find({});
    res.status(201).json({ chats });
});

const createChat = asyncWrapper(async (req, res) => {
    const chat = await History.create(req.body);
    res.status(201).json({ chat });
});

const getSingleChat = asyncWrapper(async (req, res, next) => {
    const { id: chatID } = req.params;
    const chat = await History.findOne({ _id: chatID });

    if (!chat) {
        return next(createCustomError(`No chat with id: ${chatID}`, 404));
    }

    res.status(201).json({ chat });
});

const deleteChat = asyncWrapper(async (req, res, next) => {
    const { id: chatID } = req.params;
    const chat = await History.findOneAndDelete({ _id: chatID });

    if (!chat) {
        return next(createCustomError(`No chat with id: ${chatID}`, 404));
    }
    res.status(200).json({ chat: null, status: 'success' });
});

const updateChat = asyncWrapper(async (req, res, next) => {
    const { id: chatID } = req.params;
    let newValue = req.body;
    if ('question' in newValue) {
        const singleChat = await History.findOne({ _id: chatID });
        const qna = await QnA.find();
        const tempanswer = 'Who says Im gay?';
        const tupleToAdd = {
            question: req.body.question,
            answer: tempanswer
        }
        let localList = singleChat.questionList;
        localList.push(tupleToAdd);
        newValue = {
            questionList: localList
        }
    } else if ('name' in newValue) {
        const chat = await History.findOneAndUpdate({ _id: chatID }, newValue, {
            new: true,
            runValidators: true
        });
        if (!chat) {
            return next(createCustomError(`No task with id: ${chatID}`, 404));
        }
        res.status(200).json({ chat });
    } else {
        return next(createCustomError(`Request not valid`, 404));
    }


});

module.exports = {
    getAllChat,
    createChat,
    getSingleChat,
    deleteChat,
    updateChat
}