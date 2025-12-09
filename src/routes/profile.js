const express = require('express');
const { userAuth } = require('../../middlewares/auth');
const { validateUpdateFeilds } = require('../utils/validate');
const bycrpt = require('bcrypt');

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    }
    catch (err) {
        res.status(400).send("Error : " + err.message)
    }
})

profileRouter.patch("/profile/update", userAuth, async (req, res) => {
    try {
        const isUpdateAllowed = validateUpdateFeilds(req);
        if (!isUpdateAllowed) {
            throw new Error('Kindly update valid feilds');
        }

        const loggedInUser = req.user;

        Object.keys(req.body).forEach(key => {
            loggedInUser[key] = req.body[key]
        })

        await loggedInUser.save();
        // res.send(`${loggedInUser['firstName']}, your profile updated successfully`);
        res.json({
            message: `${loggedInUser['firstName']}, your profile updated successfully`,
            data: loggedInUser
        })

    } catch (err) {
        res.status(400).send('Error: ' + err.message)
    }
})

profileRouter.patch("/profile/password",userAuth, async (req,res)=>{
    const {newPassword,confirmOldPassword} = req.body;
try{
    if(newPassword === confirmOldPassword)
        throw new Error('New password can not be same as previous one');

    const loggedInUser = req.user;
    loggedInUser['password'] = await bycrpt.hash(newPassword, 10)
    await loggedInUser.save();
    res.json({
        message: 'Password updated successfully'
    })
}catch(err){
    res.status(500).send('Error:'+ err.message);
}
})

module.exports = profileRouter;