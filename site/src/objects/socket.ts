import React  from 'react';
import { io } from "socket.io-client";
import { ENDPOINT, ENDPOINT_LOCAL}  from "./constants";

export const socket = io(ENDPOINT);
export const SocketContext = React.createContext(socket);
   
