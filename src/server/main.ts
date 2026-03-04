import { createServer, Socket } from "net";

const server = createServer((socket: Socket) => {
  console.log("Cliente conectado:", socket.remoteAddress, socket.remotePort);

  socket.on("data", (data: Buffer) => {
    const msg = data.toString();
    console.log("Mensagem recebida do cliente:", msg);
    const resposta = msg.split("").reverse().join("");
    socket.write(`${resposta}\n`);
  });

  socket.on("end", () => {
    console.log("Cliente desconectado");
  });

  socket.on("error", (err) => {
    console.error("Erro no socket:", err.message);
  });
});

server.listen(3300, () => {
  console.log("Servidor TCP escutando na porta 3300");
});
