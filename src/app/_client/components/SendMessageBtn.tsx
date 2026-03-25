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
      <input onChange={(e) => setText(e.currentTarget.value)} value={text} />
      <Button label="Enviar mensagem" />
    </form>
  );
};

export default SendMessageBtn;
