const meioQuiz = document.getElementById('meio-quiz');
const btnIniciarQuiz = document.getElementById('btn-iniciar-quiz');

let temporestante = 10;
let HP = 100;
let intervalo;

import { getPokeInfos } from './PokeAPI/pokes.js';

async function atualizaTempo() {
    if(temporestante > 0) {
        temporestante--;
        document.getElementById('quiz-header-tempo').textContent = temporestante;
    } else {
        let pokemon = await buscaPokemon();
        temporestante = 10; // Reinicia o tempo
        HP -= 10; // Diminui a vida

        meioQuiz.innerHTML = `
        <div class="middle-quiz-pokemon">
            <h1 class="quiz-pokemon-nome" id="quiz-pokemon-nome">?</h1>
            <img src="${pokemon.pokeSprite}" alt="Pokémon do quiz" class="quiz-pokemon-img" id="quiz-pokemon-img">
        </div>
        `;

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
    } else {
        pokeSprite = pokeInfos.pokeSpriteNormal;
    }

    return { pokeName, pokeSprite };
}

async function iniciaQuiz(){
    try{
        let pokemon = await buscaPokemon();   

        temporestante = 10;
        HP = 100;
        document.getElementById('quiz-bottom-life').textContent = HP;
        document.getElementById('quiz-header-tempo').textContent = temporestante;
        habilitaElementos();
        
        meioQuiz.innerHTML = `
        <div class="middle-quiz-pokemon">
            <h1 class="quiz-pokemon-nome" id="quiz-pokemon-nome">?</h1>
            <img src="${pokemon.pokeSprite}" alt="Pokémon do quiz" class="quiz-pokemon-img" id="quiz-pokemon-img">
        </div>
        `;

        intervalo = setInterval(atualizaTempo, 1000);
    } catch(err) {
        console.error(err);
    }
}

function finalizaQuiz(){
    clearInterval(intervalo);
    meioQuiz.innerHTML = '';
    alert('Fim de jogo! Tempo esgotado');
}

btnIniciarQuiz.addEventListener('click', iniciaQuiz);