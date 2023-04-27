const QnA = require('../models/qna');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

const addQuestion = asyncWrapper(async (req, res) => {
    /*
        req.body = {
            question: "question string",
            answer: "answer string"
        }
    */
    const question = await QnA.create(req.body);
    res.status(201).json({ question });
});

const deleteQuestion = asyncWrapper(async (req, res, next) => {
    /* 
        req.body = {
            question: "question string"
        }
    */
    const question = await History.findOneAndDelete(req.body);

    if (!question) {
        return next(createCustomError(`No question: ${req.body.question}`, 404));
    }
    res.status(200).json({ chat: null, status: 'success' });
});

module.exports = {
    addQuestion,
    deleteQuestion
}