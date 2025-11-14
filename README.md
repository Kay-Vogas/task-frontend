# 🚀 Gestão de Tarefas 

Um simples projeto Full-Stack de um "To-Do List" (Lista de Tarefas) com o objetivo de demonstrar a integração entre um backend RESTful e um frontend reativo.

O projeto consiste em um backend feito em **Spring Boot (Java)** que gerencia os dados e um frontend consumidor feito em **JavaScript puro (Vanilla JS)**, HTML e CSS.

## ✨ Funcionalidades Principais

* **CRUD Completo:** Criar, Ler, Atualizar e Deletar tarefas.
* **Priorização:** As tarefas podem ser definidas com prioridades (`BAIXA`, `MEDIA`, `ALTA`, `URGENTE`).
* **Ordenação Automática:** A lista de tarefas é sempre exibida ordenada pela prioridade (da mais alta para a mais baixa).
* **Edição em Modal:** A atualização das tarefas é feita através de um modal de edição limpo.
* **Status:** Marque tarefas como "Concluídas" ou "Pendentes" .
* **Interface Reativa:** O frontend reage às mudanças (criar, editar, deletar) e atualiza a lista em tempo real.

## 🛠️ Tecnologias Utilizadas

### Backend
* **Java 17** 
* **Spring Boot** 
* **Spring Data JPA** 
* **Lombok** 
* **H2 Database** 
* **Maven** 

### Frontend
* **HTML** 
* **CSS** 
* **JavaScript** 
* **Fetch API** 

---

## 🚀 Como Executar a Aplicação

Para executar o projeto, você precisa rodar o **Backend** e o **Frontend** separadamente.

### 1. Executando o Backend (Spring Boot) [Backend do Projeto](https://github.com/Kay-Vogas/task-backend)

1.  **Clone o repositório** (ou tenha a pasta do backend pronta).
2.  **Abra o projeto** em sua IDE Java favorita (ex: IntelliJ IDEA ou Eclipse).
3.  **Aguarde o Maven** baixar todas as dependências do projeto (pode levar alguns minutos na primeira vez).
4.  **Execute a Aplicação:** Encontre a classe principal `TarefasBackendApplication.java` e execute-a.
5.  **Pronto!** O servidor backend estará rodando em `http://localhost:8080`.

> **Nota sobre o Banco de Dados:** O projeto está configurado para usar o H2 (banco em memória). Você pode acessar o console do H2 em `http://localhost:8080/h2-console` e usar a URL JDBC `jdbc:h2:mem:testdb` para visualizar as tabelas.

### 2. Executando o Frontend 

1.  **Abra a pasta** que contém os arquivos `index.html`, `task.js` e `style.css` no **Visual Studio Code**.
2.  **Instale a extensão "Live Server"** no VS Code (ela é essencial para evitar problemas de CORS com arquivos locais).
3.  **Inicie o servidor:** Clique com o botão direito no arquivo `index.html` e selecione **"Open with Live Server"**.

---

## 📈 Diagramas do Sistema

Abaixo estão os diagramas que modelam a arquitetura e o comportamento da aplicação, escritos em sintaxe Mermaid.

### Diagrama de Caso de Uso

Este diagrama mostra as interações do usuário com as principais funcionalidades do sistema.

```mermaid
classDiagram
    class Task {
        -Long id
        -String nome
        -String descricao
        -Boolean status
        -Priority prioridade
        +Task()
        +getters/setters...
    }

    class Priority {
        <<enumeration>>
        BAIXA
        MEDIA
        ALTA
        URGENTE
    }

    Task "1" *-- "1" Priority : "possui"
