const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../model/user');
const { validateBody } = require('../utils/validate');


const authRouter = express.Router();

authRouter.post('/signUp', async (req, res) => {
    const { firstName, lastName, emailId, password } = req.body;

    try {
        //validate body data
        validateBody(req)

        //encrypt the password
        const encryptedPass = await bcrypt.hash(password, 10)

        const user = new User({
            firstName,
            lastName,
            emailId,
            password: encryptedPass,
        })
        const newUser = await user.save();
        const token = await newUser.getJWT();
        res.cookie("token", token);
        res.json({
            message: 'User added successfully.',
            data: newUser
        })
    } catch (err) {
        res.status(400).send('Error : ' + err.message);
    }
})

authRouter.post('/login', async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error('Invalid credentials')
        }
        const isPasswordMatched = await user.verifyPassword(password)

        if (isPasswordMatched) {
            //create JWT token 
            const token = await user.getJWT();
            //sending cookie in response (cookie expired date can also be send)
            res.cookie("token", token);
            //added while finding issue
            //  {
            //     httpOnly: true,
            //     secure: true,          // required for SameSite=None in Chrome
            //     sameSite: "lax",      // allows cross-site cookie (port-to-port)
            //     path: "/",
            // }
            res.send(user);
        }
        else {
            throw new Error('Invalid credentials');
        }

    } catch (err) {
        res.status(400).send("Error : " + err.message)
    }
})

authRouter.post('/logout', async (req, res) => {
    res.cookie('token', null, { expires: new Date(Date.now()) }).send("Logout successfully.");
})


module.exports = authRouter;