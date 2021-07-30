const { response } = require("express");
const { validationResult } = require("express-validator");

const crearUsuario = (req, res = response) => {
    const { email, name, password } = req.body;
    console.log(email, name, password);
    return res.json({
        ok: true,
        mesg: "crear un nuevo usuario  /new",
    });
};

const loginUsuario = (req, res = response) => {
    const { email, password } = req.body;
    console.log(email, password);
    return res.json({
        ok: true,
        mesg: "Login de usuario  /",
    });
};

//kshadlkhasdklhasklhdasl
const renovarToken = (req, res = response) => {
    return res.json({
        ok: true,
        mesg: "Renovado /renew",
    });
};

module.exports = { crearUsuario, loginUsuario, renovarToken };