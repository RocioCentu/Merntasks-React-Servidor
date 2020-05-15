// rutas para autenticar usuarios

//importar express
const express= require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {check} = require('express-validator');
const auth= require('../middlewar/auth');

//iniciar sesion
//api/auth
router.get('/',
auth,
authController.usuarioAutenticado);

//api/auth
router.post('/',
authController.autenticarUsuario);

module.exports= router;