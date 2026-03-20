import { Server } from "socket.io";
import { createServer } from "http";

let activeConnections = 0;
const MAX_CONNECTIONS = 2;
const connectedUserIds = new Set<string>();

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
  const userId = socket.data.userId;

  if (activeConnections >= MAX_CONNECTIONS) {
    console.log("Limite de conexões atingido. Recusando nova conexão.");
    socket.emit(
      "erro",
      "Limite de conexões atingido. Tente novamente mais tarde.",
    );
    socket.disconnect();
    return;
  }

  if (connectedUserIds.has(userId)) {
    console.log(
      `UserId '${userId}' já está conectado. Recusando nova conexão.`,
    );
    socket.emit("erro", "Este userId já está em uso. Escolha outro.");
    socket.disconnect();
    return;
  }

  activeConnections++;
  connectedUserIds.add(userId);

  socket.join(`user:${userId}`);

  console.log(`Usuário [${userId}] conectado com socket [${socket.id}]`);

  socket.on("mensagem", (text: string, callback) => {
    const reverseText = text.split("").reverse().join("");
    callback(reverseText);
  });

  socket.on("disconnect", () => {
    activeConnections--;
    connectedUserIds.delete(userId);
    console.log(`Usuário [${userId}] desconectou`);
  });
});

server.listen(5500, () => {
  console.log("Servidor rodando na porta 5500");
});
