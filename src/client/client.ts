import { Socket } from "net";

const clientes = [
  {
    cliente: "Marcos Silva",
    mensagem: "Hoje comprei pão na padaria do bairro.",
  },
  {
    cliente: "Ana Souza",
    mensagem: "Preciso marcar uma consulta para amanhã.",
  },
  {
    cliente: "Carlos Oliveira",
    mensagem: "Gostaria de saber o preço do produto.",
  },
  { cliente: "Fernanda Lima", mensagem: "Vocês entregam no meu endereço?" },
  { cliente: "Ricardo Santos", mensagem: "Meu pedido ainda não chegou." },
  { cliente: "Juliana Costa", mensagem: "Quero cancelar minha assinatura." },
  {
    cliente: "Bruno Almeida",
    mensagem: "Tem desconto para pagamento à vista?",
  },
  { cliente: "Patrícia Gomes", mensagem: "Obrigado pelo ótimo atendimento!" },
  { cliente: "Lucas Pereira", mensagem: "O site está apresentando erro." },
  { cliente: "Camila Rocha", mensagem: "Pode me enviar mais informações?" },
];

const client = new Socket();
let index = 0;

client.connect(3300, "127.0.0.1", () => {
  console.log("Conectado ao servidor!");
  enviarMensagem();
});

client.on("data", (data: string) => {
  const msg = data.toString();

  const original = clientes[index].mensagem;
  console.log(msg);
  if (original[index] == msg[index]) {
    console.log("Inversão correta!");
  } else {
    console.log("Inversão incorreta!");
  }

  index++;
  if (index < clientes.length) {
    setTimeout(enviarMensagem, 500);
  } else {
    client.end();
  }
});

client.on("close", () => {
  console.log("Conexão encerrada");
});

client.on("error", (err) => {
  console.error("Erro:", err.message);
});

function enviarMensagem() {
  const cliente = clientes[index];
  client.write(`${cliente.mensagem}\n`);
}
