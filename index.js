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


app.use(cors());
// habilitar express.json para leer datos que el usurio coloque
app.use(express.json({extended:true}));


  
//creando puerto de la app
const port = process.env.port || 4000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


  //importaar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));

//arrarncar el servidor
app.listen(port,()=>{
    console.log('el servidor esta funcionando en el puerto ${PORT} ');
})