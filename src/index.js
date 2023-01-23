const express = require('express');
const app = express();
const morgan = require('morgan');
// Configuraciones de express
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());
//Rutas

//Ficheros estáticos
app.use(express.static(__dirname + '/public'))

// servidor está escuchando
app.listen(app.get('port'), () => {
    console.log('Servidor a la escucha en el puerto', app.get('port'));
});