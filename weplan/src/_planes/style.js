import {StyleSheet} from 'react-native';


export const PlanesStyle = StyleSheet.create({
	container:{
		 flex: 1,
	},
	plan1:{
		flexWrap: 'wrap', 
		alignItems: 'flex-end',
		flexDirection:'row',
		justifyContent: 'flex-end',
		marginBottom:20
	},
	boxPlan1:{
		backgroundColor:"rgba(189, 211, 238, 0.58)",
		alignItems: 'center',
		paddingTop:30,
		paddingBottom:30
	},
	planText1:{
		color:'#ffffff',
		fontSize:20
	},
	planText11:{
		color:'#ffffff',
		fontSize:80
	},
	container2:{
		alignItems: 'center',
		flexDirection:'row',
		justifyContent: 'center',
	},
	container3:{
		alignItems: 'center',
		flexDirection:'column',
		justifyContent: 'center',
	},
	plan2:{
		paddingTop:150,
		height:350,
		marginRight:10,
		width:'50%',
	},
	boxPlan2:{
		backgroundColor: '#7180E7',
		marginTop:100,
		alignItems: 'flex-start',
		flexDirection:'column',
		justifyContent: 'flex-start',
	},
	planText2:{
		color:'#ffffff',
		fontSize:18
	},
	planText22:{
		color:'#ffffff',
		fontSize:30
	},
	plan3:{
		paddingTop:100,
		marginBottom:15
	},
	planText3:{
		color:'#ffffff',
		fontSize:16
	},
	boxPlan3:{
		backgroundColor: '#E8A336',
	},
	plan4:{
		paddingTop:100
	},
	boxPlan4:{
		backgroundColor: '#BAE8FD',
	},
	planText4:{
		color:'#ffffff',
		fontSize:16
	},

})