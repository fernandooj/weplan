'use strict';
/////////////////////////////////////////////////////////////////////////
/***** librerias necesarias para el funcionamiento de la app  **********/
/////////////////////////////////////////////////////////////////////////
let express      = require('express') 
let app          = express();
let bodyParser   = require('body-parser');
let morgan       = require('morgan');
let mongoose     = require('mongoose');
let cookieParser = require('cookie-parser');
let cookieSession = require('cookie-session')
let formidable   = require('express-form-data');
const fileUpload = require('express-fileupload');

// importo las rutas
let categoriaRutas = require('./routes/Categoria.js');
let generoRutas = require('./routes/Genero.js');
let libroRutas = require('./routes/Libro.js');
let libroByIdRutas = require('./routes/LibroById.js');
let usersRutas = require('./routes/Users.js');
let tituloRutas = require('./routes/Titulo.js');
let paisRutas = require('./routes/Pais.js');
let conversacionRutas = require('./routes/Conversacion.js');
let mensajeRutas = require('./routes/Mensaje.js');
let resenaRutas = require('./routes/Resena.js');
let ventaRutas = require('./routes/Venta.js');
let resumenRutas = require('./routes/Resumen.js');
let libroDeseaRutas = require('./routes/LibroDesea.js');

const path          = require('path');
//let mongoStore   = require('connect-mongo')(session)
/////////////////////////////////////////////////////////////////////////
/***** librerias necesarias para el login con facebook | google  *******/
/////////////////////////////////////////////////////////////////////////   
let passport = require('passport');
let flash    = require('connect-flash');


/////////////////////////////////////////////////////////////////////////
/***** puerto donde va a funcionar el servidor por defecto 8080  *******/
/////////////////////////////////////////////////////////////////////////
let port = process.env.port || 8080;





/////////////////////////////////////////////////////////////////////////
/********* importo el archivo de configuracion de passport   ***********/
/////////////////////////////////////////////////////////////////////////
require('./config/passport')(passport); // pass passport for configuration


    


// da acceso para los servicios
mongoose.Promise = global.Promise;
let config = require('./config/config.js');
let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    //res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, ');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,  x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
};

//llamo al archivo de configuracion
mongoose.connect(config.database)

// llamo a los archivos estaticos
app.get('/:url', (req, res) => {
  res.sendFile(path.join(__dirname, '../front/docs/index.html'));
});
app.get('/:url/:url', (req, res) => {
  res.sendFile(path.join(__dirname, '../front/docs/index.html'));
});

app.use(express.static('../front/docs'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(allowCrossDomain);



// required for passport
app.use(cookieSession({ 
  name: '23eirofjiw8',
   keys: ['key1', 'key2']
})); /// session secret

app.use(formidable.parse({ keepExtensions:true }))


/*app.use( session( {
    saveUninitialized: false,
    resave: false,
    secret: "parientico",
    store: new mongoStore( {
        mongooseConnection: mongoose.connection
    } )
} ) );*/


app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); 


 


// creo la ruta de las categorias
app.use('/x/v1/cat/categoria', categoriaRutas)
app.use('/x/v1/gen/genero', generoRutas)
app.use('/x/v1/lib/libro', libroRutas)
app.use('/x/v1/lib/libroById', libroByIdRutas)
app.use('/x/v1/tit/titulo', tituloRutas)
app.use('/x/v1/pap/pais', paisRutas)
app.use('/x/v1/con/conversacion', conversacionRutas)
app.use('/x/v1/men/mensaje', mensajeRutas)
app.use('/x/v1/res/resena', resenaRutas)
app.use('/x/v1/ven/venta', ventaRutas)
app.use('/x/v1/res/resumen', resumenRutas)
app.use('/x/v1/lib/libroDesea', libroDeseaRutas)
require('./routes/Users.js')(app, passport);

app.listen(port)
console.log("run in: " + port)