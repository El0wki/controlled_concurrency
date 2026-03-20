"use client";

import Button from "@/app/_components/Button";
import { Socket } from "socket.io-client";

const SendMessageBtn = ({ socket }: { socket: Socket }) => {
  const onClick = () => {
    socket.emit("mensagem", "Olá", (resposta: string) => {
      console.log("Resposta do servidor:", resposta);
    });
  };
  return (
    <>
    
      <Button onClick={onClick} label="Enviar mensagem" />
    </>
  );
};

export default SendMessageBtn;
