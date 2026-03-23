"use client";

import Button from "@/app/_components/Button";
import toast from "react-hot-toast";
import { Socket } from "socket.io-client";

const ConnectBtn = ({ socket }: { socket: Socket }) => {
  const toggleConnect = () => {
    socket.connected ? socket.disconnect() : socket.connect();
  };

  return (
    <>
      <span>
        Status:
        {socket.connected ? "🟢Conectado" : "🔴Desconectado"}
      </span>
      <br />
      <Button
        label={socket.connected ? "Desconectar" : "Conectar"}
        onClick={toggleConnect}
      />
    </>
  );
};

export default ConnectBtn;
