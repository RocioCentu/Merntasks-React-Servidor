const express= require('express');
const router= express.Router();
const TareaController= require('../controllers/tareaController');
const {check} = require('express-validator');
const auth= require('../middlewar/auth');

//api/tarea
router.post('/',
auth,
[
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    check('proyecto','el proyecto es obligatorio').not().isEmpty()
],
TareaController.crearTarea);


//api/tarea
router.get('/',
auth,
TareaController.obtenerTareas);

//api/tarea
router.put('/:id',
auth,

TareaController.actualizarTarea);


//api/tarea
router.delete('/:id',
auth,

TareaController.eliminarTarea);
module.exports= router;