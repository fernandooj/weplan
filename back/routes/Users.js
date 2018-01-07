'use strict';
let nodemailer = require('nodemailer');
let userServices = require('./../services/usersServices.js') 
let fs = require('fs');
let path = require('path');
let randonNumber=null;  /// numero randon que genera el codigo de verificacion, linea 35
let transporter=null;   /// variable que guarda la configuracion para el envio del email
let client = null; 

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
    randonNumber = Math.floor(1000 + Math.random() * 9000);
    app.post('/x/v1/user/sign_up', function(req, res){
        userServices.getEmail(req.body, function(err, users){
            if (users) {
                if(users["estado"]=='inactivo'){
                    res.json({ status: 'FAIL', message: 'este usuario ya existe, y es innactivo', code:3 });    
                }else{
                    res.json({ status: 'FAIL', message: 'este usuario ya existe y esta activado', code:2 });    
                }
            }else{
                userServices.create(req.body, randonNumber, function(err, user){
                    if(err){
                        return res.json({ err:err })
                    }else{
                        if(req.body.tipo==1){
                            let mailOptions = {
                                from: '<weplanapp@weplanapp.com>',                              // email del que se envia
                                to: user.local.username,                                        // al usuario que se la va enviar
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
                                  to:  req.body.username,
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
        console.log(req.body.username)
        userServices.verificaToken(req.body, function(err, token){
            if(!token){
                return res.json({ status: 'FAIL', message: 'no conciden', code:0})        
            } else{
                userServices.activaUsuario(req.body, function(err, activado){  
                console.log(activado['_id'])
                    if (activado) {
                        //return res.redirect('/perfil'); 
                        req.session.usuario =  {id: activado['_id'], username: req.body.username}
                        return res.json({ status: 'SUCCESS', message: 'Usuario activado', user: activado });                
                    }
                })
            }
        }) 
    })

    ///////////////////////////////////////////////////////////////////////////
    /*
    modificar usuarios
    */
    ///////////////////////////////////////////////////////////////////////////
    app.put('/x/v1/user/update/:_id', function(req, res, next){
        console.log(req.params)
        userServices.edit(req.body, req.params, function(err, user){
            if(!user){
                res.json({ status: 'FAIL', message: 'Usuario Innactivo'}) 
            } else{
                res.json({ status: 'SUCCESS', message: 'Usuario Activado', user: user });                
            }
        }) 
    })


    ///////////////////////////////////////////////////////////////////////////
    /*
        login 
    */
    ///////////////////////////////////////////////////////////////////////////

    app.post('/x/v1/user/login', passport.authenticate('local-login', {
        successRedirect : '/x/v1/user/profile', // redirect to the secure profile section
        failureRedirect : '/x/v1/user/loginFail', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    ///////////////////////////////////////////////////////////////////////////
    /*
    si el login es exitoso
    */
    ///////////////////////////////////////////////////////////////////////////
    app.get('/x/v1/user/profile', function(req, res){
        console.log(req)
        if(!req.user && !req.session.usuario){
            res.json({status:'FAIL', user: 'SIN SESION' })
        }else{
            //res.json({'user': req.user, 'user': req.session.usuario })
            if(req.user) {
                res.json({status:'SUCCESS', user: req.user})  
            }else{
                res.json({status:'SUCCESSLOCAL', user: { local: {id:req.session.usuario.id, username:req.session.usuario.username  } } })   
            }    
             
        } 
        
         
    })

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
    LOGIN FACEBOOK
    */
    ///////////////////////////////////////////////////////////////////////////
    app.get('/x/v1/auth/facebook', passport.authenticate('facebook'));
    app.get('/x/v1/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/',
            failureRedirect : '/registrarse'
        })
    );

    ///////////////////////////////////////////////////////////////////////////
    /*
    LOGIN GOOGLE
    */
    ///////////////////////////////////////////////////////////////////////////
    app.get('/x/v1/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get('/x/v1/auth/google/callback',
        passport.authenticate('google', {
            successRedirect : '/',
            failureRedirect : '/registrarse'
        })
    );

    ///////////////////////////////////////////////////////////////////////////
    /*
    lista usuarios
    */
    ///////////////////////////////////////////////////////////////////////////
    app.get('/x/v1/users/', function(req,res){
        if(req.user){
            if (req.user.tipo=='admin') {
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
    modifica tipo y activa/desactiva
    */
    ///////////////////////////////////////////////////////////////////////////
    app.post('/x/v1/users/', function(req,res){
        if(req.user){
            if (req.user.tipo=='admin') {
                userServices.tipo(req.body, function(err, usuarios){
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
        req.logout();
        req.session.destroy();
        res.redirect('/');
    });

         
}