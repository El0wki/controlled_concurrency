import { Server } from "socket.io";
import { createServer } from "http";
let activeConnections = 0;
const MAX_CONNECTIONS = 2;

const server = createServer();

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.use((socket, next) => {
  const userId = socket.handshake.auth.userId;

  if (!userId) {
    return next(new Error("ID de usuário inválido"));
  }

  socket.data.userId = userId;
  next();
});

io.on("connection", (socket) => {
  if (activeConnections >= MAX_CONNECTIONS) {
    console.log("Limite de conexões atingido. Recusando nova conexão.");
    socket.emit(
      "erro",
      "Limite de conexões atingido. Tente novamente mais tarde.",
    );
    socket.disconnect();
    return;
  }
  activeConnections++;

  const userId = socket.data.userId;

  socket.join(`user:${userId}`);

  console.log(`Usuário [${userId}] conectado com socket [${socket.id}]`);

  socket.on("mensagem", (text: string, callback) => {
    const reverseText = text.split("").reverse().join("");
    callback(reverseText);
  });

  socket.on("disconnect", () => {
    activeConnections--;
    console.log(`Usuário [${userId}] desconectou`);
  });
});

server.listen(5500, () => {
  console.log("Servidor rodando na porta 5500");
});
