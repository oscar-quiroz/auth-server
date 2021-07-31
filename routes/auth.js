const { Router } = require("express");
const { check } = require("express-validator");
const {
    crearUsuario,
    loginUsuario,
    renovarToken,
} = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-token");

const router = Router();

// crear un nuevo usuario
router.post(
    "/new", [
        check("name", "Se necesita un nombre de ususario").not().isEmpty(),
        check("email", "el email es obligatorio").isEmail(),
        check("password", "el password es obligatorio").isLength({
            min: 6,
        }),
        validarCampos,
    ],
    crearUsuario
);

// ingresar al sistema, inicio de sesion
router.post(
    "/", [
        check("email", "el email es obligatorio").isEmail(),
        check("password", "el password es obligatorio").isLength({
            min: 6,
        }),
        validarCampos,
    ],
    loginUsuario
);

// validar,revalidar token
router.get("/renew", [validarJWT], renovarToken);

module.exports = router;