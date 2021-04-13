import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { io } from 'socket.io-client';

const SocketEndpoint = 'http://localhost:7000';

export default function Lobby() {
    const [isConnected, setIsConnected] = useState(false);
    const [data, setData] = useState([]);
    useEffect(()=>{
      const socket = io(SocketEndpoint, {
        transports: ['websocket'],
      });
  
      socket.on('connect', () => {
        setIsConnected(true);
        console.log(socket.id); 
      });
  
      socket.on('ping', (data) => {
        setData(data);
      });

      // return () => socket.disconnect();
    },[]);
    return(
      <View></View>
    );

};
