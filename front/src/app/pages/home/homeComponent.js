// @flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
 
import { Link }       from 'react-router-dom';
import style         from './home.scss';
 
import {Icon, Input, Button,  Form, Select, notification} from 'antd';
import {URL} from "../../index.js"
import 'antd/dist/antd.css'; 
import {  Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import PreloadImage from 'react-preload-image'
import Drawer from 'react-drag-drawer'
import {Animated} from "react-animated-css";
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import axios from 'axios'
import moment from 'moment'
import Slider from "react-slick";
 
 
const FormItem = Form.Item;
 

const Menu = ()=>{
   const logo = URL+'public/images/logo.png'
   return(
      <div className={style.navegacion}>
         <img src={logo} className={style.logo} />
         <ul className={style.menu2}>
            <li><Link to="/">Muneo</Link></li>
            {/* <li><Link to="/">Posiciones</Link></li> */}
            <li><Link to="/">Contacto</Link></li>
            <li><Link to="/acceso" className={style.cuentaBtn}>Cuenta</Link></li>
         </ul>
      </div>
   )   
}

const notificacionExitosa = (type) => {
  notification[type]({
    message: 'Mensaje Enviado',
    description: 'te hemos enviado un mensaje de texto con las indicaciones.',
  });
};
const notificacionError = (type) => {
  notification[type]({
    message: '!opss error',
    description: 'verifica tu telefono.',
  });
};
 class HomeComponent extends PureComponent{
   state = {
      modal:false,
      inicio:0,
      final:8
   }
   renderPlanes(){
      const {inicio, final} = this.state
      return this.props.planes.slice(inicio,final).map((e, key)=>{
         return(
            <aside key={key}>
               <PreloadImage
                  className={style.imgLoader}
                  src={e.imagenResize[0]}
                  lazy
               />
               <div  className={style.subContenedorPlanes}>
                  <p>{moment(JSON.parse(e.fechaLugar)).format("YYYY-MM-DD h:mm a")}</p>
                  <a   onClick={()=>this.setState({modal:true})} >Ver Plan</a>
               </div>
               <h2>{e.nombre}</h2>
            </aside>
         )
      })
   }
   mostrarMasPlanes(){
      const {final} = this.state
      this.setState({final:final+4})
      scroll.scrollMore(500);
      console.log(document.documentElement.scrollTop)
   }
   renderContenido(){
      const logo = URL+'public/images/logo.png'
      
      return (
        <div>
         {/**************************    SECCION 1    *************************/}
          <header className="section section1">
            
         {/***   MENU NAVEGACION   ***/}
            <nav className={style.navigator}> 
               <img src={logo} className={style.logo} />
               <ul className={style.menu}>
                   {/*<li><Link to="/">Muneo</Link></li>
                  <li><Link to="/">Posiciones</Link></li> 
                  <li><Link to="/">Contacto</Link></li>*/}
                  <li><Link to="/acceso" className={style.cuentaBtn}>Cuenta</Link></li>
               </ul>
            </nav>
         <section className={style.contenedorPlanes}>
            <div className={style.contenedorTitulo}>
               <h1>Muneo es la nueva forma de realizar todos tus planes</h1>
               <div onClick={()=>this.setState({modal:true})} className={style.btnDescargar}> 
                  <p>Descargar</p>
                  <Icon type="android" theme="filled" />
                  <Icon type="apple" theme="filled" />
               </div> 
            </div>
            {this.renderPlanes()}
            <div className={style.contenedorBtn}>
               <Button type="primary" onClick={()=>this.mostrarMasPlanes()} >Ver mas Planes</Button>
            </div>
         </section>
         {/***   SECCION IZQUIERDA  
            <Animated animationIn="bounceInLeft" animationInDelay={1000} isVisible={true}>
               <div className={style.contenedorBannerIzq}>
                 
                 
                  
               </div>
            </Animated> ***/}
         
         {/***   SECCION DERECHA  
            <div className={style.contenedorBanner}>
               <Animated animationIn="bounceInRight" animationInDelay={2000} isVisible={true}>
                    <img src={`${URL}public/images/cel-banner.png`} />
               </Animated>
               <Animated animationIn="bounceInRight"animationInDelay={2500} isVisible={true}>
                    <h1>Muneo <br/>¡Un mar de <br/>posibilidades!</h1>
               </Animated>
            </div> ***/} 

          </header>

         {/**************************    SECCION 2    *************************/}
          <section className={"section"}>
            
            <div className={style.section2}>
               <h2>¡Muneo, un mar de posibilidad para crear tus planes!</h2>
               <p>Muneo es la nueva forma de realizar todos tus planes, dividir costos y controlar todos los gastos que compartes con tus amigos de manera más fácil y practica… el único límite es tu imaginación.</p>
               <section>
                  <div className="slide"> <img src={`${URL}public/images/crear_plan.png`} /> </div>
                  <div className="slide"> <img src={`${URL}public/images/encuestas.jpeg`} /> </div>
                  <div className="slide"> <img src={`${URL}public/images/billetera.png`} /> </div>
                  <div className="slide"> <img src={`${URL}public/images/home.png`} /> </div>
                  <div className="slide"> <img src={`${URL}public/images/crear.jpeg`} /> </div>
               </section>
               <aside>
                  <Flippy
                     flipOnHover={true} // default false
                     flipDirection="horizontal" // horizontal or vertical
                     ref={(r) => this.flippy = r} // to use toggle method like this.flippy.toggle()
                  >
                  <FrontSide style={{ padding:0 }} >
                     <img src={`${URL}public/images/crear_plan.png`} />
                  </FrontSide>
                  <BackSide style={{ backgroundColor: '#175852'}}>
                     <p>¿Tienes un nuevo plan? ¿Has tenido dificultades organizando tus planes? Con Muneo puedes organizar mejor estas geniales ideas!<br />
                     -Crea un nombre<br />
                     -Asígnale una imagen<br />
                     -Fija un horario<br />
                     -Especifica la ubicación donde se desarrollará<br />
                     -Invita a tus amigos y empieza a disfrutar de las mejores experiencias con Muneo!<br />
                     En tus planes podrás interactuar con tus amigos y demás usuarios, compartir archivos multimedia y organizar todos los detalles de una manera más práctica y eficiente.</p>
                  </BackSide>
                  </Flippy>
               </aside>
               <aside>
                  <Flippy
                     flipOnHover={true} // default false
                     flipDirection="horizontal" // horizontal or vertical
                     ref={(r) => this.flippy = r} // to use toggle method like this.flippy.toggle()
                  >
                     <FrontSide style={{ padding:0 }} >
                        <img src={`${URL}public/images/encuesta.png`} />
                     </FrontSide>
                     <BackSide style={{ backgroundColor: '#471d1d'}}>
                       <p> Muneo te da la posibilidad de conocer mejor a tus amigos, crea encuestas para tomar mejores decisiones en tus planes y que todos estén de acuerdo. Así podrás asegurarte que no hayan errores en tu plan!</p>
                     </BackSide>
                  </Flippy>
                </aside>  
                <aside>
                  <Flippy
                     flipOnHover={true} // default false
                     flipDirection="horizontal" // horizontal or vertical
                     ref={(r) => this.flippy = r} // to use toggle method like this.flippy.toggle()
                  >
                     <FrontSide style={{ padding:0 }} >
                        <img src={`${URL}public/images/wallet.png`} />
                     </FrontSide>
                     <BackSide style={{ backgroundColor: '#197064'}}>
                       <p> Con la Billetera Muneo ya no te tienes que preocupar por tus gastos, visualiza el registro de todos los costos en los que has incurrido en los diferentes planes, con qué personas los has compartido y el saldo de estos. Muneo es tu mejor amigo para ayudarte a controlar tus gastos.</p>
                     </BackSide>
                  </Flippy>
                </aside>  
                <aside>
                  <Flippy
                     flipOnHover={true} // default false
                     flipDirection="horizontal" // horizontal or vertical
                     ref={(r) => this.flippy = r} // to use toggle method like this.flippy.toggle()
                  >
                     <FrontSide style={{ padding:0 }} >
                        <img src={`${URL}public/images/planes_publicos.png`} />
                     </FrontSide>
                     <BackSide style={{ backgroundColor: '#193070'}}>
                       <p> Muneo te permite explorar sugerencias de planes que crean diferentes usuarios en la sección del Home. Explora y conoce diferentes planes en el sitio donde te encuentres y ¡vive experiencias nuevas todos los días! Disfruta nuevas culturas, ideas, lugares y amigos que puedas encontrarte mientras usas Muneo.<br />

                        Ingresa a estos planes para ver más detalles, invita a tus amigos a participar contigo y no te quedes por fuera de los mejores planes que puedes encontrar cerca de ti!</p>
                     </BackSide>
                  </Flippy>
                </aside>  
                <aside>
                  <Flippy
                     flipOnHover={true} // default false
                     flipDirection="horizontal" // horizontal or vertical
                     ref={(r) => this.flippy = r} // to use toggle method like this.flippy.toggle()
                  >
                     <FrontSide style={{ padding:0 }} >
                        <img src={`${URL}public/images/crear_plan.png`} />
                     </FrontSide>
                     <BackSide style={{ backgroundColor: '#701965'}}>
                        <p>Puedes publicar los mejores planes para que los demás usuarios puedan asistir a estos, no tienes que ser una empresa para realizar estas publicaciones.<br />
                        -Crea un nombre para tu plan.<br />
                        -Realiza una breve descripción.<br />
                        -Asigna una o varias imágenes a este.<br />
                        -Especifica el horario y la fecha de cuando se llevará a cabo.<br />
                        -Fija la ubicación donde se desarrollará. <br />
                        Para tener un mayor alcance de usuarios que vean tu plan podrás variar el costo de la publicación y así determinar el rango de influencia o visibilidad que tendrás dentro del mapa al realizarla.
                        </p>
                     </BackSide>
                  </Flippy>
                </aside>  
            </div>
         </section>

         {/**************************    SECCION 3    *************************/}
          <div className="section">
             
            <div className={style.section3}>
               <ul>
                  <li> <img src={`${URL}public/images/recurso-5.png`} /></li>
                  <li> 
                     <h3>TODO LO QUE BUSCAS EN UN APP ESTA EN MUNEO</h3>
                     <img src={`${URL}public/images/recurso-3.png`} />
                  </li>
                  <li> <img src={`${URL}public/images/recurso-6.png`} /></li>
               </ul>
               <section>
                  <div className="slide"> <img src={`${URL}public/images/recurso-5.png`} /> </div>
                  <div className="slide"> <img src={`${URL}public/images/recurso-3.png`} /> </div>
                  <div className="slide"> <img src={`${URL}public/images/recurso-6.png`} /> </div>
               </section>
            </div>
            <footer>
               <ul>
                  <li>&#9400; Todos los derechos reservados 2018 <Link to="/terminos-condiciones">Términos y condiciones</Link></li>
               </ul>
               <ul>
                  <li><Link to="/"><Icon type="facebook" theme="outlined" /></Link></li>
                  <li><Link to="/"><Icon type="instagram" theme="outlined" /></Link></li>
                  <li><Link to="/"><Icon type="twitter" theme="outlined" /></Link></li>
                  <li><Link to="/"><Icon type="linkedin" theme="outlined" /></Link></li>
               </ul>
            </footer>
          </div>

        </div>
      );
   }
   renderModalEnviar(){
      const { modal } = this.state
      const { getFieldDecorator, validateFields } = this.props.form;
      const prefixSelector = getFieldDecorator('prefix', {
         initialValue: '57',
       }
      )(
         <Select style={{ width: 70 }}>
           <Option value="57">+57</Option>
           <Option value="1">+1</Option>
           <Option value="61">+61</Option>
           <Option value="33">+33</Option>
           <Option value="86">+86</Option>
           <Option value="852">+852</Option>
         </Select>
      );
      return(
         <Drawer
            open={modal}
            modalElementClass={style.modal}
         >
            <Icon type="close" theme="outlined" onClick={()=>this.setState({modal:false})} className={style.btnClose} />
            <section>
            <h3>Obten Muneo y empieza a crear planes con tus amigos</h3>
               <div>
                  <p>Descargar De</p>
                  <a href="https://play.google.com/store/apps/details?id=com.weplan" target="blank">
                     <Icon type="android" theme="filled" />
                  </a>
                  <a href="https://itunes.apple.com/us/app/muneo/id1421335318?ls=1&mt=8"  target="blank">
                     <Icon type="apple" theme="filled" />
                  </a>
               </div>
               <span className={style.separador}>O</span>

              
               <p>Enviar link a mi celular!</p>
               <Form onSubmit={(e)=>this.handleSubmit(e, validateFields)} className="login-form">
                  <FormItem
                        label="Telefono"
                     >
                     {getFieldDecorator('phone', {
                     rules: [{ required: true, message: 'Please input your phone number!' }],
                     })(
                     <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                     )}
                  </FormItem>
                  <Button type="primary" htmlType="submit">Enviar</Button>
               </Form>
            </section>
         </Drawer>
      )
   }
   render() {
      console.log(this.props.planes)
      return (
         <div>
            {this.renderContenido()}
            {this.renderModalEnviar()}
               
         </div>
      );
   }
   handleSubmit(e, validateFields){
      e.preventDefault()
      validateFields((err, values) => {
         if (!err) {
            let telefono = `${values.prefix}${values.phone}`
            
            axios.get(`/x/v1/user/enviarsms/${telefono}`)
            .then(e=>{
               console.log(e.data)
               if (e.data.code==1) {
                  notificacionExitosa('success')
               }else{
                  notificacionError('error')
               }
               
            })   
            .catch(err=>{
               console.log(err)
            })
         }
      });
   }



}

export default Form.create()(HomeComponent);




