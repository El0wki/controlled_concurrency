"use client";

import ConnectBtn from "./components/ConnectBtn";
import SendMessageBtn from "./components/SendMessageBtn";
import { useSocket } from "./store/useSocket";

const ClientWrapper = () => {
  const { connect, isConnected, disconnect, sendMessage, messages } =
    useSocket();

  const box = () => {
    return (
      <>
        <SendMessageBtn sendMessage={sendMessage} />
        <div className="bg-black text-green-400 p-16  rounded-sm">
          {messages.map((message, index) => (
            <div key={index}>
              [{message.type}] {message.message}
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="bg-white w-max p-12 rounded-xl flex flex-col">
      <ConnectBtn
        isConnected={isConnected}
        connect={connect}
        disconnect={disconnect}
      />

      {isConnected ? box() : null}
    </div>
  );
};

export default ClientWrapper;
