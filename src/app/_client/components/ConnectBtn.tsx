"use client";

import Button from "@/app/_components/Button";

type Props = {
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
};

const ConnectBtn = ({ isConnected, connect, disconnect }: Props) => {
  
  const toggleConnect = () => {
    isConnected ? disconnect() : connect();
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
