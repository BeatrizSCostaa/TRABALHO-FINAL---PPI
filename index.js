import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";

const host = "localhost";
const port = 3000;

var listaEquipes = [];
var listaJogadores = [];

const server = express();

server.use(
  session({
    secret: "Minh4S3nhaS3cr3t4",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 30, // sessão máxima de 30 minutos
    },
  })
);

server.use(express.urlencoded({ extended: true }));
server.use(express.static("public")); // para adicionar a imagem logo1.png 
server.use(cookieParser());

server.get("/", (req, resp) => {
  resp.redirect("/menuinicial");
});

server.get("/menuinicial", verificarUsuarioLogado, (req, resp) => {
  let ultimoacesso = req.cookies?.ultimoacesso;

  const data = new Date();
  resp.cookie("ultimoacesso", data);

  resp.setHeader("Content-Type", "text/html; charset=UTF-8");
  resp.write(`
    <!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Menu Inicial</title>

  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    rel="stylesheet"
  />

  <style>
    body {
      background-color: #000000ff;
      color: white;
    }

    .menu-card {
      background-color: #111417;
      border-radius: 15px;
      padding: 40px 30px;
      box-shadow: 0 0 20px rgba(0,0,0,0.4);
    }

    .btn-green {
      background-color: #28a745;
      color: white;
      font-size: 18px;
      padding: 12px;
      border-radius: 10px;
    }

    .btn-green:hover {
      background-color: #1e7e34;
    }

    .ultimo-acesso {
      color: #8fff9f;
      font-weight: bold;
      font-size: 14px;
    }
  </style>

</head>

<body>

  
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">

      <a class="navbar-brand" href="/menuinicial">MENU</a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">

        <ul class="navbar-nav me-auto">

          <li class="nav-item">
            <a class="nav-link active" href="/menuinicial">Home</a>
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button">
              Cadastros
            </a>

            <ul class="dropdown-menu dropdown-menu-dark">
              <li><a class="dropdown-item" href="/cadastroEquipe">Cadastrar Equipe</a></li>
              <li><a class="dropdown-item" href="/cadastroJogador">Cadastrar Jogador</a></li>
              <li><a class="dropdown-item" href="/listarEquipes">Listar Equipes</a></li>
              <li><a class="dropdown-item" href="/listarJogadores">Listar Jogadores</a></li>
            </ul>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="/login">Login</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="/logout">Logout</a>
          </li>

        </ul>

        
        <span class="ultimo-acesso">
          Último acesso: ${ultimoacesso || "Primeiro acesso"}
        </span>

      </div>
    </div>
  </nav>

  
  <div class="container text-center mt-5">
    <div class="col-md-8 mx-auto">
      <h1 class="mb-4 display-4 text-success">Sistema de Gerenciamento de Equipes</h1>
      
    </div>
  </div>
  <script 
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js">
  </script>

</body>
</html>

  `);

  resp.end();
});

server.get("/login", (req, resp) => {
  resp.send(`

  <!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Login</title>

    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
    />

    <style>
        body {
            background-color: #000000ff;
        }

        .btn-verde {
            background-color: #28a745 !important;
            border: none !important;
        }

        h1 {
            text-align: center;
            margin-bottom: 25px;
            color: white;
        }

        label {
            color: white;
        }

        a {
            color: #28a745 !important;
        }
    </style>

</head>
<body class="vh-100">
<section class="vh-100">
  <div class="container py-5 h-100">
    <div class="row d-flex align-items-center justify-content-center h-100">
      
      <div class="col-md-8 col-lg-7 col-xl-6">
        <img src="/logo1.png"
            class="img-fluid" alt="logo imagem">
      </div>

      <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">

      <h1>LOGIN</h1>

        <form action="/efetuarLogin" method="POST">

          <div class="form-outline mb-4">
            <label class="form-label" for="email">Email</label>
            <input type="email" name="email" id="email" placeholder="Digite seu email"
                class="form-control form-control-lg">
          </div>

          <div class="form-outline mb-4">
            <label class="form-label" for="senha">Senha</label>
            <input type="password" name="senha" id="senha" placeholder="Digite sua senha"
                  class="form-control form-control-lg">
          </div>

          <div class="d-flex justify-content-between align-items-center mb-4">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="lembrar" />
              <label class="form-check-label" for="lembrar">
                Lembrar-me
              </label>
            </div>
            <a href="#">Esqueceu a senha?</a>
          </div>

          <button type="submit" class="btn btn-verde btn-lg w-100">
            Entrar
          </button>

        </form>

      </div>
    </div>
  </div>
</section>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

</body>
</html>

  `);
});

