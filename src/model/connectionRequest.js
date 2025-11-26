const mongoose = require('mongoose')

const connectRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ['ignored', 'intrested', 'rejected', 'accepted'],
            message: `{VALUE} is invalid status type.`
        },
    }
},
    { timestamps: true }
);

connectRequestSchema.index({fromUserId : 1, toUserId: 1})

connectRequestSchema.pre("save", function(next){
    if(this.fromUserId.equals(this.toUserId))
        throw new Error('Cannot sent connection request to yourself')
    next();
})

const ConnectionRequestModel = new mongoose.model('ConnectionRequest', connectRequestSchema )

module.exports = ConnectionRequestModel;