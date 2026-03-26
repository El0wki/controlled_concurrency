"use client";

import { WS_PORT } from "../../../../configs";
import { create } from "zustand";

type Message = {
  type: "status" | "message" | "error";
  message: string;
};

type SocketStore = {
  socket: WebSocket | null;
  isConnected: boolean;
  messages: Message[];
  connect: () => void;
  disconnect: () => void;
  sendMessage: (msg: string) => void;
};

export const useSocket = create<SocketStore>((set, get) => ({
  socket: null,
  isConnected: false,
  messages: [],

  connect: () => {
    get().socket?.close();
    const ws = new WebSocket("ws://localhost:" + WS_PORT);

    ws.onopen = () => set({ isConnected: true });
    ws.onmessage = (e) => {
      const data: Message = JSON.parse(e.data);
      set((s) => ({ messages: [...s.messages, data] }));
    };
    ws.onerror = () => set({ isConnected: false, socket: null });
    ws.onclose = () => set({ isConnected: false, socket: null });

    set({ socket: ws });
  },

  disconnect: () => {
    get().socket?.close();
    set({ socket: null, isConnected: false });
  },

  sendMessage: (msg) => {
    const ws = get().socket;
    if (ws?.readyState === WebSocket.OPEN) ws.send(msg);
  },
}));
