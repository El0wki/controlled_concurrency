import net from "net";

const PORT = 6000;

let activeConnections = 0;
const MAX_CONNECTIONS = 8;

const server = net.createServer((socket) => {
  if (activeConnections >= MAX_CONNECTIONS) {
    socket.write("Servidor cheio. Tente novamente mais tarde.\n");
    socket.end();
    return;
  }
  activeConnections++;
  console.log(`Cliente conectado! Conexões ativas: ${activeConnections}`);

  socket.on("data", (data) => {
    const input = data.toString().trim();
    const reversed = input.split("").reverse().join("");
    socket.write(reversed + "\n");
  });

  socket.on("end", () => {
    activeConnections--;
    console.log(`Cliente desconectado. Conexões ativas: ${activeConnections}`);
  });

  socket.on("error", () => {
    activeConnections--;
    console.log(`Erro na conexão. Conexões ativas: ${activeConnections}`);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor TCP rodando na porta ${PORT}`);
});
