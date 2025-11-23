const jwt = require('jsonwebtoken');
const User = require('../src/model/user');

const userAuth = async (req, res, next) => {
    try {
        const cookies = req.cookies;
        const { token } = cookies;

        if(!token)
            throw new Error('Invaid token.');
        //validate my token
        const decodedMsg = await jwt.verify(token, 'DEV@Tinder$6789');

        const { id } = decodedMsg;
        const user = await User.findById(id);

        if (!user)
            throw new Error('User does not exist');

        req.user = user;
        next();
    }
    catch (err) {
        res.status(400).send('Error ' + err.message)
    }


}

module.exports = { userAuth }