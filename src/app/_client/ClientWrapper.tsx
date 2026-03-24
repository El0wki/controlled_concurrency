"use client";

import { useState } from "react";
import ConnectBtn from "./components/ConnectBtn";
import SendMessageBtn from "./components/SendMessageBtn";
import Button from "../_components/Button";
import UserForm from "./components/UserForm";
import { useSocket } from "./store/useSocket";

const ClientWrapper = () => {
  const [userId, setUserId] = useState("");
  const { isConnected, connect, disconnect, socket } = useSocket();

  const handleConnect = () => {
    console.log("vray");
    connect();
  };

  const handleChangeUser = () => {
    if (isConnected) {
      disconnect();
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
    </>
  );
};

export default ClientWrapper;
