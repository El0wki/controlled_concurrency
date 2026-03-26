"use client";

import Button from "@/app/_components/Button";
import { useState } from "react";

type Props = {
  sendMessage: (msg: string) => void;
};

const SendMessageBtn = ({ sendMessage }: Props) => {
  const [text, setText] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage(text);
      }}>
      <input
        className="rounded-lg border-1 p-2"
        onChange={(e) => setText(e.currentTarget.value)}
        placeholder="Digite sua mensagem..."
        value={text}
      />
      <Button label="Enviar mensagem" />
    </form>
  );
};

export default SendMessageBtn;
