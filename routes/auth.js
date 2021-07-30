const { Router } = require('express');
const { crearUsuario, loginUsuario, renovarToken } = require('../controllers/auth');

const router = Router();

// crear un nuevo usuario
router.post('/new', crearUsuario);

// ingresar al sistema, inicio de sesion
router.post('/', loginUsuario);

// validar,revalidar token
router.get('/renew', renovarToken);

module.exports = router;