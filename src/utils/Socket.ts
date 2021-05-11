import { io, Socket } from 'socket.io-client';
import * as Shared from '../common/Shared';

export interface gameSettings {
  villager: number;
  werewolf: number;
  oldMan?: boolean;
  seer?: boolean;
  fool?: boolean;
  hunter?: boolean;
  bodyguard?: boolean;
  witch?: boolean;
  alphawolf?: boolean;
  mysticwolf?: boolean;
}

const SocketEndpoint = 'http://192.168.1.103:7000';
let socket: Socket;
export const initiateSocket = (name: string) => {
  socket = io(SocketEndpoint, {
    autoConnect: false,
    query: {
      username: name,
    },
  });
  // console.log(`Connecting socket...`);
  // if (socket) socket.connect();
};

export const connectSocket = () => {
  if (socket) socket.connect();
  else console.error('Can not connect server due to the socket is not initilization');
};

export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if (socket) socket.disconnect();
  else console.error('Can not disconnect server due to the socket is not initilization');
};

//TODO  change msg to data and should be optional, and on the server side should have a data schemal
export const onEventWithCB = (eventName: string, cb: (data?: any) => void) => {
  if (socket)
    socket.on(eventName, (data) => {
      cb(data);
    });
};

export const emitEvent = (eventName: string) => {
  if (socket) socket.emit(eventName);
};
export const emitEventWithData = (eventName: string, data: gameSettings) => {
  if (socket) socket.emit(eventName, data);
};

export const connectError = () => {
  if (socket) {
    socket.on('connect_error', (error) => {
      console.log('Error encountered while trying to establish socket.io connection: ' + error);
    });
  }
};

export const joinRoom = (room: string, name: string) => {
  console.log(name, ' joining the room ', room);
  if (socket && room && name) {
    socket.emit('join', { room, name });
  }
};
