"use client";

import { useState } from "react";
import ConnectBtn from "./components/ConnectBtn";
import SendMessageBtn from "./components/SendMessageBtn";
import Button from "../_components/Button";
import UserForm from "./components/UserForm";
import { useSocket } from "./store/useSocket";

const ClientWrapper = () => {
  const { connect, isConnected, disconnect, sendMessage, messages } =
    useSocket();

  return (
    <>
      <ConnectBtn
        isConnected={isConnected}
        connect={connect}
        disconnect={disconnect}
      />

      {isConnected ? (
        <>
          <SendMessageBtn sendMessage={sendMessage} />
          <div className="bg-black text-green-400 p-16 min-h-200 rounded-sm">
            {messages.map((m, i) => (
              <div key={i}>
                [{m.type}] {m.message}
              </div>
            ))}
          </div>
        </>
      ) : null}
    </>
  );
};

export default ClientWrapper;
