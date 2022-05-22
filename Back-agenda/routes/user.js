const router = require('express').Router()
const user = require('../models/user')
const bcrypt = require('bcryptjs');
const {tokenSing} = require('../helper/veryfiToke')

router.post('/', async (req, res)=>{
    console.log(req.body)
    const us = req.body.us;
    const usuario = await user.findOne({nameUser: us})
    if(usuario){
        return res.json({
            error: true,
            mensaje: 'this user is register',
            data: usuario
        })
    }
    const pass = await bcrypt.hash(req.body.password, 10)
    const newUser = new user({
        //us
        nameUser: us,
        password: pass
    })
    const guardado = await newUser.save()
    res.json({
        error: false,
        mensaje: 'The user save rigth',
        data: guardado
    })
})

router.post('/login', async (req, res)=>{
    console.log(req.body)
    const {userLog, password} = req.body;
    let usuario = await user.findOne({nameUser: userLog})
    if (!usuario) {
        return res.json({
            error: true,
            mensaje: "This user is not register"
        })
    }
    console.log(usuario)
    const comparar = await bcrypt.compare(password, usuario.password)
    if (!comparar) {
        return res.json({
            error: true,
            mensaje: "Password invalid"
        })
    }
    const tokenSession = await tokenSing(usuario)
    res.json({
        error: false,
        mensaje: 'Bienvenido',
        data: tokenSession,
        _id: usuario._id
    })
})




module.exports = router;