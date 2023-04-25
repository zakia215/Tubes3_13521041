const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const chats = require('./routes/chats');
require('dotenv').config();

app.use(express.json());

app.use('/api/chat', chats);

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