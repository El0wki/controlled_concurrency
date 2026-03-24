"use server";

import { create } from "zustand";
import { PORT } from "@/configs";
import { createConnection, Socket } from "net";

type SocketStore = {
  socket: Socket | null;
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
  sendMessage: (msg: string) => void;
};

export const useSocket = create<SocketStore>((set, get) => ({
  socket: null,
  isConnected: false,
  connect: () => {
    if (get().socket) {
      get().socket?.end();
    }
    const client = createConnection({ port: PORT }, () => {});

    client.on("connect", () => {
      set({ isConnected: true });
    });
    client.on("error", () => {
      set({ isConnected: false, socket: null });
    });

    client.on("end", () => {
      set({ isConnected: false });
    });

    set({ socket: client });
  },
  disconnect: () => {
    const client = get().socket;
    if (client) {
      client.end(); // encerra a conexão TCP
      set({ socket: null, isConnected: false });
    }
  },
  sendMessage: (msg: string) => {
    const client = get().socket;
    if (client && client.writable) {
      client.write(msg + "\n");
    }
  },
}));
