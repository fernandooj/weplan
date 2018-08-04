import axios from 'axios'

 
const login = (values) =>{
	return dispatch=>{
		return axios.post('/x/v1/user/login', {username: values.username, password:values.password})
		.then(res=>{
			dispatch({
				type:'LOGIN',
				usuario:{usuario:res.data.user, code: res.data.code}
			})
		})
		.catch(err=>{
			dispatch({
				type:'ERROR_LOGIN',
				err
			})
		})
	}
}

const perfil = ()=>{
	return dispatch=>{
		return axios.get('/x/v1/user/profile')
		.then(res=>{
			dispatch({
				type:'PERFIL',
				perfil:res.data
			})
		})
		.catch(err=>{

		})
	}
}

const obtieneUsuarios = ()=>{
	return dispatch=>{
		return axios.get('/x/v1/users/')
	   .then(res=>{
   		dispatch({
   			type:'OBTENER_USUARIOS',
   			usuarios: res.data.usuarios
   		})
	   })
	}
}

const obtienePlan = ()=>{
	return dispatch=>{
		return axios.get('/x/v1/pla/plan/planesPublicos')
	    .then(res=>{
	   		dispatch({
	   			type:'OBTENER_PLANES',
	   			planes: res.data.plan
	   		})
	    })
	}
}
const obtieneUnPlan = (idPlan)=>{
	return dispatch=>{
		return axios.get(`/x/v1/pla/plan/getbyid/${idPlan}`)
	    .then(res=>{
	   		dispatch({
	   			type:'OBTENER_UN_PLAN',
	   			unPlan: res.data.plan
	   		})
	    })
	}
}

const obtieneRestriccion = ()=>{
	return dispatch=>{
		return axios.get('/x/v1/res/restriccion')
		.then(res=>{
			dispatch({
				type:'OBTENER_RESTRICCION',
				restricciones: res.data.restriccion
			})
		})
	}
}
const obtieneCategoria= ()=>{
	return dispatch=>{
		return axios.get('/x/v1/cat/categoriaPlan')
		.then(res=>{
			dispatch({
				type:'OBTENER_CATEGORIA',
				categorias: res.data.categoria
			})
		})
	}
}
const creaRestriccion= (data)=>{
	return dispatch=>{
		return axios.post('/x/v1/res/restriccion', data)
		.then(res=>{
			dispatch({
				type:'CREA_RESTRICCION',
				restriccion: res.data.restriccion
			})
		})
	}
}
const creaCategoria= (data)=>{
	return dispatch=>{
		return axios.post('/x/v1/cat/categoriaPlan', data)
		.then(res=>{
			console.log(res.data)
			dispatch({
				type:'CREA_CATEGORIA',
				categoria: res.data.categoria
			})
		})
	}
}
const crearPlan= (data)=>{
	return dispatch=>{
		return axios.post('/x/v1/pla/plan', data)
	    .then(res=>{
	    	dispatch({
	   			type:'CREAR_PLAN',
	   			plan: res.data.message
	   		})
	   	})
	}
}
const insertaImagenPlan = (data) =>{
	return dispatch=>{
		return axios.put('x/v1/pla/plan/web', data)
		.then(res=>{
			dispatch({
	   			type:'INSERTA_IMAGEN',
	   			plan: res.data.message
	   		})
		})
	}
}
 
export {perfil, login, obtieneUsuarios, obtienePlan, obtieneRestriccion, obtieneCategoria, crearPlan, insertaImagenPlan, obtieneUnPlan, creaRestriccion, creaCategoria}



