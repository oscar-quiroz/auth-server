const { response } = require("express");
const { validationResult } = require("express-validator");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async(req, res = response) => {
    const { email, name, password } = req.body;

    try {
        //verificar si noe xiste correo igual
        const usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: "El usuario ya existe con ese email",
            });
        }

        //crear ususario con el modelo
        const dbUser = new Usuario(req.body);

        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync(password, salt);

        //Generar el JWT como metodo de autenticacion
        const token = await generarJWT(dbUser.id, name);
        //crear usuario de base de datos

        await dbUser.save();

        //generar respuesta exitosa.
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name,
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "por favor hable con el admin",
        });
    }

    return res.json({
        ok: true,
        mesg: "crear un nuevo usuario  /new",
    });
};
// login del usuariuo siuu
const loginUsuario = async(req, res = response) => {
    const { email, password } = req.body;

    //
    try {
        const dbUser = await Usuario.findOne({ email });

        if (!dbUser) {
            return res.status(400).json({
                ok: false,
                msg: "El correo no existe",
            });
        }

        const validPassword = bcrypt.compareSync(password, dbUser.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "EL pásword no es valido",
            });
        }

        const token = await generarJWT(dbUser.id, dbUser.name);

        return res.json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "hable con el administrador",
        });
    }
};

//recibe token y lo valida
const renovarToken = async(req, res = response) => {

    const { uid, name } = req;
    const token = await generarJWT(uid, name);
    return res.json({
        ok: true,
        msg: "Renovado /renew",
        uid,
        name,
        token
    });
};

module.exports = { crearUsuario, loginUsuario, renovarToken };