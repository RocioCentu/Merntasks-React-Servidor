const Usuario= require('../models/Usuario');
const bcryptjs= require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
exports.crearUsuario=async(req,res)=>{

// revisar si hay errores
 const errors= validationResult(req);
 if(!errors.isEmpty()){
     return res.status(400).json({errors:errors.array()});
 }

    //entrar mail y pass
    const {email,password}= req.body;

    

    try{
        //revisar que el usuario registrado sea unico
       let usuario=await Usuario.findOne({email});
       
       if(usuario){
           return res.status(400).json({msg:'el usuario ya existe'});
       }

       

       //crear  nuevo usuario

       usuario= new Usuario(req.body);

         // hashear contraseña 
        const salt= await  bcryptjs.genSalt(10);
        usuario.password= await bcryptjs.hash(password,salt);
        
         //guarda nuevo usuario
        await usuario.save();

        //crear y formar json web token (es como la sesion en php)
        const payload={
                 usuario:{
                     id:usuario.id
                 }
        }
        //firmar el JWT
        jwt.sign(payload , process.env.SECRETA,{
             expiresIn:3600 // 1 hora
        },(error,token)=>{
            if(error)throw error;

            
       //mensaje de confirmacion
       res.json({token});
        });



    }catch(error){

    console.log(error);
    res.status(400).send('hubo un error');
    }
}