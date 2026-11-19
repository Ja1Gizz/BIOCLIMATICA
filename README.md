# Bioclimática

A Bioclimática é um projeto criado para apoiar agricultores familiares e urbanos. O site ajuda a organizar cultivos, grupos e sensores, incentivando o cuidado com o solo e o uso consciente da água.

## O que dá para fazer no site

- Criar uma conta e acessar usando o ID do usuário
- Organizar cultivos em grupos
- Cadastrar, editar e excluir grupos de cultivo
- Registrar sensores e associá-los aos grupos
- Editar e excluir sensores cadastrados
- Conhecer o projeto, consultar perguntas frequentes e entrar em contato com a equipe

## Tecnologias

- React
- Vite
- TypeScript
- Tailwind CSS
- React Router
- ESLint

## Estrutura de pastas

```text
public/                  favicon do site
src/
  assets/                logo, imagens da equipe e elementos visuais
  components/            cabeçalho e rodapé
  data/                  informações dos integrantes
  pages/
    Home/
    Integrantes/
    Sobre/
    FAQ/
    Contato/
    Sensores/
    Login/
    NaoEncontrada/
  services/               integração com os recursos de usuários, grupos e sensores
  types/                  tipos compartilhados do projeto
  App.tsx                 layout geral
  main.tsx                configuração das rotas
  index.css               estilos globais
index.html
vercel.json               configuração das rotas na publicação
vite.config.ts
package.json
```

## Rotas

- `/` – início
- `/integrantes` – equipe do projeto
- `/sobre` – informações sobre a Bioclimática
- `/faq` – perguntas frequentes sobre o projeto
- `/contato` – canais de contato
- `/entrar` – acesso pelo ID do usuário
- `/cadastrar` – cadastro de usuário
- `/sensores` – gerenciamento de grupos de cultivo e sensores
- qualquer outra rota exibe a página 404

## API

O site utiliza a API Bioclimática para carregar e gerenciar usuários, grupos de cultivo e sensores. A URL base padrão é:

https://bioclimatica.onrender.com

Se necessário, a URL pode ser configurada pela variável `VITE_BIOCLIMATICA_API_URL`.

Principais recursos utilizados:

- `GET /usuarios/{id}`: consulta os dados do usuário
- `POST /usuarios/cadastro`: cadastra um usuário
- `/usuarios/{id}/grupos`: consulta e gerencia os grupos de cultivo
- `/usuarios/{id}/sensores`: consulta e gerencia os sensores
- `/usuarios/{id}/sensores/{idSensor}/grupo/{idGrupo}`: associa um sensor a um grupo


## Links do projeto:
- Projeto no Vercel: https://bioclimatica.vercel.app
- Repositorio no Github: https://github.com/Ja1Gizz/BIOCLIMATICA
- Video no youtube: https://youtu.be/POl1R3chG44
- API: https://bioclimatica.onrender.com/

Para executar o site localmente:

```bash
npm install
npm run dev
```

O site ficará disponível em `http://localhost:5173`.

Para gerar a versão de publicação:

```bash
npm run build
```

## Equipe:

João Luiz Oliveira – RM 568747 – [GitHub](https://github.com/Ja1Gizz) – [LinkedIn](https://www.linkedin.com/in/jo%C3%A3o-luiz-silva-matias-de-oliveira-34599b408/)

Cauã Trevisanuto – RM 570312 – [GitHub](https://github.com/CauaTr) – [LinkedIn](https://www.linkedin.com/in/cau%C3%A3-trevisanuto-997405411/)

Pedro Basilisco – RM 572370 – [GitHub](https://github.com/P3druuh) – [LinkedIn](https://www.linkedin.com/in/pedro-basilio-770108411)

Thiago Ferreira – RM 572492 – [GitHub](https://github.com/thiago2908) – [LinkedIn](https://www.linkedin.com/in/thiago-f-rocha-325904290/)

## Contato:

- E-mail: joaoluizmo23@gmail.com
- WhatsApp: (11) 93278-4516
- Teams: rm568747@fiap.com.br
