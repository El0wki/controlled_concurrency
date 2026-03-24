"use client";

import Button from "@/app/_components/Button";
import { useState, useEffect } from "react";

type Props = {
  socket: WebSocket;
};

const SendMessageBtn = ({ socket }: Props) => {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      setResponse(event.data);
    };
    socket.addEventListener("message", handleMessage);
    return () => {
      socket.removeEventListener("message", handleMessage);
    };
  }, [socket]);

  const onClick = () => {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(text);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input onChange={(e) => setText(e.currentTarget.value)} value={text} />
      <Button onClick={onClick} label="Enviar mensagem" />
      {response && (
        <div>
          <strong>Resposta do servidor:</strong> {response}
        </div>
      )}
    </form>
  );
};

export default SendMessageBtn;
