let inputID;
let valorAtual;
let estado = document.getElementById("sitValue");
let dados = {
    matricula: { id: "matValue", valor: "Não informada" },
    nome: { id: "nomValue", valor: "Nome não informado" },
    endereco: { id: "endValue", valor: "Não informado" },
    disciplina: { id: "disValue", valor: "Não informada" },
    nota: { id: "notValue", valor: "Não registrada" },
    situacao: { id: "sitValue", valor: "Indefinida" }
};

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("matValue").focus();
    pegarDados();
    dados["situacao"].valor == null ? estado.value = "Em análise" : null;
});

function pegarDados() {
    resgatarDados();
    Object.keys(dados).forEach(inputs => {
        inputID = dados[inputs].id;
        valorAtual = document.getElementById(inputID).value;
    });
};

function salvarDados() {
    Object.keys(dados).forEach(salvar => {
        inputID = dados[salvar].id;
        valorAtual = document.getElementById(inputID).value;
        localStorage.setItem(salvar, valorAtual);
    });
};

function resgatarDados() {
    Object.keys(dados).forEach(restaurar => {
        inputID = dados[restaurar].id;
        if (localStorage.getItem(restaurar)) {
            document.getElementById(inputID).value = localStorage.getItem(restaurar);
            dados[restaurar].valor = localStorage.getItem(restaurar);
        };
    });
    document.getElementById("textoGerado").innerHTML = localStorage.getItem("texto");
};

criarTexto = () => {
    resgatarDados()
    msg = `${JSON.stringify(dados)};
    <instruções> 
        <- Dados de uma array do aluno ignore os nomes das ids e variáveis. Utilize as infos para criar um email de aprovado ou reprovado na escola Proz.
        Mande a mensagem pronta, sem assunto ou afins.
    </instruções>
    <dicas>
        Tá faltando algo? Diga que faltou, mas faça com os dados disponíveis.
        Adicione tags e estilos HTML para melhor formatação em dados importantes, mande o texto pronto para ser incorporado usando innerHTML, o body já está pronto (não escreva '''html''').
        Se a situação estiver como reprovado e a nota >= 5.6, foi um erro de digitação. O mín para passar é 5.6
        Se tiver endereço e estiver tudo certo com a nota e situação, diga que o certificado será entregue.
    </dicas>`;
    document.getElementById("textoGerado").textContent = "carregando..."
    puter.ai.chat(msg).then((IAtext) => {
        document.getElementById("textoGerado").innerHTML = IAtext;
        localStorage.setItem("texto", document.getElementById("textoGerado").innerHTML);
    }).catch(function () {
        document.getElementById("textoGerado").innerHTML = `O(a) ${dados["nome"].valor}, da matricula ${dados["matricula"].valor}, residente no endereço ${dados["endereco"].valor}, está ${dados["situacao"].valor} na disciplina ${dados["disciplina"].valor}, com nota final de ${dados["nota"].valor}.`;
        localStorage.setItem("texto", document.getElementById("textoGerado").innerHTML);
    });
};

defNotas = (notaAluno) => {
    notaAluno.value <= 5.5 ? estado.value = "Reprovado" : estado.value = "Aprovado";
    notaAluno.value == null ? estado.value = "Em análise" : null;
    notaAluno.value < 0 ? notaAluno.value = 0 : null;
    notaAluno.value >= 11 ? notaAluno.value = 10 : null;
};

limparDados = () => {
    Object.keys(dados).forEach(remover => {
        localStorage.clear(remover);
    });
    location.reload();
};

document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        let nextEl = document.querySelectorAll("input");
        let index = Array.prototype.indexOf.call(nextEl, document.activeElement);
        if (index > -1) {
            let jumpTo = nextEl[index + 1] || nextEl[0];
            jumpTo.focus();
        };
    };
});


/*  var i;
  for (i = 0; i < localStorage.length; i++) {
      console.log(localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
  }*/