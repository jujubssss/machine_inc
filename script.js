let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

// var cpf = document.querySelector("#cpf");
let cpf = document.getElementById('cpf')

if (cpf != undefined) {
    cpf.addEventListener("blur", function() {
        //caso o CPF não seja um número
        cpf.value = cpf.value.replaceAll(".", "").replace("-", "");
        if (isNaN(cpf.value))
            cpf.value = "";

        if (cpf.value)
            cpf.value = cpf.value.match(/.{1,3}/g).join(".").replace(/\.(?=[^.]*$)/, "-");
    });
}

// Recuperou todos os elementos do formulário
let username = document.getElementById('username');
let nomeReal = document.getElementById('name');
let email = document.getElementById('email');
let senha = document.getElementById('password');
let senhaRepetida = document.getElementById('retypePassword');

let generos = document.getElementsByName("gender");
let genero = null;

let ddcargaHoraria = document.getElementById("dropdownNumero");
let beneficio = document.getElementById("beneficio");
if (beneficio != undefined) {
    beneficio.value = usuarioLogado.beneficio;
}

let cargaHoraria = document.getElementById("cargaHoraria");
if (cargaHoraria != undefined) {
    cargaHoraria.value = usuarioLogado.cargaHoraria;
}
let contador = 0


// Buscar o campo "genero"
function buscarGenero(nome = null) {
    for (var i = 0; i < generos.length; i++) {
        if (generos[i].checked || generos[i].value == nome) {
            genero = generos[i];
            genero.checked = true;
        }
    }

    return genero;
}
// let generos = document.querySelector('input[name="gender"]:checked');

if (usuarioLogado != undefined) {
    if (username != undefined) {
        username.value = usuarioLogado.userName;
    }
    if (nomeReal != undefined) {
        nomeReal.value = usuarioLogado.nomeReal;
    }
    if (cpf != undefined) {
        cpf.value = usuarioLogado.cpf;
    }
    if (email != undefined) {
        email.value = usuarioLogado.email;
    }

    genero = buscarGenero(usuarioLogado.genero);
}

let vetor = [];

function cadastro() {
    usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    vetor = JSON.parse(localStorage.getItem("vetor"));
    if (vetor == undefined)
        vetor = [];

    // Validações
    if (senha.value != senhaRepetida.value) {
        alert("A senha está diferente.")
        return;
    }

    if (username.value == undefined || username.value == '') {
        alert("Preencha o Nome")
        return;
    }
    if (nomeReal.value == undefined || nomeReal.value == '') {
        alert("Preencha o Nome Completo")
        return;
    }
    if (email.value == undefined || email.value == '') {
        alert("Preencha o E-mail")
        return;
    }
    if (cpf.value == undefined || cpf.value == '') {
        alert("Preencha o CPF")
        return;
    }
    if (senha.value == undefined || senha.value == '') {
        alert("Preencha o Senha")
        return;
    }

    genero = buscarGenero();

    // Atualizar
    if (usuarioLogado != undefined) {
        // Identificar o usuário logado dentro do vetor
        for (var i = 0; i < vetor.length; i++) {
            if (usuarioLogado.userName == vetor[i].userName) {
                vetor[i] = {
                    "userName": username.value,
                    "nomeReal": nomeReal.value,
                    "email": email.value,
                    "cpf": cpf.value,
                    "senha": senha.value,
                    "genero": genero.value,
                    "registros": usuarioLogado.registros
                };
                usuarioLogado = vetor[i];
                localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
            }
        }
    } else {
        // Insere JSON no array
        vetor.push({
            "userName": username.value,
            "nomeReal": nomeReal.value,
            "email": email.value,
            "cpf": cpf.value,
            "senha": senha.value,
            "genero": genero.value
        });
        console.table(vetor);
    }

    localStorage.setItem("vetor", JSON.stringify(vetor));

    alert("Salvo!")

}

function salvar() {
    // verificar se todos os campos estão preenchidos
    // usar JSON para salvar usuário
    alert("salavando...");
}

function logout() {
    localStorage.removeItem("usuarioLogado");
    window.location.replace('login.html')
}

function login() {
    localStorage.removeItem("usuarioLogado");
    let usuario = acharocara();
    if (usuario == undefined) {
        alert("Usuário não encontrado!");
        return;
    }

    if (senha.value == usuario.senha) {
        localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
        window.location.replace('homePage.html')
    } else
        alert("Senha inválida!");

}

function acharocara(userName) {
    // Buscar Vetor do localStorage
    vetor = JSON.parse(localStorage.getItem("vetor"));
    let ocara = null;

    // percorrer o vetor
    for (var i = 0; i < vetor.length; i++) {
        //testar usuário digitado
        if (username.value.toLowerCase() == vetor[i].userName.toLowerCase()) {
            ocara = vetor[i];
        }
    }

    return ocara;
}

function voltar() {
    usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (usuarioLogado == undefined)
        window.location.replace('login.html');
    else
        window.location.replace('homePage.html');
}

// function registrar() {
//     usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
//     vetor = JSON.parse(localStorage.getItem("vetor"));

//     if (usuarioLogado != undefined) {
//         // Identificar o usuário logado dentro do vetor
//         for (var i = 0; i < vetor.length; i++) {
//             if (usuarioLogado.userName == vetor[i].userName) {
//                 if (vetor[i].cargaHoraria == undefined)
//                     vetor[i].cargaHoraria = 0;

