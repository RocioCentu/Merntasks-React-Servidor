const Usuario= require('../models/Usuario');
const bcryptjs= require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario=async(req,res)=>{

// revisar si hay errores
     const errors= validationResult(req);
    if(!errors.isEmpty()){
     return res.status(400).json({errors:errors.array()});
 }

    //entrar mail y pass
    const {email,password}= req.body;

    


    try{
        //revisar que el usuario este registrado 
        res.header('Access-Control-Allow-Origin', '*');
       let usuario=await Usuario.findOne({email});
       
       if(!usuario){
           return res.status(400).json({msg:'el usuario no existe'});
       }

       

       //revisar pass
         const passCorrecto= await bcryptjs.compare(password,usuario.password);
         
         if(!passCorrecto){
            return res.status(400).json({msg:'Contraseña incorrecta'});
        }
 


        //si todo es correcto crear y formar json web token (es como la sesion en php)
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

//obtiene que usuario esta autenticado
exports.usuarioAutenticado= async(req,res)=>{
    try {
        const usuario= await Usuario.findById(req.usuario.id).select('-password');
        res.json({usuario});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'Hubo un error'});
    }
}