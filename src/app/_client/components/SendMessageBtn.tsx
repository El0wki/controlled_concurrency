"use client";

import { Socket } from "socket.io-client";

const SendMessageBtn = ({ socket }: { socket: Socket }) => {
  const onClick = () => {
    socket.emit("mensagem", "Olá", (resposta: string) => {
      console.log("Resposta do servidor:", resposta);
    });
  };
  return (
    <>
      <button onClick={onClick}>ALOU</button>
    </>
  );
};

export default SendMessageBtn;
