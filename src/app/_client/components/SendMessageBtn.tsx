"use client";

import Button from "@/app/_components/Button";
import { useState } from "react";
import { Socket } from "socket.io-client";

const SendMessageBtn = ({ socket }: { socket: Socket }) => {
  const [text, setText] = useState<string>("");

  const onClick = () => {
    socket.emit("mensagem", text, (resposta: string) => {
      console.log("Resposta do servidor:", resposta);
    });
  };
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        onChange={(e) => {
          setText(e.currentTarget.value);
        }}
        value={text}
      />
      <Button onClick={onClick} label="Enviar mensagem" />
    </form>
  );
};

export default SendMessageBtn;
