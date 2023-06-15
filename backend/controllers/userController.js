const { usersModel } = require('../Schema/userSchema')
const { catchAsyncError } = require('../middlewares/catchAsyncError')
const { ErrorHandler } = require('../utils/errorHandler')
const auth = require('../common/auth')
const Sendmail = require('../utils/sendMail')
const crypto = require('crypto')


const signUp = catchAsyncError(async (req, res, next) => {

    const exist_user = await usersModel.findOne({ email: req.body.email })
    // console.log(exist_user)
    if (exist_user) return next(new ErrorHandler(`User Already Exist With ${req.body.email}`, 400))
    console.log(req.body)
    req.body.password = await auth.hashPassword(req.body.password)
    console.log(req.body)
    const user = await usersModel.create(req.body)
    res.status(201).send({ success: true, message: "user created successfully" })


})

const login = catchAsyncError(async (req, res, next) => {
    const user = await usersModel.findOne({ email: req.body.email }, "+password")
    if (!user) return next(new ErrorHandler(`User with ${req.body.email} is not exist`, 401))
    if (await auth.hashCompare(req.body.password, user.password)) {
        res.status(200).send({ success: true, message: "Login Successful", user })
    } else {
        return next(new ErrorHandler("Invalid Password", 400))
    }
})

const forgotPassword = catchAsyncError(async (req, res, next) => {

    const user = await usersModel.findOne({ email: req.body.email })
    if (!user) return next(new ErrorHandler(`User not exist with ${req.body.email}`))
    if (user) {
        const resetToken = user.passwordResetToken()

        await user.save({ validateBeforeSave: false })

        const resetPasswordUrl = `${req.get('origin')}/resetpassword/${resetToken}`

        const message = `Url to reset password :- \n\n ${resetPasswordUrl} \n\n If you have not request for reset password then please ignore this mail`
        try {
            await Sendmail({
                email: user.email,

                message,
            });
            res.status(200).send({ message: `Email sent to ${user.email} successfully`, success: true })
        } catch (error) {
            user.resetPasswordToken = undefined
            user.resetPasswordExpire = undefined
            await user.save({ validateBeforeSave: false });
            res.status(500).send({ error, message: "Internal Server Error" })
        }
    }
})

const resetPassword = catchAsyncError(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await usersModel.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } })
    if (!user) return next(new ErrorHandler("Reset Password Token Expired", 404))
    console.log(req.body.password === req.body.confirmPassword)
    if (!(req.body.password === req.body.confirmPassword)) return next(new ErrorHandler("Passwords not match", 400))
    user.password = await auth.hashPassword(req.body.password)
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save()
    res.status(200).send({ message: 'password changed successfully', success: true })
})

module.exports = { signUp, forgotPassword, resetPassword, login }
