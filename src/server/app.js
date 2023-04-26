const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const chats = require('./routes/chats');
const questions = require('./routes/questions');
require('dotenv').config();

app.use(express.json());

app.use('/api/chat', chats);
app.use('/api/question', questions);

const port = 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listening to port ${port}...`));
    } catch (error) {
        console.log(error);
    }
}

start();