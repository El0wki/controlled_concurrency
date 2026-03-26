import net from "net";
import { Worker, isMainThread, parentPort } from "worker_threads";
import { TCP_PORT } from "../configs.ts";
import { fileURLToPath } from "url";

if (!isMainThread) {
  parentPort?.on("message", (input: string) => {
    parentPort?.postMessage(input.split("").reverse().join(""));
  });
} else {
  const server = net.createServer((socket) => {
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

    socket.on("end", () => worker.terminate());
    socket.on("error", () => worker.terminate());
  });

  server.listen(TCP_PORT, () => {
    console.log(`[TCP] Servidor CONCORRENTE rodando na porta ${TCP_PORT}`);
  });
}
