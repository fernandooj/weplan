import SocketIOClient from 'socket.io-client';
import {URL} from './App.js'

const socket = SocketIOClient('http://159.89.141.0:8080/');


// const SOCKET_URL = window.location.origin
// const socket = io.connect(process.env.SOCKET_URL);

export default socket;