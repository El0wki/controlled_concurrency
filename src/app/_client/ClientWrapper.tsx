"use client";

import { io } from "socket.io-client";
import ConnectBtn from "./components/ConnectBtn";
import SendMessageBtn from "./components/SendMessageBtn";

const ClientWrapper = () => {
  const socket = io("http://localhost:5500", {
    autoConnect: false,
    reconnection: false,
    auth: {
      userId: "123",
    },
  });

  return (
    <>
      <SendMessageBtn socket={socket} />
      <ConnectBtn socket={socket} />
    </>
  );
};

export default ClientWrapper;
