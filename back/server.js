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
let SocketIO     = require('./socket.js')


// importo las rutas
let categoriaRutas = require('./routes/Categoria.js');
let paisRutas = require('./routes/Pais.js');
let amigoUser = require('./routes/amigoUser.js');
let planRutas = require('./routes/Plan.js');
let chatRutas = require('./routes/Chat.js');

const path          = require('path');
//let mongoStore   = require('connect-mongo')(session)
/////////////////////////////////////////////////////////////////////////
/***** librerias necesarias para el login con facebook | google  *******/
/////////////////////////////////////////////////////////////////////////   
let passport = require('passport');
let flash    = require('connect-flash');

 
let http = require('http')
let server = http.Server(app)
SocketIO(server)


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
mongoose.connect(config.database, { useMongoClient: true })

// llamo a los archivos estaticos
app.get('/:url', (req, res) => {
  res.sendFile(path.join(__dirname, '../admin/docs/index.html'));
});
app.get('/:url/:url', (req, res) => {
  res.sendFile(path.join(__dirname, '../admin/docs/index.html'));
});

app.use(express.static('../admin/docs'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(allowCrossDomain);



// required for passport
app.use(cookieSession({ 
  name: '23eirofjiw8',
  keys: ['key1', 'key2'],
   rolling: true,
  resave: true, 
  saveUninitialized: false
})); /// session secret

app.use(formidable.parse({ keepExtensions:true }))


/*app.use( session( {
    saveUninitialized: false,
    resave: false,
    secret: "parientico",plaplan
    store: new mongoStore( {
        mongooseConnection: mongoose.connection
    } )
} ) );*/


app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); 


 


// creo la ruta de las categorias
app.use('/x/v1/cat/categoria', categoriaRutas)
app.use('/x/v1/ami/amigoUser', amigoUser)
app.use('/x/v1/pap/pais', paisRutas)
app.use('/x/v1/pla/plan', planRutas)
app.use('/x/v1/cha/chat', chatRutas)

require('./routes/Users.js')(app, passport);

server.listen(port)
console.log("run in: " + port)