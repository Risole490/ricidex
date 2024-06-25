const meioQuiz = document.getElementById('meio-quiz');
const btnIniciarQuiz = document.getElementById('btn-iniciar-quiz');
const quizMensagem = document.getElementById('quiz-resposta-msg');

let temporestante = 10;
let HP = 100;
let intervalo;
let respostaCorreta = '';
let streak = 0;
let streakMax = 0;
let tentativas = 0;

import { getPokeInfos } from './PokeAPI/pokes.js';



async function atualizaTempo() {
    if(temporestante > 0) {
        temporestante--;
        document.getElementById('quiz-header-tempo-text-num').textContent = temporestante;
    } else {
        let pokemon = await buscaPokemon();
        respostaCorreta = pokemon.pokeName;
        respostaCorreta = respostaCorreta.toLowerCase();
        temporestante = 11; // Reinicia o tempo
        HP -= 5; // Diminui a vida

        document.getElementById('quiz-pokemon-nome').textContent = '?';
        document.getElementById('quiz-pokemon-img').src = pokemon.pokeSprite;

        document.getElementById('quiz-bottom-life').textContent = HP;
        if(HP <= 0) {
            finalizaQuiz();
            alert('Fim de jogo! O HP acabou');
        }
    }
}

function habilitaElementos() {
    document.getElementById('quiz-header-tempo').classList.remove('inativo');
    document.getElementById('btn-finalizar-quiz').classList.remove('inativo');
    document.getElementById('bottom-quiz-iniciado').classList.remove('inativo');
    btnIniciarQuiz.classList.add('inativo');

    document.getElementById('quiz-regras').classList.add('inativo');
}

function chanceShiny() {
    let chance = Math.floor(Math.random() * 100); // 0 a 99
    if(chance <= 1) { // 1% de chance
        return true;
    } else {
        return false;
    }
}

async function buscaPokemon(){
    let pokeInfos = await getPokeInfos();
    let pokeName = pokeInfos.pokeName;
    let pokeSprite = '';
    if(chanceShiny()) {
        pokeSprite = pokeInfos.pokeSpriteShiny;
        rodadaShiny = true;    
    } else {
        pokeSprite = pokeInfos.pokeSpriteNormal;
    }

    return { pokeName, pokeSprite };
}

async function iniciaQuiz(){
    try{
        let pokemon = await buscaPokemon();
        respostaCorreta = formataResposta(pokemon.pokeName);
        respostaCorreta = respostaCorreta.toLowerCase();

        temporestante = 10;
        HP = 100;
        document.getElementById('quiz-bottom-life').textContent = HP;
        document.getElementById('quiz-header-tempo-text-num').textContent = temporestante;
        
        meioQuiz.innerHTML = `
        <div class="middle-quiz-pokemon" id="middle-quiz-pokemon">
            <h1 class="quiz-pokemon-nome" id="quiz-pokemon-nome">?</h1>
            <img src="${pokemon.pokeSprite}" alt="Pokémon do quiz" class="quiz-pokemon-img" id="quiz-pokemon-img">
        </div>
        `;

        intervalo = setInterval(atualizaTempo, 1000); // A cada 1 segundo atualiza o tempo do quiz
    } catch(err) {
        console.error(err);
    }
}

function formataResposta(nome){
    if(nome.includes('-')){
        let nomeFormatado = nome.split('-'); // Exemplo: 'mr-mime' -> ['mr', 'mime']
        nomeFormatado = nomeFormatado.join(' '); // ['mr', 'mime'] -> 'mr mime'
        return nomeFormatado; // 'mr mime'
    } else if (nome.includes('-mega')){ // Exemplo: 'charizard-mega-x' -> 'charizard mega x'
        let nomeFormatado = nome.split('-'); // ['charizard', 'mega', 'x']
        nomeFormatado = nomeFormatado.join(' '); // ['charizard', 'mega', 'x'] -> 'charizard mega x'
        return nomeFormatado; // 'charizard mega x'
    } 
    return nome;
}


async function continuaQuiz(){
    quizMensagem.textContent = '';
    document.getElementById('quiz-input').value = '';

    try {
        let pokemon = await buscaPokemon();
        respostaCorreta = formataResposta(pokemon.pokeName);
        respostaCorreta = respostaCorreta.toLowerCase();
        
        temporestante = 10;

        document.getElementById('quiz-header-tempo-text-num').textContent = temporestante;
        document.getElementById('quiz-pokemon-nome').textContent = '?';
        document.getElementById('quiz-pokemon-img').src = pokemon.pokeSprite;
    } catch(err) {
        console.error(err);
    }
}

