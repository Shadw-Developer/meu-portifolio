<div align="center">

# MRX.DEV | Portfolio Profissional

![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

> **Portfólio de Engenharia de Software** focado em demonstrar solidez arquitetural, UX moderna e integração com tecnologias emergentes.
> 
Este projeto é a representação digital de **Alisson (@mrx_dev)**, Engenheiro Full Stack Sênior. A aplicação foi construída com foco em **performance**, **acessibilidade** e uma estética **minimalista/futurista**.

---

## 🚀 Funcionalidades Chave

*   **Design Responsivo & Fluido:** Layout adaptativo com menu mobile "off-canvas" e animações suaves.
*   **Case Studies Dinâmicos:** Renderização de detalhes técnicos de projetos utilizando Markdown (`react-markdown`) para formatação rica.
*   **Skill HUD:** Visualização interativa de competências técnicas.
*   **Arquitetura Modular:** Componentização clara e separação de responsabilidades.
*   **AI-Ready Infrastructure:** Camada de serviço (`services/genai.ts`) pré-configurada para integração com o **Google Gemini API** (Modelos Pro, Flash e Vision).

---

## 🛠️ Stack Tecnológico

### Core
*   **React 19:** Utilizando as últimas features como Hooks modernos e melhorias de renderização.
*   **TypeScript:** Tipagem estrita para garantir robustez e manutenibilidade do código.
*   **Vite/ESM:** Build tool de alta performance (implícito na estrutura).

### UI/UX
*   **Tailwind CSS:** Abordagem *utility-first* para estilização rápida e consistente.
*   **Lucide React:** Biblioteca de ícones leve e customizável.
*   **Glassmorphism:** Uso intensivo de `backdrop-blur` e transparências para uma estética premium.

### Integração & Dados
*   **@google/genai:** SDK oficial para integração com modelos Gemini 1.5/Pro.
*   **React Markdown:** Para renderização segura de conteúdo rico nos cards de projetos.

---

## 📂 Estrutura do Projeto

```bash
/
├── src/
│   ├── App.tsx           # Componente Raiz e orquestrador de seções
│   ├── types.ts          # Definições de tipos (TypeScript Interfaces/Enums)
│   └── services/
│       └── genai.ts      # Camada de abstração para Google Gemini API
├── index.html            # Entry point com importmap
├── index.tsx             # Bootstrap da aplicação React
└── metadata.json         # Configurações de permissões e metadados
```

---

## 🤖 Integração com IA (Google Gemini)

O projeto possui uma camada de serviço dedicada em `services/genai.ts` preparada para expandir a interatividade do portfólio. As funcionalidades mapeadas incluem:

1.  **AI Chatbot:** Assistente virtual para responder sobre experiências profissionais.
2.  **Architecture Advisor:** Uso do modelo com *thinking budget* alto para discutir decisões técnicas.
3.  **Market Trends:** Integração com Google Search Tool para dados em tempo real.
4.  **Visual Processing:** Capacidade de analisar e gerar imagens via modelos multimodais.

---

## ⚡ Como Executar

Este projeto foi estruturado para ser leve. Para rodar localmente em um ambiente padrão:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Shadw-Developer/meu-portifolio.git
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz e adicione sua chave da API do Google Gemini (necessário apenas para funcionalidades de IA):
    ```env
    API_KEY=sua_chave_aqui
    ```

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm start
    # ou
    npm run dev
    ```

---

## 🎨 Decisões de Design

*   **Tipografia & Cores:** Uso da paleta `Zinc` (Slate) para um fundo escuro profissional, com acentos em `Indigo` e `Emerald` para destacar ações e sucessos.
*   **UX Mobile:** A navegação mobile foi tratada como cidadã de primeira classe, com bloqueio de scroll (`overflow: hidden`) quando o menu está ativo para evitar comportamentos indesejados.
*   **Micro-interações:** Hover effects, transições de cor e *fade-ins* sutis para melhorar a percepção de qualidade sem comprometer a performance.

---

<p align="center">
  Desenvolvido por <a href="https://github.com/Shadw-Developer/meu-portifolio.git">Alisson (@mrx_dev)</a>
</p>
