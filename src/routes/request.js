const express = require('express');
const { userAuth } = require('../../middlewares/auth');
const ConnectionRequest = require('../model/connectionRequest');
const requestRouter = express.Router();
const User = require('../model/user');

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user.id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;
        //check wheather status is valid or not
        const possibleStatus = ['intrested', 'ignored'];
        const isStatusValid = possibleStatus.includes(status);

        if (!isStatusValid)
            return res.status(400).send('Invalid status value.')

        //check if request already made or toUserId has made request to fromUserId
        console.log(fromUserId)
        console.log(toUserId)
        const existingRequets = await ConnectionRequest.find({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId },
            ]
        })
        console.log(existingRequets.length > 0)
        if (existingRequets.length > 0) {
            return res.json({
                message: 'Request is already sent.'
            })
        }

        //check if toUserId is a valid user
        const toUser = await User.findById(toUserId)
        if (!toUser)
            throw new Error('Request sending to a invalid user.')

        const connectRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        })
        const data = await connectRequest.save();
        res.json({
            message: status === 'intrested' ? `${req.user.firstName} is interested in ${toUser.firstName}` : `${req.user.firstName} ignored ${toUser.firstName}`,
            data
        })
    } catch (err) {
        res.status(400).send('Error: ' + err.message)
    }
});

requestRouter.post("/request/review/:status/:requestId", userAuth ,async (req, res) => {
    try{
        const loggedInUser = req.user;
        const {status, requestId} = req.params
        //status should be accepted or rejected
        //current status should be interested only
        //requestId should be a valid id 
        //toUserID should be loggedIn userId

        const validStatus = ['accepted','rejected'];
        if(!validStatus.includes(status))
           return res.status(400).send('Invalid status');

        const connectRequest = await ConnectionRequest.findOne({
            _id : requestId,
            status: 'intrested',
            toUserId : loggedInUser.id,
        })
        if(!connectRequest)
           return res.status(404).send('user not found')

        connectRequest.status = status;

        const data = await connectRequest.save();

        res.json({
            message: 'Connection accepted successfuly',
            data:data
        })

    }catch(err){
        res.status(400).send('Error: '+ err.message)
    }
});


module.exports = requestRouter;  