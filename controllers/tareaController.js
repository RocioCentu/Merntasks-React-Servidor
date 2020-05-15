const Proyecto=require('../models/Proyecto');
const Tarea=require('../models/Tarea');
const {validationResult} = require('express-validator');

exports.crearTarea=async(req,res)=>{
// revisar si hay errores
const errors= validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
}

const {proyecto}= req.body;
try{


    //verificar si e proyecto existe
    proyectoExistente=await Proyecto.findById(proyecto);
    if(!proyectoExistente){
        return res.status(404).json({msg:'Proyecto no encontrado'});
    }

     //verificar el creador del proyecto

     if(proyectoExistente.creador.toString() !== req.usuario.id){
        res.status(401).json({msg:'No Autorizado'});
    }

   // crear tarea

   const tarea= new Tarea(req.body);

    
    //guardar proyecto
     tarea.save();
    res.json(tarea);

}catch(error){

 console.log(error);
 res.status(500).send('hubo un error');

}   

}

//obtiene las tareas de  un proyecto
exports.obtenerTareas=async(req,res)=>{
 //p para agarrar lo que viene por params en el cliente
    const {proyecto}= req.query;
    try{
    
    
        //verificar si e proyecto existe
        proyectoExistente=await Proyecto.findById(proyecto);
        if(!proyectoExistente){
            return res.status(404).json({msg:'Proyecto no encontrado'});
        }
    
         //verificar el creador del proyecto
    
         if(proyectoExistente.creador.toString() !== req.usuario.id){
            res.status(401).json({msg:'No Autorizado'});
        }
    
       // obtener tareas
      // where (proyecto==proyecto)
       const tareas= await Tarea.find({proyecto}).sort({creado:-1});
    
        res.json(tareas);
    
    }catch(error){
    
     console.log(error);
     res.status(500).send('hubo un error');
    
    }   
    
    }
    
//actualizar tarea
exports.actualizarTarea=async(req,res)=>{
 
    const {proyecto,nombre,estado}= req.body;
    try{
    
    
        //verificar si e proyecto existe
        proyectoExistente=await Proyecto.findById(proyecto);
        if(!proyectoExistente){
            return res.status(404).json({msg:'Proyecto no encontrado'});
        }
    
           // si la tarea existe o no 
           tareaExistente=await Tarea.findById(req.params.id);
           if(!tareaExistente){
               return res.status(404).json({msg:'Tarea no encontrado'});
           }
       
         //verificar el creador del proyecto
    
         if(proyectoExistente.creador.toString() !== req.usuario.id){
            res.status(401).json({msg:'No Autorizado'});
        }


       

        //crear obj con nueva info
        const nuevaTarea={};
 
            nuevaTarea.estado=estado;
        
    
            nuevaTarea.nombre=nombre;
        
      
     // guardar tarea
    tareaExistente= await Tarea.findByIdAndUpdate({_id: req.params.id},{$set: nuevaTarea},{new:true});
        res.json(tareaExistente);
    
    }catch(error){
    
     console.log(error);
     res.status(500).send('hubo un error');
    
    }   
    
    }
    
    //eliminar tarea por id
    exports.eliminarTarea=async(req,res)=>{
 
        const {proyecto}= req.query;
        try{
        
        
            //verificar si el proyecto existe
            proyectoExistente=await Proyecto.findById(proyecto);
            if(!proyectoExistente){
                return res.status(404).json({msg:'Proyecto no encontrado'});
            }
        
               // si la tarea existe o no 
               tareaExistente=await Tarea.findById(req.params.id);
               if(!tareaExistente){
                   return res.status(404).json({msg:'Tarea no encontrado'});
               }
           
             //verificar el creador del proyecto
        
             if(proyectoExistente.creador.toString() !== req.usuario.id){
                res.status(401).json({msg:'No Autorizado'});
            }
    
    
           
    
            //eliminar tarea
            await Tarea.findOneAndRemove({_id: req.params.id});
            res.json({msg:'Tarea eliminada'});
        
        }catch(error){
        
         console.log(error);
         res.status(500).send('hubo un error');
        
        }   
        
        }
        