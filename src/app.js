const express = require('express');
const {connectDB} = require('./config/database');
const User = require('./model/user')
const app = express();


app.post('/signUp', async (req,res)=>{
    const user = new User({
        firstName : 'Pratibha',
        lastName: 'Kaushik',
        emailId: 'pratibha@gmail.com',
        password: 'pratibha@123',
    })

    try{
    await user.save();
    res.send('Saved data succesfully')
    }catch(err){
        res.status(400).send('Error while saving the new user', err.message);
    }
})

connectDB().then(() => {
    console.log('db connection established');
    app.listen(3000, () => {
        console.log('Server running at port 3000')
    });
}).catch((err) => {
    console.log('db connection error')
})

