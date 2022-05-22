const {verify} = require('./veryfiToke')

const checkAuth = async (req, res, nex)=>{
    console.log(req.headers.authorization)
    console.log(req, 'segunda')
    const token = req.headers.authorization.split(' ').pop()
    const tokenData = await verify(token)
    try {
        
        if (tokenData._id) {
            nex()
        } else {
            res.status(409)
            res.send({error: 'Nu se puede'})
        }
    } catch (error) {
        return res.send('no pasas')
    }
}

module.exports = {checkAuth};