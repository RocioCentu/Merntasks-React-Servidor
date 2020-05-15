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
const PORT = process.env.PORT || 4000;


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
  
  app.get('/jokes/random', (req, res) => {
    request(
      { url: 'https://joke-api-strict-cors.appspot.com/jokes/random' },
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          return res.status(500).json({ type: 'error', message: err.message });
        }
  
        res.json(JSON.parse(body));
      }
    )
  });

  //importaar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));

//arrarncar el servidor
app.listen(PORT,'0.0.0.0',()=>{
    console.log('el servidor esta funcionando en el puerto ${PORT} ');
})