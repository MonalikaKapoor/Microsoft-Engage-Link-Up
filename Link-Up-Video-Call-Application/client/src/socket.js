//Importing Socket
import io from 'socket.io-client';
const sockets = io('https://linkup-video-call.herokuapp.com/', { autoConnect: true, forceNew: true });
// const sockets = io('http://localhost:3001');
export default sockets;
