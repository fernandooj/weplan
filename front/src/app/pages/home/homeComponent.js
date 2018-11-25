// @flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import {Jumbotron}    from '../../components';
import { Link }       from 'react-router-dom';
import style         from './home.scss';
import {connect}      from 'react-redux'

import store        from '../../redux/store.js'
import {Icon, Input, Button,  Form, Select, notification} from 'antd';
import {URL} from "../../index.js"
import 'antd/dist/antd.css'; 
import ReactFullpage from "@fullpage/react-fullpage";
import PreloadImage from 'react-preload-image'
import Drawer from 'react-drag-drawer'
import {Animated} from "react-animated-css";
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import axios from 'axios'
import Slider from "react-slick";

const fullpageOptions = {
  anchors: ["weplan", "secondPage", "thirdPage"],
  sectionsColor: ["#ffffff", "#ffffff", "#ffffff"],
  callbacks: ["onLeave", "afterLoad"],
  scrollOverflow: true
};
const FormItem = Form.Item;
const settings = {
   dots: true,
   infinite: true,
   speed: 500,
   slidesToShow: 1,
   slidesToScroll: 1
};

const Menu = ()=>{
   const logo = URL+'public/images/logo.png'
   return(
      <div className={style.navegacion}>
         <img src={logo} className={style.logo} />
         <ul className={style.menu2}>
            <li><Link to="/">Weplan</Link></li>
            <li><Link to="/">Posiciones</Link></li>
            <li><Link to="/">Contacto</Link></li>
            <li><Link to="/acceso" className={style.cuentaBtn}>Cuenta</Link></li>
         </ul>
      </div>
   )   
}
const FullpageWrapper = fullpageProps => (
   <ReactFullpage
   {...fullpageProps}
      render={({ state, fullpageApi }) => {
      // console.log("render prop change", state);

      if (state.callback === "onLeave") {
        if (state.direction === "down") {
          console.log("going down..." + state.origin.index);
        }
      }
      const logo = URL+'public/images/logo.png'
      return (
        <div id="fullpage-wrapper">
         {/**************************    SECCION 1    *************************/}
          <header className="section section1">
            <PreloadImage
              className={style.banner}
              src={`${URL}public/images/banner.jpg`}
              lazy
            />

         {/***   MENU NAVEGACION   ***/}
            <nav className={style.navigator}> 
               <img src={logo} className={style.logo} />
               <ul className={style.menu}>
                  <li><Link to="/">Weplan</Link></li>
                  <li><Link to="/">Posiciones</Link></li>
                  <li><Link to="/">Contacto</Link></li>
                  <li><Link to="/acceso" className={style.cuentaBtn}>Cuenta</Link></li>
               </ul>
            </nav>

         {/***   SECCION IZQUIERDA   ***/}
            <Animated animationIn="bounceInLeft" animationInDelay={1000} isVisible={true}>
               <div className={style.contenedorBannerIzq}>
                  <h2>WePlan es la nueva forma de realizar todos tus planes</h2>
                  <div onClick={()=>fullpageProps.modal()} className={style.btnDescargar}> Descargar</div> 
                  <Icon type="android" theme="filled" />
                  <Icon type="apple" theme="filled" />
               </div>
            </Animated>
         
         {/***   SECCION DERECHA   ***/}
            <div className={style.contenedorBanner}>
               <Animated animationIn="bounceInRight" animationInDelay={2000} isVisible={true}>
                    <img src={`${URL}public/images/cel-banner.png`} />
               </Animated>
               <Animated animationIn="bounceInRight"animationInDelay={2500} isVisible={true}>
                    <h1>Weplan <br/>¡Un mar de <br/>posibilidades!</h1>
               </Animated>
            </div>
               {/*<button onClick={() => fullpageApi.moveSectionDown()}></button>*/}

          </header>

         {/**************************    SECCION 2    *************************/}
          <section className={"section"}>
            <Menu />
            <div className={style.section2}>
               <h2>¡WePlan, un mar de posibilidad para crear tus planes!</h2>
               <p>WePlan es la nueva forma de realizar todos tus planes, dividir costos y controlar todos los gastos que compartes con tus amigos de manera más fácil y practica… el único límite es tu imaginación.</p>
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
                     <p>¿Tienes un nuevo plan? ¿Has tenido dificultades organizando tus planes? Con WePlan puedes organizar mejor estas geniales ideas!<br />
                     -Crea un nombre<br />
                     -Asígnale una imagen<br />
                     -Fija un horario<br />
                     -Especifica la ubicación donde se desarrollará<br />
                     -Invita a tus amigos y empieza a disfrutar de las mejores experiencias con WePlan!<br />
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
                       <p> WePlan te da la posibilidad de conocer mejor a tus amigos, crea encuestas para tomar mejores decisiones en tus planes y que todos estén de acuerdo. Así podrás asegurarte que no hayan errores en tu plan!</p>
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
                       <p> Con la Billetera WePlan ya no te tienes que preocupar por tus gastos, visualiza el registro de todos los costos en los que has incurrido en los diferentes planes, con qué personas los has compartido y el saldo de estos. WePlan es tu mejor amigo para ayudarte a controlar tus gastos.</p>
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
                       <p> WePlan te permite explorar sugerencias de planes que crean diferentes usuarios en la sección del Home. Explora y conoce diferentes planes en el sitio donde te encuentres y ¡vive experiencias nuevas todos los días! Disfruta nuevas culturas, ideas, lugares y amigos que puedas encontrarte mientras usas WePlan.<br />

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
            <Menu />
            <div className={style.section3}>
               <ul>
                  <li> <img src={`${URL}public/images/recurso-5.png`} /></li>
                  <li> 
                     <h3>TODO LO QUE BUSCAS EN UN APP ESTA EN WEPLAN</h3>
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
    }}
  />
);


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
   state = {open:false}
 
   render() {
      const { open } = this.state
      const { getFieldDecorator, validateFields } = this.props.form;
      const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '57',
       })(
         <Select style={{ width: 70 }}>
           <Option value="57">+57</Option>
           <Option value="1">+1</Option>
           <Option value="61">+61</Option>
           <Option value="33">+33</Option>
           <Option value="86">+86</Option>
           <Option value="852">+852</Option>
         </Select>
       );
      return (
         <div>
            <FullpageWrapper {...fullpageOptions} modal={()=>this.setState({open:true})} />
               <Drawer
                  open={open}
                  modalElementClass={style.modal}
               >
               <Icon type="close" theme="outlined" onClick={()=>this.setState({open:false})} className={style.btnClose} />
               <div>
                  <h3>Obten weplan y empieza a crear planes con tus amigos</h3>
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
               </div>
             </Drawer>
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
      // console.log(value)
      // console.log(e)
   }



}

export default Form.create()(HomeComponent);




