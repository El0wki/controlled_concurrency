"use client";

import Button from "@/app/_components/Button";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Socket } from "socket.io-client";

const ConnectBtn = ({ socket }: { socket: Socket }) => {
  const [isActive, setIsActive] = useState<boolean>(socket.active);

  useEffect(() => {
    const onConnect = () => {
      setIsActive(true);
      toast.success("Conectado!");
    };
    const onDisconnect = () => {
      setIsActive(false);
      toast.error("Desconectado!");
    };
    const onConnectError = (err: any) => {
      setIsActive(false);
      toast.error("Erro de conexão:" + err);
    };
    const onErro = (err: any) => {
      toast.error("Erro:" + err);
      setIsActive(false);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", onConnectError);
    socket.on("erro", onErro);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("connect_error", onConnectError);
      socket.off("erro", onErro);
    };
  }, [socket]);

  const toggleConnect = () => {
    isActive ? socket.disconnect() : socket.connect();
  };

  return (
    <>
      <span>
        Status:
        {isActive ? "🟢Conectado" : "🔴Desconectado"}
      </span>
      <br />
      <Button
        label={isActive ? "Desconectar" : "Conectar"}
        onClick={toggleConnect}
      />
    </>
  );
};

export default ConnectBtn;
