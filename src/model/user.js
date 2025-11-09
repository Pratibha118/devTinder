const mongoose = require('mongoose');
const validator = require('validator')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50,
    },
    lastName: {
        type: String,
    },
    emailId:{
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value))
            {
                throw new Error('Email is not valid', value)
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error('Please enter a strong Password')
            }
        }
    },
    age: {
        type: Number,
        min:18
    },
    gender: {
        type: String,
        validate(value){
            if(!['male','female','other'].includes(value)){
                throw new Error('invalid gender data');
            }
        }
    },
    about :{
        type: String,
        default: 'This is about section of the user.'
    },
    skills:{
        type: [String]
    }
},{
    timestamps : true
});

module.exports = mongoose.model('User', userSchema)