server.post("/efetuarLogin", (req, resp) => {
  const email = req.body.email;
  const senha = req.body.senha;

    if (email && senha) {
        req.session.dadosLogin = {
            usuarioLogado: true,
            nome: email,
        };
    resp.redirect("/menuinicial");
  } else {
    let conteudologin = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Login</title>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" />
          <style>
              body { 
              background-color: #000000ff;
              color: white; 
              }
              
              .btn-verde { 
              background-color: #28a745 !important;
              border: none !important;
              }
              h1 {
              text-align: center; margin-bottom: 25px; color: white; 
              }
              label {
              color: white; 
              }
              a { 
              color: #28a745 !important;
              }
          </style>
      </head>
      <body class="vh-100">
      <section class="vh-100">
        <div class="container py-5 h-100">
          <div class="row d-flex align-items-center justify-content-center h-100">
            
            <div class="col-md-8 col-lg-7 col-xl-6">
              <img src="/logo1.png" class="img-fluid" alt="logo imagem">
            </div>
      
            <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
      
            <h1>LOGIN</h1>
              <form action="/efetuarLogin" method="POST">
            `;

            conteudologin += `
                <div class="form-outline mb-4">
                  <label class="form-label" for="email">Email</label>
                  <input type="email" name="email" id="email" placeholder="Digite seu email" value="${email}"
                      class="form-control form-control-lg">
                </div>
        `;

        if (!email) {
            conteudologin += `
              <p class="text-danger">Por favor, insira o Email.</p>
          `;
        }

        conteudologin += `
                <div class="form-outline mb-4">
                  <label class="form-label" for="senha">Senha</label>
                  <input type="password" name="senha" id="senha" placeholder="Digite sua senha" value="${senha}"
                        class="form-control form-control-lg">
                </div>
            `;

        if (!senha) {
        conteudologin += `
          <p class="text-danger">Por favor, insira a senha.</p>
        `;
      }
          
      conteudologin += `
                <div class="d-flex justify-content-between align-items-center mb-4">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="lembrar" />
                    <label class="form-check-label" for="lembrar">
                      Lembrar-me
                    </label>
                  </div>
                  <a href="#">Esqueceu a senha?</a>
                </div>
      
                <button type="submit" class="btn btn-verde btn-lg w-100">
                  Entrar
                </button>
      
              </form>
      
            </div>
          </div>
        </div>
      </section>
      
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
      
      </body>
      </html>
      `;
      resp.send(conteudologin);
  }
});

// validação de login = verificar se o usuário está logado
function verificarUsuarioLogado(req, resp, proximo) {
  if (!req.session.dadosLogin || !req.session.dadosLogin.usuarioLogado) {
    return resp.send(`
      <link rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
      <div class="container mt-5">
        <h3>Você precisa realizar o login para acessar esta página.</h3>
        <a href="/login" class="btn btn-primary mt-3">Clique aqui para fazer login</a>
      </div>
    `);
  }
  proximo();
}

server.get("/logout", (req, resp) => {
  resp.send(`
    <link rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">

    <div class="container mt-5">
      <h3>Você saiu do sistema.</h3>
      <a href="/login" class="btn btn-primary mt-3">Fazer Login Novamente</a>
    </div>
  `);
});

server.get("/cadastroEquipe", verificarUsuarioLogado, (req, resp) => {
  resp.send(`
    <!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro de Equipe</title>

    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />

    <style>
        body {
            background-color: #2e2d2d;
        }

        .card-custom {
            background: rgba(0, 0, 0, 0.45);
            backdrop-filter: blur(12px);
            padding: 40px;
            border-radius: 18px;
            box-shadow: 0 0 25px rgba(0,0,0,0.7);
            max-width: 600px;
        }

        .btn-verde {
            background-color: #28a745 !important;
            border: none !important;
            padding: 12px;
            font-size: 18px;
            font-weight: bold;
        }

        h2, label {
            color: white;
        }
    </style>
</head>

<body class="d-flex justify-content-center align-items-center vh-100">

    <div class="card-custom w-100">

        <h2 class="text-center mb-4">Cadastro da Equipe</h2>

        <form action="/equipesCadastradas" method="POST">
            <div class="mb-3">
                <label for="equipe" class="form-label">Nome da Equipe</label>
                <input type="text" class="form-control form-control-lg" id="equipe" name="equipe"
                      placeholder="Digite o nome da equipe">
            </div>

            <div class="mb-3">
                <label for="capitao" class="form-label">Nome do Capitão Responsável</label>
                <input type="text" class="form-control form-control-lg" id="capitao" name="capitao"
                      placeholder="Digite o nome do capitão">
            </div>

            <div class="mb-3">
                <label for="telefone" class="form-label">Telefone / WhatsApp do Capitão</label>
                <input type="tel" class="form-control form-control-lg" id="telefone" name="telefone"
                      placeholder="(xx) 9xxxx-xxxx">
            </div>

            <button type="submit" class="btn btn-verde w-100 mt-3">Cadastrar</button>
        </form>

    </div>

</body>
</html>

  `);
});

server.get("/cadastroJogador", verificarUsuarioLogado, (req, resp) => {

  let listagem = ""; // vazia pois vai armazenar as opções de equipes

  for (let i = 0; i < listaEquipes.length; i++) { // laço for para percorrer a lista de equipes
    listagem += `
      <option value="${listaEquipes[i].equipe}">${listaEquipes[i].equipe}</option> 
      `;
  }

  resp.send(`
    <!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro de Jogador</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />

    <style>
        body {
            background-color: #2e2d2d;
        }

        .card-custom {
            background: rgba(0, 0, 0, 0.45);
            backdrop-filter: blur(12px);
            padding: 40px;
            border-radius: 18px;
            box-shadow: 0 0 25px rgba(0,0,0,0.7);
            max-width: 600px;
        }

        .btn-verde {
            background-color: #28a745 !important;
            border: none !important;
            padding: 12px;
            font-size: 18px;
            font-weight: bold;
        }

        h2, label {
            color: white;
        }
    </style>
</head>

<body class="d-flex justify-content-center align-items-center vh-100">

    <div class="card-custom w-100">

        <h2 class="text-center mb-4">Cadastro de Jogador</h2>

        <form action="/jogadoresCadastrados" method="POST">
            <div class="mb-3">
                <label for="jogador" class="form-label">Nome do Jogador</label>
                <input type="text" class="form-control form-control-lg" id="jogador" name="jogador"
                      placeholder="Digite o nome do jogador">
            </div>

            <div class="mb-3">
                <label for="nickname" class="form-label">Nickname in-game</label>
                <input type="text" class="form-control form-control-lg" id="nickname" name="nickname"
                      placeholder="Digite o nickname">
            </div>

            <div class="mb-3">
                <label for="funcao" class="form-label">Função</label>
                <select class="form-select form-select-lg" id="funcao" name="funcao">
                    <option selected disabled>Selecione a função</option>
                    <option value="Top">Top</option>
                    <option value="Jungle">Jungle</option>
                    <option value="Mid">Mid</option>
                    <option value="Atirador">Atirador</option>
                    <option value="Suporte">Suporte</option>
                </select>
            </div>

            <div class="mb-3">
                <label for="elo" class="form-label">Elo</label>
                <select class="form-select form-select-lg" id="elo" name="elo">
                    <option selected disabled>Selecione o elo</option>
                    <option>Ferro</option>
                    <option>Bronze</option>
                    <option>Prata</option>
                    <option>Ouro</option>
                    <option>Platina</option>
                    <option>Diamante</option>
                    <option>Mestre</option>
                    <option>Grão-Mestre</option>
                    <option>Desafiante</option>
                </select>
            </div>

            <div class="mb-3">
                <label for="genero" class="form-label">Gênero</label>
                <select class="form-select form-select-lg" id="genero" name="genero">
                    <option selected disabled>Selecione</option>
                    <option>Masculino</option>
                    <option>Feminino</option>
                    <option>Outro</option>
                    <option>Prefiro não informar</option>
                </select>
            </div>

            <div class="mb-3">
              <label for="equipe" class="form-label">Equipe</label>
              <select class="form-select form-select-lg" id="equipe" name="equipe">
            <option selected disabled>Selecione a equipe</option>
            ${listagem};
</select>
</div>

            <button type="submit" class="btn btn-verde w-100 mt-3">Cadastrar</button>
        </form>

    </div>

</body>
</html>

  `);
});

server.post("/equipesCadastradas", verificarUsuarioLogado, (req, resp) => {
  const equipe = req.body.equipe;
  const capitao = req.body.capitao;
  const telefone = req.body.telefone;

  if (equipe && capitao && telefone) {
    
    listaEquipes.push({
      equipe,
      capitao,
      telefone,
    });

    console.log("Equipe cadastrada com sucesso:", equipe); // 
    resp.redirect("/listarEquipes");
  } else {
    let conteudo = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro de Equipe</title>

    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />

    <style>
        body {
            background-color: #2e2d2d;
        }

        .card-custom {
            background: rgba(0, 0, 0, 0.45);
            backdrop-filter: blur(12px);
            padding: 40px;
            border-radius: 18px;
            box-shadow: 0 0 25px rgba(0,0,0,0.7);
            max-width: 600px;
        }

        .btn-verde {
            background-color: #28a745 !important;
            border: none !important;
            padding: 12px;
            font-size: 18px;
            font-weight: bold;
        }

        h2, label {
            color: white;
        }
    </style>
</head>

<body class="d-flex justify-content-center align-items-center vh-100">

    <div class="card-custom w-100">

        <h2 class="text-center mb-4">Cadastro da Equipe</h2>
        
        <form action="/equipesCadastradas" method="POST">

            <div class="mb-3">
                <label for="equipe" class="form-label">Nome da Equipe</label>
                <input type="text" class="form-control form-control-lg" id="equipe" name="equipe" 
                      value="${equipe}" placeholder="Digite o nome da equipe">
            </div>
    `;

    if (!equipe) {
      conteudo += `
        <p class="text-danger">Por favor, informe o nome da equipe.</p>
    `;
    }

    conteudo += `
            <div class="mb-3">
                <label class="form-label">Nome do Capitão Responsável</label>
                <input type="text" class="form-control form-control-lg" 
                        name="capitao" value="${capitao}"
                        placeholder="Digite o nome do capitão">
            </div>
`;

    if (!capitao) {
      conteudo += `
        <p class="text-danger">Por favor, informe o nome do capitão responsável.</p>
    `;
    }

    conteudo += `
            <div class="mb-3">
                <label class="form-label">Telefone / WhatsApp do Capitão</label>
                <input type="tel" class="form-control form-control-lg"
                        name="telefone" value="${telefone}"
                        placeholder="(xx) 9xxxx-xxxx">
            </div>
`;

    if (!telefone) {
      conteudo += `
        <p class="text-danger">Por favor, informe o telefone/WhatsApp do capitão.</p>
    `;
    }

    conteudo += `
            <button type="submit" class="btn btn-verde w-100 mt-3">Cadastrar</button>

        </form>

    </div>

</body>
</html>
`;
    resp.send(conteudo);
  }
});

