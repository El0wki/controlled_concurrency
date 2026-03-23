import { create } from "zustand";
import { io, Socket } from "socket.io-client";

type SocketStore = {
  socket: Socket | null;
  isConnected: boolean;
  connect: (userId: string) => void;
  disconnect: () => void;
};

export const useSocket = create<SocketStore>((set, get) => ({
  socket: null,
  isConnected: false,
  connect: (userId: string) => {
    if (get().socket) {
      get().socket?.disconnect();
    }
    const newSocket = io("http://localhost:5500", {
      autoConnect: false,
      reconnection: true,
      auth: { userId },
    });

    newSocket.on("connect", () => set({ isConnected: true }));
    newSocket.on("disconnect", () => set({ isConnected: false }));

    newSocket.connect();
    set({ socket: newSocket });
  },
  disconnect: () => {
    get().socket?.disconnect();
    set({ socket: null, isConnected: false });
  },
}));
