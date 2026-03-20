"use client";

import { useState } from "react";
import { io, Socket } from "socket.io-client";
import ConnectBtn from "./components/ConnectBtn";
import SendMessageBtn from "./components/SendMessageBtn";
import Button from "../_components/Button";
import UserForm from "./components/UserForm";

const ClientWrapper = () => {
  const [userId, setUserId] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);

  const handleConnect = () => {
    const newSocket = io("http://localhost:5500", {
      autoConnect: false,
      reconnection: true,
      auth: { userId },
    });
    setSocket(newSocket);
  };

  const handleChangeUser = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
    setUserId("");
  };

  const button = socket ? (
    <Button label="Trocar usuário" onClick={handleChangeUser} />
  ) : (
    <Button onClick={handleConnect} disabled={!userId} label="Entrar" />
  );
  return (
    <>
      <UserForm
        formBtn={button}
        inputProps={{
          id: "userid",
          value: userId,
          onChange: (e) => setUserId(e.target.value),
          placeholder: "Digite o userId",
          disabled: !!socket,
        }}
      />

      {socket ? (
        <>
          <ConnectBtn socket={socket} />
          {socket.active ? <SendMessageBtn socket={socket} /> : null}
        </>
      ) : null}
    </>
  );
};

export default ClientWrapper;
