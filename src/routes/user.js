const express = require('express');
const { userAuth } = require('../../middlewares/auth');
const ConnectionRequestModel = require('../model/connectionRequest');
const userRouter = express.Router();

const USER_DETAILS = "firstName lastName age gender skills";
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequestModel.find({
            toUserId: loggedInUser._id,
            status: 'intrested',
        }).populate("fromUserId", ["firstName", "lastName", "age", "gender", "skills"]).populate("toUserId", ["firstName", "lastName"]);

        if (connectionRequest.length === 0)
            res.status(404).send('No requests');

        res.json({
            message: 'Here is all your connection requests.',
            data: connectionRequest,
        })

    } catch (err) {
        res.status(400).send('Error :' + err.message)
    }
})

userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequestModel.find({
            $or: [
                { fromUserId: loggedInUser._id, status: 'accepted' },
                { toUserId: loggedInUser._id, status: 'accepted' }
            ]
        }).populate("fromUserId", USER_DETAILS).populate("toUserId", USER_DETAILS);

        if (connectionRequest.length === 0) {
            res.send('No connections')
        }

        //If I am sending the request, then need toUserId details and if I am recieving the request,
        //then need fromUserID details as connection
        const data = connectionRequest.map(row => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
               return row.toUserId;
            } else {
               return row.fromUserId;
            }
        })

        res.json({
            message: 'Here is all your connections list',
            data: data
        })

    } catch (err) {
        res.status(400).send("Error :" + err.message)
    }
})

module.exports = userRouter;