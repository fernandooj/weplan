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
let itemServices = require('../services/itemServices.js')
let planServices = require('../services/planServices.js')
let pagoPublicoServices = require('../services/pagoPublicoServices.js')
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
    despues del login siempre modifico ==> tokenphone
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
                noExiste(req, res)
            }else{
                req.session.usuario = {user}
                //user.tokenPhone!==req.body.tokenPhone  ?modificaUsuario(req, res) :res.json({status: 'SUCCESS', user, code:1})
                modificaUsuario(req, res)
            }
        })
    })

    ///////////////////////////////////////////////////////////////////////////
    /*
    si el usuario no existe lo creo en redes sociales
    */
    ///////////////////////////////////////////////////////////////////////////
    const noExiste = (req, res)=>{
        userServices.facebook(req.body, (err, user)=>{
            if (err) {
                res.json({status:'FAIL', err, code:0})    
            }else{
                req.session.usuario = {user:user} 
                res.json({status: 'SUCCESSNOEXISTE', user, code:1})
            }
        })
    }


    ///////////////////////////////////////////////////////////////////////////
    /*
    siempre modifico sus datos basicos ==>phone, nombre, tokenphone
    */
    ///////////////////////////////////////////////////////////////////////////
    const modificaUsuario = (req, res)=>{
        userServices.modificaUsuario(req.session.usuario.user._id, req.body, (err, user)=>{
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
            pagoPublicoServices.getByidUSer(req.session.usuario.user._id, (err, saldo)=>{
                if(!err){
                    
                    saldo = saldo.length===0 ?0 :saldo[0].saldo
                    res.json({status:'SUCCESS', user: req.session.usuario, saldo, code:1})  
                }
            })
        } 
    })

     app.get('/x/v1/user/profile/:userId', function(req, res){
        userServices.getOneUser(req.params.userId, (err, user)=>{
             if(!err){
                req.session.usuario = {user:user}
                res.json({status:'SUCCESS',  user, code:1})  
            }
        })
    })

    ///////////////////////////////////////////////////////////////////////////
    /*
    busco al usuario logueado, esto es por que desde el admin actualizo la info,
    pero en el usuario no se ven los cambios
    */
    ///////////////////////////////////////////////////////////////////////////
    app.get('/x/v1/user/profile2', function(req, res){
        userServices.getOneUser(req.session.usuario.user._id, (err, usuario)=>{
            if(!err){
                res.json({status:'SUCCESS', usuario})
            }else{
                res.json({ status: 'FAIL', err}) 
            }
        })
    })

    ///////////////////////////////////////////////////////////////////////////
    /*
    lista usuarios
    */
    ///////////////////////////////////////////////////////////////////////////
    app.get('/x/v1/users/', (req,res)=>{
        if(req.session.usuario){
            if (req.session.usuario.user.acceso=='superAdmin') {
                userServices.get((err, usuarios)=>{
                    if(!err){
                        usuarios = usuarios.map(e=>{
                            let data = e.data[0].info[0]
                            return{
                                id:e._id,
                                saldo:e.saldo,
                                photo:data.photo,
                                ciudad:data.ciudad,
                                estado:data.estado,
                                nombre:data.nombre,
                                cedula:data.cedula,
                                telefono:data.telefono,
                                likes:e.likes,
                                username:data.username,
                            }
                        })
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
    Inserta Pago
    
    app.post('/x/v1/users/insertapago', function(req,res){
        if(req.session.usuario){
            if (req.session.usuario.user.acceso=='superAdmin') {
                let activo = true
                userServices.insertPago(req.body, activo, (err, usuarios)=>{
                    if(!err){
                        let nuevoSaldo = usuarios.saldo + parseInt(req.body.monto)
                        userServices.editoSaldo(req.body.userId, nuevoSaldo, (err, data)=>{
                            if (!err) {
                                 res.json({status:'SUCCESS', data})
                            }
                        })
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
*/
    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    /*
    DESCUENTa un Pago cuando se activa un plan
    
    app.post('/x/v1/users/descuentapago', function(req,res){
        if(req.session.usuario){
            let activo = true
            userServices.descuentaPago(req.body, req.session.usuario.user._id, activo, (err, usuarios)=>{
                if(!err){
                    console.log(usuarios)
                    let nuevoSaldo = usuarios.saldo + parseInt(-Math.abs(req.body.monto))
                    userServices.editoSaldo(req.session.usuario.user._id, nuevoSaldo, (err, data)=>{
                        if (!err) {
                             res.json({status:'SUCCESS', data, code:1})
                        }
                    })
                }else{
                    res.json({ status: 'FAIL', err}) 
                }
            })
        }else{
            res.json({ status: 'FAIL', message:'usuario no logueado'})  
        }
    })
*/
    ///////////////////////////////////////////////////////////////////////////

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
    lista usuarios solo activos y suscriptores / menos mi perfil
    */
    ///////////////////////////////////////////////////////////////////////////
    app.get('/x/v1/users/activos/sinPerfil', function(req,res){
        if(req.session.usuario){
            userServices.getActivos(function(err, usuarios){
                if(!err){
                    usuarios = usuarios.filter(e=>{
                        return e._id != req.session.usuario.user._id
                    })
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
                    res.json({status:'SUCCESS', user, code:1})
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
        console.log(req.files)
        if (req.files) {
            if (req.files.imagen!=undefined) {
                let extension = req.files.imagen.name.split('.').pop()
                let randonNumber = Math.floor(90000000 + Math.random() * 1000000)
                fullUrl = '../../front/docs/public/uploads/avatar/'+fecha+'_'+randonNumber+'.'+extension
                ruta = req.protocol+'s://'+req.get('Host') + '/public/uploads/avatar/'+fecha+'_'+randonNumber+'.'+extension
                fs.rename(req.files.imagen.path, path.join(__dirname, fullUrl))   
            }        
        }else{
            ruta = req.body.photo
        }

 
        userServices.edit(req.body, req.params, ruta, function(err, user1){
            if(err){
                res.json({ status: 'FAIL', message: err}) 
            } else{
              
               
                userServices.login(user1, (err, user)=>{
                    console.log(user)
                    if (!err) {
                        req.session.usuario = {user:user}
                        res.json({ status: 'SUCCESS', message: 'Usuario Activado', user }); 

                    }
                    
                })       
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

    ///////////////////////////////////////////////////////////////////////////
    /*
    ENVIA EL MENSAJE PARA RECUPERAR LA CONTRASEÑA
    */
    ///////////////////////////////////////////////////////////////////////////
    app.post('/x/v1/user/recupera_contrasena', function(req, res){
        userServices.getEmail(req.body, function(err, users){
            randonNumber = Math.floor(1000 + Math.random() * 9000);
            if (users) {
                if(users["estado"]=='activo'){
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
                    res.json({ status: 'FAIL', message: 'este usuario esta innactivo', code:3 });    
                }
            }else{
                  res.json({ status: 'FAIL', message: 'este usuario no existe', code:2 });    
            }             
        }) 
    })
 
 
    ///////////////////////////////////////////////////////////////////////////
    /*
    EDITA LA CONTRASEÑA
    */
    ///////////////////////////////////////////////////////////////////////////
    app.post('/x/v1/user/password', function(req, res){
        userServices.editaPassword(req.session.usuario.user._id, req.body.password, req.body.token, (err, user)=>{
            if (!err) {
                res.json({ status: 'SUCCESS', message: 'Password Actualizado', user, code:1 });
            }else{
                res.json({ status: 'FAIL', message: err, code:0 }); 
            }
        })
    })


    ///////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////    OBTENGO DE CADA USUARIO LO QUE ADEUDA POR  ITEM pantalla abonos por el creador del item
    ///////////////////////////////////////////////////////////////////////////////////////////////
    app.get('/x/v1/user/porusuario/:itemId', (req, res)=>{
        itemServices.getById(req.params.itemId, (err, item)=>{
            if(!err){
                userServices.deudaPorUsuario(req.session.usuario.user._id, req.params.itemId, (err, usuarios)=>{
                    if(err){
                        res.json({err, code:0})
                    }else{
                        console.log(usuarios)
                        res.json({ status: 'SUCCESS', usuarios, item, code:1 });                
                    }
                })
            }
        })
    })

    ///////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////    OBTENGO DE CADA USUARIO LO QUE ADEUDA POR PLAN pantalla detalle deudas del plan en my wallet
    ///////////////////////////////////////////////////////////////////////////////////////////////
    app.get('/x/v1/user/deudaUsuarioPorPlan/:planId', (req, res)=>{
        planServices.getByIdPlan(req.params.planId, (err, plan)=>{
            if(!err){
                userServices.deudaUsuarioPorPlan(req.session.usuario.user._id, req.params.planId, (err, usuarios)=>{
                    if(err){
                        res.json({err, code:0})
                    }else{
                        // usuarios = usuarios.map(e=>{
                        //     let data = e.data[0].info[0]
                        //     return{
                        //         id:e._id,
                        //         nombre:data.nombre,
                        //         photo:data.photo,
                        //         monto:(Math.ceil((item[0].valor/(item[0].asignados.length+1))/100)*100)-e.deuda,
                        //     }
                        //     return e.data.map(e2=>{
                        //         return{
                        //             monto2:e2.info[0].monto
                        //         }
                        //        // console.log(e2.info[0].monto)
                        //     })

                        // })
                        console.log(usuarios)
                        res.json({ status: 'SUCCESS', usuarios, plan, code:1 });                
                    }
                })
            }
        })
    })

    ///////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////    DESACTIVO LA NOTIFICACION O EL PUNTO DEL FOOTER
    ///////////////////////////////////////////////////////////////////////////////////////////////
    app.put('/x/v1/user/desactivaNotificacion', (req, res)=>{
        userServices.desactivaNotificacion(req.session.usuario.user._id, (err, user)=>{
            if (!err) {
                req.session.usuario = {user:user}
                res.json({ status: 'SUCCESS', user, code:1 }); 
            }
        })
    })

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/x/v1/logout', (req, res)=>{
        req.session.usuario = null;
        req.session = null;
        console.log(req.session)
        res.json({status: 'SUCCESS', message:'sesion terminada', code:1})
    });

   
}