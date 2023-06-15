const mongoose = require('mongoose')
const validator = require('validator')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Provide Your Name'],

    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validator: [validator.isEmail, 'Invalid Email']
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
}, {
    collection: 'users',
    versionKey: false
})

userSchema.methods.passwordResetToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex')
    console.log(resetToken)
    const tokenCrypto = crypto.createHash('sha256').update(resetToken).digest('hex')
    console.log(tokenCrypto)
    this.resetPasswordToken = tokenCrypto
    this.resetPasswordExpire = Date.now() + 20 * 60 * 1000
    return resetToken
}

const usersModel = mongoose.model('users', userSchema)
module.exports = { usersModel }