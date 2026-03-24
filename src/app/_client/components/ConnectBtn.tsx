"use client";

import Button from "@/app/_components/Button";

type Props = {
  socket: WebSocket;
};

const ConnectBtn = ({ socket }: Props) => {
  const isConnected = socket.readyState === WebSocket.OPEN;

  const toggleConnect = () => {
    if (isConnected) {
      socket.close();
    } else {
      alert("Para conectar novamente, clique em 'Entrar' na tela principal.");
    }
  };

  return (
    <>
      <span>
        Status:
        {isConnected ? "🟢Conectado" : "🔴Desconectado"}
      </span>
      <br />
      <Button
        label={isConnected ? "Desconectar" : "Conectar"}
        onClick={toggleConnect}
      />
    </>
  );
};

export default ConnectBtn;
