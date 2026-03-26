import net from "net";
import { Worker, isMainThread, parentPort } from "worker_threads";
import { TCP_PORT, MAX_CONNECTIONS } from "../configs.ts";
import { fileURLToPath } from "url";

if (!isMainThread) {
  parentPort?.on("message", (input: string) => {
    parentPort?.postMessage(input.split("").reverse().join(""));
  });
} else {
  let activeConnections = 0;

  const server = net.createServer((socket) => {
    if (activeConnections >= MAX_CONNECTIONS) {
      socket.write("Servidor cheio. Tente novamente mais tarde.\n");
      socket.end();
      return;
    }

    activeConnections++;

    const worker = new Worker(fileURLToPath(import.meta.url), {
      workerData: {},
    });

    socket.on("data", (data) => {
      worker.postMessage(data.toString().trim());
    });

    worker.on("message", (reversed: string) => {
      socket.write(reversed + "\n");
    });

    worker.on("error", (err) => console.error(`[Worker] Erro:`, err));

    socket.on("end", () => {
      activeConnections--;
      worker.terminate();
    });

    socket.on("error", () => {
      activeConnections--;
      worker.terminate();
    });
  });

  server.listen(TCP_PORT, () => {
    console.log(
      `[TCP] Servidor CONCORRENTE (limite: ${MAX_CONNECTIONS}) na porta ${TCP_PORT}`,
    );
  });
}
