import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
const reducer = (state, action)=>{
	if(action.type==='LOGIN') {
		return{
			...state,
		 	usuario:action.usuario,
		}
	}
	if (action.type==='PERFIL') {
		return{
			...state,
			perfil:action.perfil
		}
	}
	if (action.type==='OBTENER_USUARIOS') {
		return{
			...state,
			usuarios:action.usuarios
		}
	}
	if (action.type==='OBTENER_PLANES') {
		return{
			...state,
			planes:action.planes
		}
	}
	if (action.type==='OBTENER_RESTRICCION') {
		return{
			...state,
			restriccion:action.restriccion
		}
	}
	return state
}

const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}


export default createStore(reducer, { usuario:[], perfil:[],  usuarios:[], planes:[], restriccion:[] }, applyMiddleware(logger, thunk))