server.post("/jogadoresCadastrados", verificarUsuarioLogado, (req, resp) => {
  
  const jogador = req.body.jogador;
  const nickname = req.body.nickname;
  const funcao = req.body.funcao;
  const elo = req.body.elo;
  const genero = req.body.genero;
  const equipe = req.body.equipe;

  if (jogador && nickname && funcao && elo && genero && equipe) {
    
    listaJogadores.push({
      jogador,
      nickname,
      funcao,
      elo,
      genero,
      equipe,
    });

    console.log("Jogador cadastrado com sucesso:", jogador); // Corrigido: Variável de log
    resp.redirect("/listarJogadores"); // Corrigido: Redirecionar para uma nova rota de listagem de jogadores
  } else {
    // Reexibir formulário com mensagens de erro e valores preenchidos - Corrigido o fluxo de erro

    let conteudo = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro de Jogador</title>

    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />

    <style>
        body {
            background-color: #2e2d2d;
        }

        .card-custom {
            background: rgba(0, 0, 0, 0.45);
            backdrop-filter: blur(12px);
            padding: 40px;
            border-radius: 18px;
            box-shadow: 0 0 25px rgba(0,0,0,0.7);
            max-width: 600px;
        }

        .btn-verde {
            background-color: #28a745 !important;
            border: none !important;
            padding: 12px;
            font-size: 18px;
            font-weight: bold;
        }

        h2, label {
            color: white;
        }
    </style>
</head>

<body class="d-flex justify-content-center align-items-center vh-100">

    <div class="card-custom w-100">

        <h2 class="text-center mb-4">Cadastro de Jogador</h2>

        <form action="/jogadoresCadastrados" method="POST">

            <div class="mb-3">
                <label for="jogador" class="form-label">Nome do Jogador</label>
                <input type="text" class="form-control form-control-lg" id="jogador" name="jogador"
                      value="${jogador}" placeholder="Digite o nome do jogador">
                </div>`;

      if (!jogador) {
      conteudo += `
      <div>
      <p class="text-danger">Por favor, informe o nome do jogador.</p>
      </div>
    `;
    }
    conteudo += `
            <div class="mb-3">
                <label for="nickname" class="form-label">Nickname in-game</label>
                <input type="text" class="form-control form-control-lg" id="nickname" name="nickname"
                      value="${nickname}" placeholder="Digite o nickname">
            </div>`;

      if (!nickname) { 
      conteudo += `
      <div>
        <p class="text-danger">Por favor, informe o nickname in-game.</p>
      </div>
    `;
    }   
    conteudo += `
            <div class="mb-3">
                <label for="funcao" class="form-label">Função</label>
                <select class="form-select form-select-lg" id="funcao" name="funcao">
                    <option selected disabled>Selecione a função</option> 
                    <option value="Top">Top</option>
                    <option value="Jungle">Jungle</option>
                    <option value="Mid">Mid</option>
                    <option value="Atirador">Atirador</option>
                    <option value="Suporte">Suporte</option>
                </select>
            </div>
`;

    if (!funcao) {  
      conteudo += `
      <div>
        <p class="text-danger">Por favor, selecione a função.</p>
      </div>
    `;
    }

    conteudo += `
            <div class="mb-3">
                <label for="elo" class="form-label">Elo</label>
                <select class="form-select form-select-lg" id="elo" name="elo">
                  <option selected disabled>Selecione o elo</option> 
                  <option>Ferro</option>
                  <option>Bronze</option>
                  <option>Prata</option>
                  <option>Ouro</option>
                  <option>Platina</option>
                  <option>Diamante</option>
                  <option>Mestre</option>
                  <option>Grão-Mestre</option>
                  <option>Desafiante</option>
                </select>
            </div>
  `;

    if(!elo) {  
      conteudo += `
      <div>
      <p class="text-danger">Por favor, selecione o elo.</p>
      </div>  
    `;  
  }

  conteudo += `
            <div class="mb-3">
                <label for="genero" class="form-label">Gênero</label>
                <select class="form-select form-select-lg" id="genero" name="genero">
                    <option selected disabled>Selecione</option>
                    <option>Masculino</option>
                    <option>Feminino</option>
                    <option>Outro</option>
                    <option>Prefiro não informar</option>
                </select>
            </div>
`;

      if (!genero) {  
      conteudo += `
      <div>
        <p class="text-danger">Por favor, selecione o gênero.</p>
      </div>
    `;
    }

    conteudo += `
            <div class="mb-3">
                <label for="equipe" class="form-label">Equipe</label>
                <input type="text" class="form-control form-control-lg" id="equipe" name="equipe"
                      value="${equipe}" placeholder="Digite o nome da equipe">
            </div>
`;

      if (!equipe) {  
      conteudo += `
      <div>
        <p class="text-danger">Por favor, informe a equipe.</p>
      </div>
    `;
    }

    conteudo += `
            <button type="submit" class="btn btn-verde w-100 mt-3">Cadastrar</button>
        </form>

    </div>

</body>
</html>
    `;
    resp.send(conteudo);
  }
});


server.get("/listarEquipes", verificarUsuarioLogado, (req, resp) => {
  const ultimo = req.cookies?.ultimoacesso || "Primeiro acesso";

  let conteudo = `
  <!DOCTYPE html>
  <html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <title>Lista de Equipes</title>
    <link rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
  </head>

  <body>
  <div class="container mt-5">
    <h2>Equipes Cadastradas</h2>
    <table class="table table-bordered">
      <thead class="thead-dark">
        <tr>
          <th>Equipe</th>
          <th>Capitão</th>
          <th>Telefone</th>
        </tr>
      </thead>
      <tbody>`;
    
  for (let i = 0; i < listaEquipes.length; i++) {
    conteudo += `
      <tr>
        <td>${listaEquipes[i].equipe}</td>
        <td>${listaEquipes[i].capitao}</td>
        <td>${listaEquipes[i].telefone}</td>
      </tr>`;
  }

  conteudo += `
      </tbody>
    </table>
    <div class="text-left mt-3">
        <a href="/menuinicial" class="btn btn-secondary btn-sm">Voltar ao Menu</a>
    </div>
  </div>
  </body>
  </html>`;

  resp.send(conteudo);
});


server.get("/listarJogadores", verificarUsuarioLogado, (req, resp) => {
    let conteudo = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>Lista de Jogadores</title>
      <link rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
    </head>

    <body>
    <div class="container mt-5">
      <h2>Jogadores Cadastrados</h2>
      <table class="table table-bordered">
        <thead class="thead-dark">
          <tr>
            <th>Jogador</th>
            <th>Nickname</th>
            <th>Função</th>
            <th>Elo</th>
            <th>Gênero</th>
            <th>Equipe</th>
          </tr>
        </thead>
        <tbody>`;

    for (let i = 0; i < listaJogadores.length; i++) {
      conteudo += `
        <tr>
          <td>${listaJogadores[i].jogador}</td>
          <td>${listaJogadores[i].nickname}</td>
          <td>${listaJogadores[i].funcao}</td>
          <td>${listaJogadores[i].elo}</td>
          <td>${listaJogadores[i].genero}</td>
          <td>${listaJogadores[i].equipe}</td>
        </tr>`;
    }

    conteudo += `
        </tbody>
      </table>
      <div class="text-left mt-3">
          <a href="/menuinicial" class="btn btn-secondary btn-sm">Voltar ao Menu</a>
      </div>
    </div>
    </body>
    </html>`;

    resp.send(conteudo);
});

server.listen(port, host, () => {
  console.log(`Servidor rodando em http://${host}:${port}/menuinicial`);
});