# Lista de Tarefas

### [Visitar Projeto](https://listadetarefas-luiz2k.vercel.app/)
Acesse também o repositório do [Front-end](https://github.com/luiz2k/lista-de-tarefas__web)

---

## 📝 Sobre
Meu primeiro projeto full stack, onde eu refaço um dos meus primeiros projetos, [Lista de Tarefas](https://listadetarefasv1-luiz2k.vercel.app/). A ideia desse projeto é manter todas as anotações do usuário em um banco de dados, evitando assim possíveis perda das anotações. Nesse projeto criado um sistema de login e registro, onde cada usuário poderá gerenciar suas próprias anotações. O usuário quando logado poderá acessar o seu perfil e alterar todos os seus dados, ou até mesmo excluir a sua conta.

### Tecnologias
- Node.JS
- TypeScript
- Express
- Mongoose
- Zod
- Prettier / ESLint

## 🚔 Rotas
Aqui estão as rotas disponíveis neste backend.

`POST: /auth/signin`
- Descrição: Rota para fazer login.

`POST: /auth/signup`
- Descrição: Rota para fazer registro.

`POST: /refreshtoken`
- Descrição: Obtem um novo token de acesso através do refresh token.
- Body: refreshToken
```
{
  "refreshToken": "Exemplo de refreshToken"
}
```

### 🔑 A partir daqui as rotas exigem um token de autenticação. Bearer [token]

`POST: /user`
- Descrição: Obtem os dados do usuário autenticado

`DELETE: /deleteaccount`
- Descrição: Apaga a conta.
- Corpo da Solicitação: A solicitação deve incluir um objeto JSON com os seguintes campos obrigatórios:
password (string): Senha do usuário
```
{
  "password": "Exemplo de password"
}
```

`POST: /signout`
- Descrição: Desloga da conta atual.
- Corpo da Solicitação: A solicitação deve incluir um objeto JSON com os seguintes campos obrigatórios:
refreshToken (string)
```
{
  "refreshToken": "Exemplo de refreshToken"
}
```

`PATCH: /changeUsername`
- Descrição: Altera o nome de usuário.
- Corpo da Solicitação: A solicitação deve incluir um objeto JSON com os seguintes campos obrigatórios:
newUsername (string): Novo nome de usuário
```
{
  "newUsername": "Exemplo de username"
}
```

`PATCH: /changeEmail`
- Descrição: Altera o e-mail.
- Corpo da Solicitação: A solicitação deve incluir um objeto JSON com os seguintes campos obrigatórios:
currentEmail (string): E-mail de acesso atual
newEmail (string): Novo e-mail de acesso
```
{
  "currentEmail": "Exemplo de e-mail de acesso atual"
  "newEmail": "Exemplo de novo e-mail de acesso"
}
```

`PATCH: /changePassword`
- Descrição: Altera a senha.
- Corpo da Solicitação: A solicitação deve incluir um objeto JSON com os seguintes campos obrigatórios:
currentPassword (string): Senha de acesso atual
newPassword (string): Nova senha de acesso
```
{
  "currentPassword": "Exemplo de senha de acesso atual"
  "newPassword": "Exemplo de nova senha de acesso"
}
```

`GET: /`
- Descrição: Obtem todas as anotações.

`POST: /create`
- Descrição: Cria uma nova anotação.
- Corpo da Solicitação: A solicitação deve incluir um objeto JSON com os seguintes campos obrigatórios:
task (string): Nome para a nova anotação
```
{
  "task": "Exemplo de anotação"
}
```

`GET: /find/{id}`
- Descrição: Obtem uma anotação pelo seu ID.
- Parâmetros: O ID da anotação deve ser passado como parte da URL.

`PATCH: /edit/{id}`
- Descrição: Edita uma anotação pelo seu ID.
- Parâmetros: O ID da anotação deve ser passado como parte da URL.
- Corpo da Solicitação: A solicitação deve incluir um objeto JSON com os seguintes campos obrigatórios:
newTask (string): Nome da nova anotação
```
{
  "newTask": "Exemplo de anotação"
}
```

`PATCH: /changeStatus/{id}`
- Descrição: Altera o status de uma anotação.
- Parâmetros: O ID da anotação deve ser passado como parte da URL.

`DELETE: /delete/{id}`
- Descrição: Exclui uma anotação.
- Parâmetros: O ID da anotação deve ser passado como parte da URL.

---

Projeto pessoal desenvolvido por **Luiz Teles**
