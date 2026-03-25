import net from "net";
import { MAX_CONNECTIONS, TCP_PORT } from "../configs";

let activeConnections = 0;

const server = net.createServer((socket) => {
  if (activeConnections >= MAX_CONNECTIONS) {
    socket.write("Servidor cheio. Tente novamente mais tarde.\n");
    socket.end();
    return;
  }

  activeConnections++;

  socket.on("data", (data) => {
    const input = data.toString().trim();
    const reversed = input.split("").reverse().join("");
    socket.write(reversed + "\n");
  });

  socket.on("end", () => {
    activeConnections--;
  });

  socket.on("error", () => {
    activeConnections--;
  });
});

server.listen(TCP_PORT, () => {
  console.log(`[TCP] Servidor rodando na porta ${TCP_PORT}`);
});