//                 if (parseInt(vetor[i].cargaHoraria) + parseInt(ddcargaHoraria.value) > 23) {
//                     alert("Nâo é possível registrar!");
//                     return;
//                 }
//                 vetor[i].cargaHoraria = parseInt(vetor[i].cargaHoraria) + parseInt(ddcargaHoraria.value);

//                 if (vetor[i].beneficio == undefined)
//                     vetor[i].beneficio = 0;

//                 vetor[i].beneficio = vetor[i].cargaHoraria - 8;

//                 usuarioLogado = vetor[i];
//                 localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
//                 localStorage.setItem("vetor", JSON.stringify(vetor));

//                 cargaHoraria.value = usuarioLogado.cargaHoraria;
//                 beneficio.value = usuarioLogado.beneficio;
//             }
//         }
//     }
// }
// Função para atualizar o relógio
function updateClock() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    let timeString = hours + ':' + minutes + ':' + seconds;
    document.getElementById('clock').textContent = timeString;
}

function registrarPonto(tipo) {
    let now = new Date();
    let registros = JSON.parse(localStorage.getItem('usuarioLogado')).registros || [];
    contador++;

    if (registros.length > 0 && registros[registros.length - 1].tipo == tipo) {
        alert("Seu último registro já foi de " + tipo + ".");
        return;
    } else {
        if(registros.length == 0 && tipo != "Entrada") {
            alert("O primeiro registro deve ser de Entrada.");
            return;
        }
    }

    let registro = {
        tipo: tipo,
        hora: now.toLocaleString() // Adiciona data e hora completa
    };

    registros.push(registro);
    usuarioLogado.registros = registros;
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
    
    // Atualizar no banco de dados
    // Atualizar
    vetor = JSON.parse(localStorage.getItem("vetor"));
    for (var i = 0; i < vetor.length; i++) {
        if (usuarioLogado.userName == vetor[i].userName) {
            vetor[i].registros = usuarioLogado.registros;
            usuarioLogado = vetor[i];
            localStorage.setItem("vetor", JSON.stringify(vetor));
        }
    }


    exibirRegistros();
}
// Função para exibir os registros salvos
function exibirRegistros() {
    if(document.getElementById('registros') == undefined) return;
    if(localStorage.getItem('usuarioLogado') == undefined) return;

    let registros = JSON.parse(localStorage.getItem('usuarioLogado')).registros || [];
    let registrosList = document.getElementById('registros');
    registrosList.innerHTML = '';

    registros.forEach(registro => {
        // Exibir somente do dia atual
        let hoje = (new Date()).toLocaleDateString();
        if(registro.hora.substring(0,10) == hoje) {
            let li = document.createElement('li');
            li.textContent = `${registro.tipo} - ${registro.hora}`;
            registrosList.appendChild(li);
        }
    });
}

function registrarEntrada() {
    registrarPonto('Entrada');
}

function registrarSaida() {
    registrarPonto('Saída');
}

function limparHistorico() {
    let registros = document.getElementById("registros")
    registros.innerHTML = ''


}

document.addEventListener('DOMContentLoaded', () => {
    const gerarHistoricoButton = document.getElementById('gerar-historico');
    const limparHistoricoButton = document.getElementById('limpar-historico');
    const historicoList = document.getElementById('registros');

    // Função para atualizar a visualização do histórico
    function atualizarVisualizacaoHistorico() {
        // Limpa a lista atual de histórico visual
        if(historicoList == undefined) return;
        historicoList.innerHTML = '';

        // Recupera o histórico do localStorage
        const historico = JSON.parse(localStorage.getItem('historico') || '[]');

        // Adiciona os itens do histórico à lista visual
        historico.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            historicoList.appendChild(li);
        });
    }

    // // Adiciona um item ao histórico e atualiza a visualização
    // gerarHistoricoButton.addEventListener('click', () => {
    //     const historico = JSON.parse(localStorage.getItem('historico') || '[]');
    //     const novoItem = `Item ${historico.length + 1}`;
    //     historico.push(novoItem);
    //     localStorage.setItem('historico', JSON.stringify(historico));
    //     atualizarVisualizacaoHistorico();
    // });

    // // Limpa a visualização do histórico sem afetar o armazenamento
    // limparHistoricoButton.addEventListener('click', () => {
    //     historicoList.innerHTML = '';
    // });

    // Inicializa a visualização do histórico quando a página é carregada
    atualizarVisualizacaoHistorico();

    exibirRegistros();
});

function gerarHistorico() {
    // Buscar registros do localStorage
    let registros = JSON.parse(localStorage.getItem('usuarioLogado')).registros || [];
    let conteudoHistorico = document.getElementById('conteudo-historico');

    // Verificar se há registros
    if (registros.length === 0) {
        conteudoHistorico.textContent = 'Nenhum registro encontrado.';
    } else {
        // Criar uma string com todos os registros
        let historicoTexto = registros.map(registro => `${registro.tipo} - ${registro.hora}`).join('\n');
        conteudoHistorico.textContent = historicoTexto;
    }

    // Mostrar o dialog
    let dialog = document.getElementById('historico-dialog');
    dialog.showModal();
}

function fecharDialogo() {
    document.getElementById('historico-dialog').close();
}

// Atualizar o relógio a cada segundo
if(document.getElementById('clock') != undefined)
    setInterval(updateClock, 1000);

// Event listeners para os botões de entrada e saída
//   document.getElementById('green-button').addEventListener('click', () => registrarPonto('entrada'));
//   document.getElementById('gray-button').addEventListener('click', () => registrarPonto('saida'));

