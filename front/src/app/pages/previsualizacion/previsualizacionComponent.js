import React, { Component
}     from 'react';
import styles  from './previsualizacion.scss';


 const PrevisualizacionComponent = (props)=>{
 	let data = props.plan[0]
 	if (data!==undefined) {
 		return(
 			<div style={{backgroundImage: `url(${props.imagen[0].thumbUrl})`}}  className={styles.imagen}>
				<div className={styles.contenedor}>
					<div className={styles.menu}>
						<div>
							<img src='/public/img/icon1.png' className={styles.img1} />
						</div>
						<div>
							<img src='/public/img/icon2.png' className={styles.img2} />
						</div>
						<div>
							<img src='/public/img/icon3.png' className={styles.img3} />
						</div>
					</div>
					<div className={styles.footer}>
						<h1>{data.nombre}</h1>
						<h2>{data.descripcion}</h2>
						<div className={styles.iconos}>
							<img src='/public/img/icon6.png' />
							<img src='/public/img/icon7.png' />
						</div>
						<img src='/public/img/menu.png' />
					</div>
				</div>
			</div>
		)
 	}else{
 		return(null)
 	}
	
}
	
export default PrevisualizacionComponent