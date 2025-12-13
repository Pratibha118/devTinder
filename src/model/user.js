const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    emailId: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is not valid', value)
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error('Please enter a strong Password')
            }
        }
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value) {
            if (!['male', 'female', 'other'].includes(value)) {
                throw new Error('invalid gender data');
            }
        }
    },
    about: {
        type: String,
        default: 'This is about section of the user.'
    },
    skills: {
        type: [String]
    },
    imageURL: {
        type : String,
        default: 'https://static.vecteezy.com/system/resources/previews/000/550/731/original/user-icon-vector.jpg'
    }
}, {
    timestamps: true
});

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({ id: user._id }, process.env.JWT_SCERET_KEY, { expiresIn: '1d' });
    return token;
}

userSchema.methods.verifyPassword = async function (passwordInputByUser) {
    const user = this;
    const isPasswordMatched= await bcrypt.compare(passwordInputByUser, user.password);
    return isPasswordMatched;
}

userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    delete user.__v;
    delete user.createdAt;
    delete user.updatedAt;
    return user;
};

module.exports = mongoose.model('User', userSchema);