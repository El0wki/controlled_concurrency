import { WebSocketServer } from "ws";
import net from "net";
import { createServer } from "http";
import { TCP_PORT, WS_PORT } from "../configs";

const httpServer = createServer();
const wss = new WebSocketServer({ server: httpServer });

wss.on("connection", (ws) => {
  const tcpClient = net.connect(TCP_PORT, "127.0.0.1", () => {
    ws.send(JSON.stringify({ type: "status", message: "Conectado ao TCP" }));
  });

  ws.on("message", (msg) => tcpClient.write(msg.toString() + "\n"));

  tcpClient.on("data", (data) => {
    ws.send(
      JSON.stringify({ type: "message", message: data.toString().trim() }),
    );
  });

  ws.on("close", () => tcpClient.end());
  ws.on("error", () => tcpClient.end());
  tcpClient.on("end", () => ws.close());
  tcpClient.on("error", (err) => {
    ws.send(JSON.stringify({ type: "error", message: err.message }));
    ws.close();
  });
});

httpServer.listen(WS_PORT, () => {});
