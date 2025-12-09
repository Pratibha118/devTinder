const validator = require('validator');

function validateBody(req) {
    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName) {
        throw new Error('First name is not valid');
    }
    else if (!validator.isEmail(emailId))
        throw new Error('Email is not valid');
    else if (!validator.isStrongPassword(password))
        throw new Error('Password is not valid');

}

function validateUpdateFeilds(req){
    const allowedFeildsToUpdate = ['firstName','lastName','age','gender','about','skills','imageURL'];

    const isUpdateAllowed = Object.keys(req.body).every(feild=> allowedFeildsToUpdate.includes(feild) );

    return isUpdateAllowed;
}

module.exports = { validateBody,validateUpdateFeilds };