var engine =  {
    "cores":['green','purple','pink','red','yellow','orange','grey','blue',],
    "hexadecimais":{
        'green':'#02ef00',
        'purple':'#790093',
        'red':'#E90808',
        'yellow':'#E7D703',
        'black':'#141414',
        'orange':'#F16529',
        'grey':'#EBEBEB',
        'pink':'#F02A7E',
        'blue':'#0000FF'
    },
    "moedas":0
}
const audioMoeda= new Audio('audio/audio_moeda.mp3');
const audioErrou = new Audio('audio/audio_errou.mp3');

function sortearCor(){
    var indexCorSorteada = Math.floor(Math.random() * engine.cores.length)
    var legendaCorDaCaixa = document.getElementById('cor-na-caixa')
    var nomeCorSorteada = engine.cores[indexCorSorteada];

    legendaCorDaCaixa.innerText = nomeCorSorteada.toUpperCase();

    return engine.hexadecimais[nomeCorSorteada];
}

function aplicarCorNaCaixa(nomeDaCor){
    var caixaDasCores = document.getElementById('cor-atual')
    
    caixaDasCores.style.backgroundColor = nomeDaCor;
    caixaDasCores.style.backgroundImage="url('imgs/caixa-fechada.png')";
    caixaDasCores.style.backgroundSize="100%";

}

function atualizaPontuacao(valor){
    var pontuacao = document.getElementById('pontuacao-atual');

    engine.moedas += valor;

    if(valor < 0){
        audioErrou.play();
    }else{
        audioMoeda.play();
    }
    pontuacao.innerText = engine.moedas;
}
aplicarCorNaCaixa(sortearCor())
//API DE RECONHECIMENTO DE VOZ
var btnGravador = document.getElementById("btn-responder");
var transcricaoAudio = "";
var respostaCorreta="";

if(window.SpeechRecognitionAlternative || window.webkitSpeechRecognition){
    var SpeechApi = window.SpeechRecognitionAlternative || window.webkitSpeechRecognition;
    var gravador = new SpeechApi();

    gravador.continuos = false;
    gravador.lang = "en-US"



gravador.onstart = function(){
    btnGravador.innerText = "Estou Ouvindo";

    btnGravador.style.backgroundColor = "white";
    btnGravador.style.color = "black";

}

gravador.onend= function(){
    btnGravador.innerText = "Responder";

    btnGravador.style.backgroundColor = "transparent";
    btnGravador.style.color = "white";
}

gravador.onresult = function(event){
    transcricaoAudio = event.results[0][0].transcript.toUpperCase();
    respostaCorreta = document.getElementById('cor-na-caixa').innerText.toUpperCase();

    if(transcricaoAudio === respostaCorreta){
        atualizaPontuacao(1);
    }else{
        atualizaPontuacao(-1);
    }
    console.log(transcricaoAudio)

    aplicarCorNaCaixa(sortearCor());
}

}else{
    alert('nao tenho suporte');
}

btnGravador.addEventListener('click', function(e){
    gravador.start();
})