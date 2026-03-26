# Controlled Concurrency — Servidor TCP com Concorrência Controlada

Projeto acadêmico desenvolvido para a disciplina **Sistemas Concorrentes e Distribuídos** da FAINOR, implementando um servidor TCP em três etapas evolutivas, com interface web para visualização em tempo real.

---

## Tecnologias

- **Node.js** + **TypeScript**
- **Next.js** + **React** (frontend)
- **Zustand** (gerenciamento de estado)
- **ws** (ponte WebSocket)
- **worker_threads** (concorrência)
- **TailwindCSS** (estilização)

---

## Arquitetura

```
Browser (WebSocket) → Ponte WS (porta 9000) → Servidor TCP (porta 6001)
```

Como browsers não suportam TCP diretamente, a ponte WebSocket faz a intermediação entre o frontend e o servidor TCP.

---

## Estrutura do Projeto

```
controlled_concurrency/
├── server/
│   ├── tcp-sequencial.ts       # Etapa 1 — servidor sequencial
│   ├── tcp-concorrente.ts      # Etapa 2 — concorrente com threads
│   ├── tcp-concorrente-8.ts    # Etapa 3 — concorrente com limite de 8
│   └── ws-server.ts            # Ponte WebSocket → TCP
├── src/
│   ├── app/
│   │   └── page.tsx            # Interface web
│   ├── store/
│   │   └── useSocket.ts        # Estado da conexão (Zustand)
│   └── configs.ts              # Portas e constantes
└── package.json
```

---

## Instalação

```bash
git clone https://github.com/El0wki/controlled_concurrency
cd controlled_concurrency
npm install
```

---

## Como Executar

### Etapa 1 — Node

É preciso o node na versão 24.14.0.

### Etapa 2 — install

É preciso rodar o comando npm install para instalação das dependências

### Etapa 3 — scripts

É preciso digitar qualquer um dos scripts de baixo para testes individuais do sistema.

## Scripts disponíveis para rodar os testes

| Script              | Descrição                                |
| ------------------- | ---------------------------------------- |
| `npm run dev:seq`   | Servidor TCP sequencial                  |
| `npm run dev:conc`  | Servidor TCP concorrente                 |
| `npm run dev:conc8` | Servidor TCP concorrente com limite de 8 |

---

## Funcionamento

1. Acesse `http://localhost:3000`
2. Clique em **Conectar**
3. Digite uma string no campo de entrada e pressione **Enter** ou clique em **Enviar**
4. A string invertida é exibida no log em tempo real

**Exemplo:**

```
Enviado:   "Hello World"
Recebido:  "dlroW olleH"
```

---

## Autores

- Matheus Souza Ramos
- Rafael Almeida Santos

**Disciplina:** Sistemas Concorrentes e Distribuídos — FAINOR  
**Professor:** Sâmela Rocha
