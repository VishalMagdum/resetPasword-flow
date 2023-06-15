const bcrypt = require('bcryptjs') // add comment
const SALT = 10;   //add coment
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET
const hashPassword = async (password) => {
    let salt = await bcrypt.genSalt(SALT) //console.
    // console.log("salt", salt)
    return await bcrypt.hash(password, salt)
    console.log('hash', hash)

}
const hashCompare = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword)

}

const createToken = async (payload) => {
    return await jwt.sign(payload, SECRET, { expiresIn: '1d' })
}

const decodeToken = async (token) => {
    return await jwt.decode(token)
}

module.exports = { hashPassword, hashCompare }
