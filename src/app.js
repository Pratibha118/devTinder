require("dotenv").config(); 
const express = require('express');
const { connectDB } = require('./config/database');
const cookieParser = require('cookie-parser');
const authRouter = require('../src/routes/auth');
const profileRouter = require('../src/routes/profile');
const requestRouter = require('../src/routes/request');
const userRouter = require('./routes/user');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'http://localhost:5174',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser())

app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);
app.use('/',userRouter);


connectDB().then(() => {
    console.log('db connection established');
    app.listen(process.env.PORT, () => {
        console.log('Server running at port 3000')
    });
}).catch((err) => {
    console.log('db connection error')
})

