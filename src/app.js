const express = require('express');
const { connectDB } = require('./config/database');
const cookieParser = require('cookie-parser');
const authRouter = require('../src/routes/auth');
const profileRouter = require('../src/routes/profile');
const requestRouter = require('../src/routes/request');

const app = express();

app.use(express.json());
app.use(cookieParser())

app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);


connectDB().then(() => {
    console.log('db connection established');
    app.listen(3000, () => {
        console.log('Server running at port 3000')
    });
}).catch((err) => {
    console.log('db connection error')
})

