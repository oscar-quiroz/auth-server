const { response } = require('express');

const crearUsuario = (req, res = response) => {
    return res.json({
        ok: true,
        mesg: "crear un nuevo usuario  /new"
    })
}

const loginUsuario = (req, res = response) => {
    return res.json({
        ok: true,
        mesg: "Login de usuario  /"
    })
}


const renovarToken = (req, res = response) => {
    return res.json({
        ok: true,
        mesg: "Renovado /renew"
    })
}

module.exports = { crearUsuario, loginUsuario, renovarToken }