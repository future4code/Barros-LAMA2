# Labenu Music Awards
Como você deve saber muito bem, o nosso querido chefinho Astrodev é uma pessoa com Networking incrível e ele conhece vários artistas estrelados. Além disso, ele também é um grande ~~megalomaníaco~~ visionário e está planejando fazer um grande evento: o **LAMA**, *Labenu Musical Awards*, um festival  com várias bandas famosas para a formatura da sua turma e, no final, vocês podem eleger a banda que mais gostaram! Entretanto, na opinião dele, vocês só serão merecedores se entregarem um sistema impecável que permita o gerenciamento completo desses shows.

Para isso já deixamos algumas tabelas prontas para vocês não precisarem se preocupar com a modelagem do banco. Deixamos também um template do projeto já com a estrutura da parte de usuários. Vocês podem usá-las a vontade, mas, se quiser fazer do zero sem esse auxílio, também pode.


---
##  Biblioteca ultilizadas
 - 🌀 uuid 
 - 🌀 jwt hash

---
## 📖 Documentação 

https://documenter.getpostman.com/view/22376175/2s93JzMgJF

---
## 📚 Deploy no Render
https://project-lama.onrender.com

---
## 🚧 Requisitos do Projeto

- 🌀 Cadastrar Usuário (Com autenticação)
- 🌀 Login (Com autenticação) 
- 🌀 Ver todos usuarios 
- 🌀 Cadastrar uma Banda (Com autenticação)
- 🌀 Ver todas Bandas Cadastradas
- 🌀 Procurar por Banda pelo nome ou id
- 🌀 Ver Todos os Shows 
- 🌀 Adicionar um show 
- 🌀 Procurar Shows Em um dia específico 


---
## ⚙️ Rodando o Projeto

```bash
# Para rodar o repositório é necessário clona-lo:

- git clone https://github.com/future4code/Barros-cookenu1.git

# Instalação de dependências:

- npm install

# Após instaladas as dependências, configure o arquivo .env:

* - DB_HOST = 
* - DB_USER = 
* - DB_PASSWORD = 
* - DB_SCHEMA = 
* - JWT_KEY = 

# Agora dê o comando seguinte para rodar o migration:

- npm run migrations

# Após o migration, dê o comando seguinte para rodar a aplicação:

- npm run dev ou start
```
