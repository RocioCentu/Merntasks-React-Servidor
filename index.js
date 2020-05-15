// creando servidor espress
const express= require('express');
const conectarDB= require('./config/db');

// para comunicarse entre dominios , por los dos localshot 
const cors = require('cors');
//crear servidor
const app = express();

//Conectar a la base de datos
conectarDB();
//habilitar cors

'use strict';

exports.handler = function(event, context) {
    
    var responseCode = 200;
    
    var response = {
        statusCode: responseCode,
        headers: {
            "x-custom-header" : "my custom header value",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(event)
    };
    
    context.succeed(response);
};

app.use();


  
//creando puerto de la app
const port = process.env.port || 4000;
//importaar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));


//arrarncar el servidor
app.listen(port,'0.0.0.0',()=>{
    console.log('el servidor esta funcionando en el puerto ${port} ');
})