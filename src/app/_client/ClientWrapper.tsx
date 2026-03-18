"use client";

import { useState } from "react";
import { io, Socket } from "socket.io-client";
import ConnectBtn from "./Connect";

const ClientWrapper = ({
  data,
}: {
  data: { cliente: string; mensagem: string }[];
}) => {
  const socket: Socket = io("http://localhost:5500", {
    autoConnect: false,
  });

  return (
    <>
      <ConnectBtn socket={socket} />
    </>
  );
};

export default ClientWrapper;
