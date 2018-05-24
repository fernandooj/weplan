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
const crearPlan= (data)=>{
	return dispatch=>{
		return axios.post('/x/v1/pla/plan', data)
	    .then(res=>{
	    	console.log(res.data)
	    	dispatch({
	   			type:'CREAR_PLAN',
	   			planCreado: res.data.message
	   		})
	   	})
	}
}
const insertaImagenPlan = (data) =>{
	console.log(data)
	return dispatch=>{
		return axios.put('x/v1/pla/plan/web', data)
		.then(res=>{
			console.log(res)
		})
	}
}
const obtienePlan = ()=>{
	return dispatch=>{
		return axios.get('/x/v1/pla/plan')
	    .then(res=>{
	   		dispatch({
	   			type:'OBTENER_PLANES',
	   			planes: res.data.planes
	   		})
	    })
	}
}
const obtieneUnPlan = (idPlan)=>{
	return dispatch=>{
		return axios.get(`/x/v1/pla/plan/getbyid/${idPlan}`)
	    .then(res=>{
	    	console.log(res)
	   		dispatch({
	   			type:'OBTENER_UN_PLAN',
	   			unPlan: res.data.message
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
   			restriccion: res.data.restriccion
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
   			categoria: res.data.categoria
   		})
	   })
	}
}
 
export {perfil, login, obtieneUsuarios, obtienePlan, obtieneRestriccion, obtieneCategoria, crearPlan, insertaImagenPlan, obtieneUnPlan}



