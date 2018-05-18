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
		return axios.get('/x/v1/pla/plan')
	   .then(res=>{
   		dispatch({
   			type:'OBTENER_PLANES',
   			planes: res.data.planes
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
 
export {perfil, login, obtieneUsuarios, obtienePlan, obtieneRestriccion}



