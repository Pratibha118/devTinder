const express = require('express');
const { connectDB } = require('./config/database');
const User = require('./model/user')
const app = express();

app.use(express.json())

app.post('/signUp', async (req, res) => {

    const user = new User(req.body)

    try {
        await user.save();
        res.send('Saved data succesfully')
    } catch (err) {
        res.status(400).send('Error while saving the new user', err.message);
    }
})

app.get('/user', async (req, res) => {
    const userEmail = req.body.emailId;
    try {
        const users = await User.find({ emailId: userEmail })
        if (users.length === 0)
            res.status(404).send('user not found');
        else {
            res.send(users)
        }
    } catch (err){
        res.send('Somethind went wrong');
    }

})

app.get('/feed', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    }
    catch (err){
        res.status(400).send('Something went wrong')
    }
})

app.delete('/user', async (req,res)=>{
    const userId = req.body.userId;

    try{
        const user =await User.findByIdAndDelete(userId)
        res.send('Deleted user successfullys')
    }catch (err){
       res.status(400).send('Something went wrong')
    }
})

app.patch('/user', async(req,res)=>{
    const userdID = req.body.userId;
    const data = req.body;

    try{
       const user = await User.findByIdAndUpdate('pratibha@gmail.com',data,{returnDocument: 'after'})
       console.log(user)
       res.send('User updated successfully')
    }catch (err){
       res.status(400).send('Something went wrong')
    }
})

app.patch('/user/email', async(req,res)=>{
    const email = req.body.emailId;
    const data = req.body;

    try{
       const user = await User.findOneAndUpdate({emailId: email},data,{returnDocument: 'after'})
       console.log(user)
       res.send('User updated by email successfully')
    }catch (err){
       res.status(400).send('Something went wrong')
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

