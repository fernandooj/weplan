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
	if (action.type==='OBTENER_UN_PLAN') {
		return{
			...state,
			unPlan:action.unPlan
		}
	}
	if (action.type==='OBTENER_RESTRICCION') {
		return{
			...state,
			restricciones:action.restricciones
		}
	}
	if (action.type==='OBTENER_CATEGORIA') {
		return{
			...state,
			categorias:action.categorias
		}
	}
	if (action.type==='OBTENER_PLANES') {
		return{
			...state,
			planes:action.planes
		}
	}
	if (action.type==='CREAR_PLAN') {
		return{
			...state,
			plan:action.plan
		}
	}
	if (action.type==='INSERTA_IMAGEN') {
		return{
			...state,
			planes:[action.plan, ...state.planes]
		}
	}
	if (action.type==='CREA_RESTRICCION') {
		return{
			...state,
			restricciones:[action.restriccion, ...state.restricciones]
		}
	}
	if (action.type==='CREA_CATEGORIA') {
		return{
			...state,
			categorias:[action.categoria, ...state.categorias]
		}
	}
	if (action.type==='CREAR_PAGO') {

		return{
			...state,
			usuarios:state.usuarios.filter(e=>{
				if (e.id==action.nuevoPago.userId) {e.saldo=action.nuevoSaldo+e.saldo}
					return e
			})
		}
	}
	return state
}

const logger = store => next => action => {
  //console.log('dispatching', action)
  let result = next(action)
  //console.log('next state', store.getState())
  return result
}


export default createStore(reducer, { usuario:[], perfil:[], usuarios:[], planes:[], restriccion:[], categoria:[], categorias:[], 
	categoriaCreada:[], unPlan:[], restricciones:[]}, applyMiddleware(logger, thunk))