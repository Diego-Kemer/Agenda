const res = require('express/lib/response')
const jwt = require('jsonwebtoken')

const tokenSing = async (user)=>{
    return jwt.sign({
        _id: user._id,
        user: user.nameUser
    },
    process.env.TOKEN_SECRETO,
    {
        expiresIn: '2h'
    })
}

const verify = async (token)=>{
    try {
        return jwt.verify(token, process.env.TOKEN_SECRETO)
    } catch (error) {
        return console.log('error')
        // res.status(409)
        // res.json({error: 'No se puede perra'})
    }
}
module.exports = {tokenSing, verify}
