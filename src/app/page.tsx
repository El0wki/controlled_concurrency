import { clientes } from "@/data/clients";
import ClientWrapper from "./_client/ClientWrapper";

export default function Home() {
  return (
    <main>
      <ClientWrapper data={clientes} />
    </main>
  );
}
