import { Server } from "socket.io";
import { createServer } from "http";

const server = createServer();

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Usuário conectado " + socket);

  socket.on("disconnect", () => {
    console.log("Usuário desconectado");
  });
});

server.listen(5500, () => {
  console.log("Servidor rodando na porta 3000");
});