function finalizaQuiz(){
    clearInterval(intervalo);
    meioQuiz.innerHTML = `
    <div class="middle-quiz-finalizado" id="middle-quiz-finalizado">
        <h1 class="quiz-finalizado-msg">Fim de jogo!</h1>
        <h2 class="quiz-finalizado-streak">Melhor sequência: ${streakMax}</h2>
        <button class="btn-reiniciar-quiz" id="btn-reinicia-quiz">Jogar novamente</button>
    </div>
    `;

    document.getElementById('quiz-header-tempo').classList.add('inativo');
    document.getElementById('btn-finalizar-quiz').classList.add('inativo');
    document.getElementById('bottom-quiz-iniciado').classList.add('inativo');
    document.getElementById('quiz-input').classList.add('inativo');

    document.getElementById('btn-reinicia-quiz').addEventListener('click', (e) => {
        e.preventDefault();
        habilitaElementosReinicio();
        iniciaQuiz();
    })
};

function habilitaElementosReinicio(){
    document.getElementById('quiz-header-tempo').classList.remove('inativo');
    document.getElementById('btn-finalizar-quiz').classList.remove('inativo');
    document.getElementById('bottom-quiz-iniciado').classList.remove('inativo');
    document.getElementById('quiz-input').classList.remove('inativo');
    document.getElementById('middle-quiz-finalizado').classList.add('inativo');
}

function pulaQuiz(){
    if(HP > 10){
        HP -= 10;
    } else if(HP > 0 && HP <= 10){
        HP = 0;
    } else {
        finalizaQuiz();
    }

    continuaQuiz();
    document.getElementById('quiz-input').value = '';
    document.getElementById('quiz-bottom-life').textContent = HP;
}

function verificaResposta(){
    btnResponder.disabled = false;

    let respostaUsuario = document.getElementById('quiz-input').value;
    respostaUsuario = respostaUsuario.toLowerCase();
    tentativas++;
    
    if(respostaUsuario === '') {
        return;
    } else if((respostaUsuario === respostaCorreta || (respostaCorreta.includes(respostaUsuario) && respostaUsuario.length === respostaCorreta.length)) && respostaUsuario){
        document.getElementById('quiz-pokemon-nome').textContent = respostaCorreta.charAt(0).toUpperCase() + respostaCorreta.slice(1);
        document.getElementById('quiz-input').value = '';
        quizMensagem.textContent = 'Correto!';
        
        if(HP < 100 || tentativas === 1) {
            HP += 5;
            if(HP > 100) HP = 100;
            document.getElementById('quiz-bottom-life').textContent = HP;
        } else if( HP < 100 && tentativas > 1) {
            HP += 1;
            if(HP > 100) HP = 100;
            document.getElementById('quiz-bottom-life').textContent = HP;
        }

        tentativas = 0;
        streak++;
        setTimeout(continuaQuiz, 1000);
    } else {
        if(HP > 0) {
            document.getElementById('quiz-input').value = '';
            quizMensagem.textContent = 'Incorreto!';
            HP -= 1;
            document.getElementById('quiz-bottom-life').textContent = HP;

            if(streak > streakMax) {
                streakMax = streak;
            }
            streak = 0;
        } else {
            finalizaQuiz();
            alert('Fim de jogo! O HP acabou');
        }
    }
}

btnIniciarQuiz.addEventListener('click', (e) => {
    e.preventDefault();

    habilitaElementos();
    iniciaQuiz();
});
document.getElementById('btn-pular-quiz').addEventListener('click', pulaQuiz);
document.getElementById('btn-finalizar-quiz').addEventListener('click', finalizaQuiz);

const btnResponder = document.getElementById('btn-responder-quiz');

btnResponder.addEventListener('click', () => {
    btnResponder.classList.add('roda');

    setTimeout(function() {
        btnResponder.classList.remove('roda');
    }, 1000);
    verificaResposta();
});

document.getElementById('quiz-input').addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        e.preventDefault();
        btnResponder.classList.add('roda');

        setTimeout(function() {
            btnResponder.classList.remove('roda');
        }, 1000);
        verificaResposta();
    }
});