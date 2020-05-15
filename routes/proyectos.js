// rutas para proyectos

//importar express
const express= require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const {check} = require('express-validator');
const auth= require('../middlewar/auth');

//api/proyectos
router.post('/',
//una vez q pasa el auth va al metodo del controller
auth,
[
    check('nombre','El nombre es obligatorio').not().isEmpty()
],
proyectoController.crearProyecto);

//para ver proyectos
router.get('/',
//una vez q pasa el auth va al metodo del controller
auth,
proyectoController.obtenerProyectos);

//actualizar  proyecto
router.put('/:id',
//una vez q pasa el auth va al metodo del controller
auth,
[
    check('nombre','El nombre es obligatorio').not().isEmpty()
],
proyectoController.actualizarProyecto);

//eliminar  proyecto
router.delete('/:id',
//una vez q pasa el auth va al metodo del controller
auth,
proyectoController.eliminarProyecto);

module.exports= router;