const express = require('express');
const { connectDB } = require('./config/database');
const User = require('./model/user');
const { validateBody } = require('./utils/validate');
const app = express();
const bcrypt = require('bcrypt')

app.use(express.json())

app.post('/signUp', async (req, res) => {
    const { firstName, lastName, emailId, password } = req.body;

    try {
        //validate body data
        validateBody(req)

        //encrypt the password
        const encryptedPass = await bcrypt.hash(password, 10)
        console.log(encryptedPass)

        const user = new User({
            firstName,
            lastName,
            emailId,
            password: encryptedPass,
        })
        await user.save();
        res.send('Saved data succesfully')
    } catch (err) {
        res.status(400).send('Error : ' + err.message);
    }
})

app.post('/login', async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId: emailId });
        console.log(user)
        if (!user) {
            throw new Error('Invalid credentials')
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password)

        if (isPasswordMatched)
            res.send('User login successfully')
        else {
            res.send('Invalid credentials');
        }

    } catch (err) {
        res.status(400).send("Error : " + err.message)
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
    } catch (err) {
        res.send('Somethind went wrong');
    }

})

app.get('/feed', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    }
    catch (err) {
        res.status(400).send('Something went wrong')
    }
})

app.delete('/user', async (req, res) => {
    const userId = req.body.userId;

    try {
        const user = await User.findByIdAndDelete(userId)
        res.send('Deleted user successfullys')
    } catch (err) {
        res.status(400).send('Something went wrong')
    }
})

app.patch('/user/:userId', async (req, res) => {
    const userdID = req.params.userId;
    const data = req.body;

    try {
        const fields_to_be_updates = ['gender', 'skills', 'about', 'age'];
        const isAllowed = Object.keys(data).every(k => fields_to_be_updates.includes(k))
        if (!isAllowed) {
            throw new Error('update now allowed')
        }
        if (data?.skills.length > 10) {
            throw new Error('Max 10 skills can be added.')
        }
        const user = await User.findByIdAndUpdate(userdID, data, { returnDocument: 'after', runValidators: true })
        res.send('User updated successfully')
    } catch (err) {
        res.status(400).send('Something went wrong ' + err.message)
    }
})

app.patch('/user/email', async (req, res) => {
    const email = req.body.emailId;
    const data = req.body;

    try {
        const user = await User.findOneAndUpdate({ emailId: email }, data, { returnDocument: 'after' })
        console.log(user)
        res.send('User updated by email successfully')
    } catch (err) {
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

