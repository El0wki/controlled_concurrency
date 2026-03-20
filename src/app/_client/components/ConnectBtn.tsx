"use client";

import { useState } from "react";
import { Socket } from "socket.io-client";

const ConnectBtn = ({ socket }: { socket: Socket }) => {
  const [isActive, setIsActive] = useState<boolean>(socket.active);

  const toggleConnect = () => {
    if (!isActive) {
      socket.connect();
      setIsActive(!isActive);
      return null;
    }
    socket.disconnect();
    setIsActive(!isActive);
  };

  socket.on("connect", () => {
    setIsActive(true);
  });

  socket.on("connect_error", (err) => {
    setIsActive(false);
    alert("Erro:" + err);
  });

  socket.on("erro", () => {
    console.log("err");
    setIsActive(false);
  });

  return (
    <>
      <span>
        Status:
        {isActive ? "🟢Conectado" : "🔴Desconectado"}
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
