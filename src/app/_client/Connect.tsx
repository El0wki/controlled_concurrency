"use client";

import { useState } from "react";
import { Socket } from "socket.io-client";

const ConnectBtn = ({ socket }: { socket: Socket }) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const toggleConnect = () => {
    try {
      setIsActive(!socket.active);
      if (!socket.active) {
        socket.connect();
        return;
      }
      socket.disconnect();
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <span>
        Status:
        {isActive ? <span>🟢Conectado</span> : <span>🔴Desconectado</span>}
      </span>
      <br />
      <button
        onClick={toggleConnect}
        className="cursor-pointer hover:scale-105 duration-300 hover:bg-gray-500">
        {isActive ? <span>Desconectar</span> : <span>Conectar</span>}
      </button>
    </>
  );
};

export default ConnectBtn;
