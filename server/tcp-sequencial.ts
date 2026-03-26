import net from "net";
import { TCP_PORT } from "../configs";

let isProcessing = false;
const queue: net.Socket[] = [];

const processNext = () => {
  if (isProcessing || queue.length === 0) return;
  isProcessing = true;

  const socket = queue.shift()!;
  console.log(`[TCP] Atendendo cliente. Na fila: ${queue.length}`);

  socket.on("data", (data) => {
    const input = data.toString().trim();
    const reversed = input.split("").reverse().join("");
    socket.write(reversed + "\n");
  });

  socket.on("end", () => {
    isProcessing = false;
    processNext();
  });

  socket.on("error", () => {
    isProcessing = false;
    processNext();
  });
};

const server = net.createServer((socket) => {
  queue.push(socket);
  if (isProcessing) {
    socket.write(
      `Aguardando atendimento. Você está na posição ${queue.length} da fila.\n`,
    );
  }
  processNext();
});

server.listen(TCP_PORT, () => {
  console.log(`[TCP] Servidor SEQUENCIAL rodando na porta ${TCP_PORT}`);
});
