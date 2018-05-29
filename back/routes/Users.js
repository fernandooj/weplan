'use strict';
let nodemailer = require('nodemailer');
let userServices = require('./../services/usersServices.js') 
let fs = require('fs');
let path = require('path');
let randonNumber=null;  /// numero randon que genera el codigo de verificacion, linea 35
let transporter=null;   /// variable que guarda la configuracion para el envio del email
let client = null; 

let moment   = require('moment');
let fecha = moment().format('YYYY-MM-DD-h-mm')

///////////////////////////////////////////////////////////////////////////
/*
    CONFIGURACION DATOS TWILIO
*/
///////////////////////////////////////////////////////////////////////////
client = require('twilio')( 
    'AC4befe78c65f3b0e70b62d21d9087a74f', //TWILIO_ACCOUNT_SID
    '267e2522810ddde9dc330acbc9ad6fd0'//TWILIO_AUTH_TOKEN
);

///////////////////////////////////////////////////////////////////////////
/*
    CONFIGURACION DEL CORREO
*/
///////////////////////////////////////////////////////////////////////////
transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'weplanapp@gmail.com', // generated ethereal user
        pass: 'appweplan'  // generated ethereal password
    }
});

module.exports = function(app, passport){
    ///////////////////////////////////////////////////////////////////////////
    /*
    Guardar solo email
    */
    ///////////////////////////////////////////////////////////////////////////

    app.post('/x/v1/user/sign_up', function(req, res){
        userServices.getEmail(req.body, function(err, users){
            randonNumber = Math.floor(1000 + Math.random() * 9000);
            if (users) {
                if(users["estado"]=='inactivo'){
                    userServices.modificaCodigo(req.body, randonNumber, function(err, user){
                        if(req.body.tipo==1){
                            let mailOptions = {
                                from: '<weplanapp@weplanapp.com>',                              // email del que se envia
                                to:   req.body.username,                                        // al usuario que se la va enviar
                                subject: 'Registro',                                            // mensaje en el sujeto
                                html:  `Tu codigo de verificacion es:<b> ${randonNumber} </b>`  // texto
                            };
                            transporter.sendMail(mailOptions, (error, info) => {
                                if (error) {
                                    return console.log(error);
                                }
                            });
                            res.json({ status: 'SUCCESS', message: 'Reenvieando mensaje', code:1 });
                        }else{
                            client.api.messages
                                .create({
                                  body: `Tu codigo es: ${randonNumber}` ,
                                  to:  `+57${req.body.username}`,
                                  from: '+17328750948',
                                }).then(function(data) {
                                    res.json({ status: 'SUCCESS', message: 'Reenvieando el mensaje', code:1 });
                                }).catch(function(err) { 
                                    res.json({ status: 'SUCCESS', message: 'no se pudo enviar el msn', code:0 });
                            });      
                        } 
                    })     
                }else{
                    res.json({ status: 'FAIL', message: 'este usuario ya existe', code:2 });    
                }
            }else{
                userServices.create(req.body, randonNumber, function(err, user){
                    if(err){
                        return res.json({ err:err })
                    }else{
                        if(req.body.tipo==1){
                            let mailOptions = {
                                from: '<weplanapp@weplanapp.com>',                              // email del que se envia
                                to: user.username,                                        // al usuario que se la va enviar
                                subject: 'Registro',                                            // mensaje en el sujeto
                                html:  `Tu codigo de verificacion es:<b> ${randonNumber} </b>`  // texto
                            };
                            transporter.sendMail(mailOptions, (error, info) => {
                                if (error) {
                                    return console.log(error);
                                }
                            });
                            res.json({ status: 'SUCCESS', message: 'Usuario Creado', user: user, code:1 });
                        }else{
                            client.api.messages
                                .create({
                                  body: `Tu codigo es: ${randonNumber}` ,
                                  to:  `+57${req.body.username}`,
                                  from: '+17328750948',
                                }).then(function(data) {
                                    res.json({ status: 'SUCCESS', message: 'Usuario Creado', user: user, code:1 });
                                }).catch(function(err) {
                                   res.json({ status: 'ERROR', message: 'no se pudo crear el usuario', user: user, code:0 });
                            });      
                        }
                    }
                })  
            }             
        })
    })


    app.post('/x/v1/user/resend_token', function(req, res){
        if(req.body.tipo==1){
            let mailOptions = {
                from: '<weplanapp@weplanapp.com>',                              // email del que se envia
                to: req.body.username,                                        // al usuario que se la va enviar
                subject: 'Registro',                                            // mensaje en el sujeto
                html:  `Tu codigo de verificacion es:<b> ${randonNumber} </b>`  // texto
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
            });
            res.json({ status: 'SUCCESS', message: 'Codigo enviado', code:1 });
        }else{
            client.api.messages
                .create({
                  body: `Tu codigo es: ${randonNumber}` ,
                  to:  req.body.username,
                  from: '+17328750948',
                }).then(function(data) {
                    res.json({ status: 'SUCCESS', message: 'Codigo enviado', code:1 });
                }).catch(function(err) {
                    res.json({ status: 'ERROR', message: 'no se pudo crear el usuario', code:0 });
            });      
        }
    })




    ///////////////////////////////////////////////////////////////////////////
    /*
    activar usuario despues de insertar el codigo
    */
    ///////////////////////////////////////////////////////////////////////////
    app.post('/x/v1/user/token/', function(req, res, next){
        userServices.verificaToken(req.body, function(err, token){
            if(!token){
                return res.json({ status: 'FAIL', message: 'no conciden', code:0})        
            } else{
                userServices.activaUsuario(req.body, function(err, activado){  
                    console.log(activado)
                    if (activado) {
                        
                        req.session.usuario =  {user:activado}
                        return res.json({ status: 'SUCCESS', message: 'Usuario activado', user: activado });                
                    }
                })
            }
        }) 
    })



    ///////////////////////////////////////////////////////////////////////////
    /*
        login 
    */
    ///////////////////////////////////////////////////////////////////////////

    app.post('/x/v1/user/login', (req,res)=>{
        userServices.login(req.body, (err, user)=>{
            if (err) {
                res.json({status:'FAIL', err, code:0 })
            }else{
                if(user==null){
                    res.json({status:'FAIL', user: 'Usuario no existe', code:2 })
                }else{
                    if(user.validPassword(req.body.password)){
                        console.log(req.body.tokenPhone)
                        req.session.usuario = {user:user}
                        //res.json({status:'SUCCESS', user: user, code:1 })
                        user.tokenPhone!==req.body.tokenPhone  ?modificaTokenPhone(req, res) :res.json({status: 'SUCCESS', user, code:1})
                    }else{
                        res.json({status:'FAIL', user: 'Datos incorrectos', code:0 })
                        
                    }     
                }
            }
        })
    });



    ///////////////////////////////////////////////////////////////////////////
    /*
    si el login NO FUE exitoso
    */
    ///////////////////////////////////////////////////////////////////////////
    app.get('/x/v1/user/loginFail', function(req, res){
        res.json({ status: 'FAIL', message: 'datos incorrectos' });   
    })



    ///////////////////////////////////////////////////////////////////////////
    /*
    peticion que verifica si el usuario existe
    */
    ///////////////////////////////////////////////////////////////////////////
    app.post('/x/v1/user/facebook', function(req, res){
        userServices.getEmailFacebook(req.body.username, (err, user)=>{   
            if (!user) {
                console.log(1)
                existe(req, res)
            }else{
                console.log(req.body)
                
                req.session.usuario = {user}
                user.tokenPhone!==req.body.tokenPhone  ?modificaTokenPhone(req, res) :res.json({status: 'SUCCESS', user, code:1})
            }
        })
    })

    ///////////////////////////////////////////////////////////////////////////
    /*
    si el usuario no existe lo creo en redes sociales
    */
    ///////////////////////////////////////////////////////////////////////////
    const existe = (req, res)=>{
        userServices.facebook(req.body, (err, user)=>{
            if (err) {
                res.json({status:'FAIL', err, code:0})    
            }else{
                req.session.usuario = {user:user}
                res.json({status: 'SUCCESS', user, code:1})
            }
        })
    }

    ///////////////////////////////////////////////////////////////////////////
    /*
    si el usuario modifico el token de su celular para notificaciones lo actualizo desde aca
    */
    ///////////////////////////////////////////////////////////////////////////
    const modificaTokenPhone = (req, res)=>{
        userServices.modificaTokenPhone(req.session.usuario.user._id, req.body.tokenPhone, (err, user)=>{
            if (err) {
                res.json({status:'FAIL', err, code:0})    
            }else{
                res.json({status: 'SUCCESS_MODIFICA', user, code:1})
            }
        })
    }



 

    ///////////////////////////////////////////////////////////////////////////
    /*
    si el login es exitoso
    */
    ///////////////////////////////////////////////////////////////////////////
    app.get('/x/v1/user/profile', function(req, res){
         
        if(req.session.usuario===undefined || req.session.usuario.user==null){
            res.json({status:'FAIL', user: 'SIN SESION', code:0 })
        }else{
            res.json({status:'SUCCESS', user: req.session.usuario, code:1})  
        } 
    })

    ///////////////////////////////////////////////////////////////////////////
    /*
    lista usuarios
    */
    ///////////////////////////////////////////////////////////////////////////
    app.get('/x/v1/users/', function(req,res){
        if(req.session.usuario){
            if (req.session.usuario.user.acceso=='superAdmin') {
                userServices.get(function(err, usuarios){
                    if(!err){
                        res.json({status:'SUCCESS', usuarios})
                    }else{
                        res.json({ status: 'FAIL', err}) 
                    }
                })
            }else{
                res.json({ status: 'FAIL', message:'No tienes acceso'})
            }
        }else{
            res.json({ status: 'FAIL', message:'usuario no logueado'})  
        }
    })


    ///////////////////////////////////////////////////////////////////////////
    /*
    lista usuarios solo activos y suscriptores
    */
    ///////////////////////////////////////////////////////////////////////////
    app.get('/x/v1/users/activos', function(req,res){
        if(req.session.usuario){
            userServices.getActivos(function(err, usuarios){
                if(!err){
                    res.json({status:'SUCCESS', usuarios})
                }else{
                    res.json({ status: 'FAIL', err}) 
                }
            })
        }else{
            res.json({ status: 'FAIL', message:'usuario no logueado'})  
        }
    })

    ///////////////////////////////////////////////////////////////////////////
    /*
    lista solo un usuario
    */
    ///////////////////////////////////////////////////////////////////////////
    app.get('/x/v1/users/getOneUser/:id', (req,res)=>{
        if(req.session.usuario){
            userServices.getOneUser(req.params.id, (err, user)=>{
                if(!err){
                    console.log(user)
                    res.json({status:'SUCCESS', user})
                }else{
                    res.json({ status: 'FAIL', err}) 
                }
            })
        }else{
            res.json({ status: 'FAIL', message:'usuario no logueado'})  
        }
    })

    ///////////////////////////////////////////////////////////////////////////
    /*
    Activa / Desactiva
    */
    ///////////////////////////////////////////////////////////////////////////
    app.post('/x/v1/users/', (req,res)=>{
        if(req.session.usuario){
            if (req.session.usuario.user.acceso=='superAdmin') {
                userServices.enableDisable(req.body, (err, usuarios)=>{
                    if(!err){
                        res.json({status:'SUCCESS', usuarios})
                    }else{
                        res.json({ status: 'FAIL', err}) 
                    }
                })
            }else{
                res.json({ status: 'FAIL', message:'No tienes acceso'})
            }
        }else{
            res.json({ status: 'FAIL', message:'usuario no logueado'})  
        }
    })


    ///////////////////////////////////////////////////////////////////////////
    /*
    Crea Usuario desde el administrador
    */
    ///////////////////////////////////////////////////////////////////////////
    app.post('/x/v1/users/createUser', function(req,res){
        let randonNumber = Math.floor(1000 + Math.random() * 9000);
        let ruta = null 
        console.log(req.files)
        if(req.session.usuario){
            if (req.session.usuario.user.acceso=='superAdmin') {
                if (req.files) {
                    let extension1 = req.files.imagen.name.split('.').pop()
                    let extension = extension1=='blob' ?'png' :extension1
                    console.log(extension)
                    let fullUrl = '../static/uploads/avatar/'+fecha+'_'+randonNumber+'.'+extension

                    ruta = req.protocol+'://'+req.get('Host') + '/uploads/avatar/'+fecha+'_'+randonNumber+'.'+extension
                    userServices.createUser(req.body, randonNumber, ruta, function(err, usuarios){
                        if(err){
                            res.json({err})
                        }else{
                            res.json({ status: 'SUCCESS', message: usuarios, code:1 }); 
                            fs.rename(req.files.imagen.path, path.join(__dirname, fullUrl))
                        }
                    })
                }else{
                    ruta = req.protocol+'://'+req.get('Host') + '/avatar.png'
                    userServices.createUser(req.body, randonNumber, ruta, function(err, usuarios){
                        if(!err){
                            res.json({status:'SUCCESS', usuarios})
                        }else{
                            res.json({ status: 'FAIL', err}) 
                        }
                    })
                }
            }else{
                res.json({ status: 'FAIL', message:'No tienes acceso'})
            }
        }else{
            res.json({ status: 'FAIL', message:'usuario no logueado'})  
        }
    })

    ///////////////////////////////////////////////////////////////////////////
    /*
    modificar usuarios
    */
    ///////////////////////////////////////////////////////////////////////////
    app.put('/x/v1/user/update/:_id', function(req, res, next){
        let ruta = null
        let fullUrl = null
        if (req.files) {
            let extension = req.files.imagen.name.split('.').pop()
            let randonNumber = Math.floor(90000000 + Math.random() * 1000000)
            fullUrl = '../../front/docs/public/uploads/avatar/'+fecha+'_'+randonNumber+'.'+extension
            ruta = req.protocol+'://'+req.get('Host') + '/public/uploads/avatar/'+fecha+'_'+randonNumber+'.'+extension
        }else{
            ruta = req.protocol+'://'+req.get('Host') + '/avatar.png'
        }
        

 
        userServices.edit(req.body, req.params, ruta, function(err, user){
            if(!user){
                res.json({ status: 'FAIL', message: err}) 
            } else{
                
                res.json({ status: 'SUCCESS', message: 'Usuario Activado', user: user }); 
                fs.rename(req.files.imagen.path, path.join(__dirname, fullUrl))                
            }
        }) 
    })
    
    ///////////////////////////////////////////////////////////////////////////
    /*
    modificar categorias
    */
    ///////////////////////////////////////////////////////////////////////////
    app.put('/x/v1/user/categoria', (req, res)=>{
        userServices.editCategorias(req.session.usuario.user._id, req.body.categorias, (err, user)=>{
            if(!user){
                res.json({ status: 'FAIL', err, code:0}) 
            } else{
                res.json({ status: 'SUCCESS', user, code:1 });            
            }
        }) 
    })

    ///////////////////////////////////////////////////////////////////////////
    /*
    Avatar 
    */
    ///////////////////////////////////////////////////////////////////////////
    app.post('/x/v1/user/avatar/:id', function(req, res){
        let extension = req.files.files.name.split('.').pop();
        userServices.avatar(req.params.id, extension, function(err, categoria){
            if (!err) {
                res.json({ status: 'SUCCESS', message: 'Avatar Actualizado', categoria });
                fs.rename(req.files.files.path, path.join(__dirname, "../../front/docs/public/uploads/avatar/"+categoria._id+"."+extension));
            }else{
                res.json({ status: 'FAIL', message: err }); 
            }
        })
    })

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/x/v1/logout', function(req, res) {
        req.session.usuario = null;
        req.session = null;
        console.log(req.session)
        res.json({status: 'SUCCESS', message:'sesion terminada', code:1})
    });

         
}