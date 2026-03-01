<div align="center">MRX.DEV

Portfolio Profissional de Engenharia de Software

  

Portfólio técnico orientado à arquitetura, performance e integração com IA generativa.

</div>

---

## 📌 Overview

O <b>MRX.DEV</b> é um portfólio profissional desenvolvido com foco em:

Arquitetura modular e escalável

Experiência de usuário moderna

Performance otimizada

Preparação nativa para integrações com IA


O projeto vai além de uma vitrine visual: ele demonstra decisões arquiteturais, organização de código e preparo para evolução contínua.


---

## 🏗️ Arquitetura da Aplicação

A aplicação segue princípios de:

Separação de responsabilidades

Componentização isolada

Tipagem explícita (TypeScript-first)

Camada de serviços desacoplada


Estrutura de Diretórios
```
/
├── src/
│   ├── App.tsx              # Componente raiz e orquestração de seções
│   ├── types.ts             # Definições de tipos e contratos
│   └── services/
│       └── genai.ts         # Camada de abstração para integração com IA
├── index.html               # Entry point
├── index.tsx                # Bootstrap da aplicação
└── metadata.json            # Configurações e permissões
```
A camada services/ permite evolução futura sem acoplamento direto à UI, garantindo escalabilidade horizontal da aplicação.


---

## 🚀 Funcionalidades

UI & Experiência

Layout 100% responsivo

Menu mobile off-canvas

Animações suaves e micro-interações

Design com Glassmorphism e backdrop-blur

Bloqueio de scroll durante navegação mobile


Conteúdo Técnico

Renderização dinâmica de Markdown via react-markdown

Case studies estruturados

Visualização interativa de skills (Skill HUD)


Preparação para IA

Infraestrutura pronta para integração com modelos Gemini

Arquitetura preparada para chatbot e assistentes técnicos

Estrutura compatível com processamento multimodal



---

## 🛠️ Stack Tecnológico

Core

React 19 — Arquitetura baseada em Hooks modernos

TypeScript — Tipagem estrita e previsibilidade estrutural

Vite (ESM) — Build rápido e ambiente leve


UI / Design System

Tailwind CSS — Estilização utility-first

Lucide React — Biblioteca de ícones leve

Design baseado em paleta Zinc/Slate com acentos Indigo e Emerald


Integração & Dados

@google/genai — SDK oficial para modelos Gemini

react-markdown — Renderização segura de conteúdo estruturado



---

## 🤖 Integração com IA

A aplicação possui uma camada dedicada em services/genai.ts, projetada para suportar expansão funcional.

Possíveis extensões:

1. AI Chatbot
Assistente para navegação técnica pelo portfólio.


2. Architecture Advisor
Discussão de decisões arquiteturais com modelos de maior capacidade de raciocínio.


3. Análise de Tendências
Integração com ferramentas de busca para insights em tempo real.


4. Processamento Multimodal
Análise e geração de imagens utilizando modelos compatíveis.




---

## ⚙️ Setup & Execução

## 1. Clone o repositório
```bash
git clone https://github.com/Shadw-Developer/meu-portifolio.git
```
## 2. Instale as dependências
```bash
npm install
```
## 3. Configure variáveis de ambiente (opcional)

Crie um arquivo .env na raiz do projeto:
```env
API_KEY=sua_chave_aqui
```
Necessário apenas para funcionalidades relacionadas à IA.

4. Execute o ambiente de desenvolvimento
```bash
npm run dev
```

---

## 🎯 Decisões Técnicas Relevantes

1. Modularização

Separação clara entre UI, tipagens e serviços, permitindo manutenção previsível.

2. Tipagem Estrita

Interfaces centralizadas em types.ts reduzem ambiguidade e melhoram a escalabilidade.

3. Performance

Uso de Vite + ESM para build rápido e menor overhead.

4. UX Mobile-First

O fluxo mobile foi tratado como prioridade estrutural, não adaptação posterior.


---

## 📈 Escalabilidade Futura

O projeto está preparado para:

Migração para arquitetura orientada a features

Implementação de testes automatizados (Vitest / Testing Library)

Integração com backend próprio ou BFF

Deploy em edge (Vercel / Cloudflare)



---

<div align="center">Desenvolvido por Alisson (@mrx_dev)

</div>
