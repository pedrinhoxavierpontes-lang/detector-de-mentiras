
let sim = 0;
let nao = 0;
let perguntaAtual = 0;

const perguntas = [
    "Você sabe quem é a vítima?",
    "Você sabe onde foi o local do crime?",
    "Você viu alguma coisa no dia do crime?",
    "Você estava perto da cena do crime?",
    "Você se considera inocente em relação ao caso?",
    "Você tinha alguma relação com a vítima?",
    "Você acha que a vítima era uma boa pessoa?",
    "Você acha que ela merecia o destino que teve?",
    "Você está mentindo?",
    "Você é o assassino?"
];

const inicio = document.getElementById("inicio");
const interrogatorio = document.getElementById("interrogatorio");
const resultado = document.getElementById("resultado");

function mostrarTela(tela) {
    inicio.classList.remove("ativa");
    interrogatorio.classList.remove("ativa");
    resultado.classList.remove("ativa");

    tela.classList.add("ativa");
}

function iniciarInterrogatorio() {
    sim = 0;
    nao = 0;
    perguntaAtual = 0;

    mostrarTela(interrogatorio);
    mostrarPergunta();
}

function mostrarPergunta() {
    document.getElementById("pergunta").textContent =
        perguntas[perguntaAtual];

    document.getElementById("contador").textContent =
        (perguntaAtual + 1) + " / 10";

    document.getElementById("numero-pergunta").textContent =
        "Pergunta " + (perguntaAtual + 1);

    document.getElementById("progresso").style.width =
        ((perguntaAtual + 1) / 10 * 100) + "%";
}

function responder(resposta) {
    if (resposta === "sim") {
        sim += 1;
    } else if (resposta === "nao") {
        nao += 1;
    } else {
        alert("Resposta inválida.");
        return;
    }

    perguntaAtual += 1;

    if (perguntaAtual < 10) {
        mostrarPergunta();
    } else {
        finalizarInterrogatorio();
    }
}

function finalizarInterrogatorio() {
    mostrarTela(resultado);

    document.getElementById("total-sim").textContent = sim;
    document.getElementById("total-nao").textContent = nao;

    let classificacao = document.getElementById("classificacao");
    let mensagem = document.getElementById("mensagem-resultado");

    if (sim === 10 || sim === 9) {
        classificacao.textContent = "Culpado";
        mensagem.textContent = "Culpado, você está preso!";
    } else if (sim >= 6 && sim <= 8) {
        classificacao.textContent = "Cúmplice";
        mensagem.textContent =
            "Você está preso, buscaremos o criminoso principal!";
    } else if (sim === 5) {
        classificacao.textContent = "Suspeito";
        mensagem.textContent =
            "Você é um suspeito, estamos de olho.";
    } else {
        classificacao.textContent = "Inocente";
        mensagem.textContent =
            "Você está livre para ir.";
    }
}

document.getElementById("iniciar").addEventListener("click", iniciarInterrogatorio);

document.getElementById("responder-sim").addEventListener("click", function() {
    responder("sim");
});

document.getElementById("responder-nao").addEventListener("click", function() {
    responder("nao");
});

document.getElementById("reiniciar").addEventListener("click", iniciarInterrogatorio);
