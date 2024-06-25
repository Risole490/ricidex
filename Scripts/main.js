const iconeMenuMobile = document.getElementById('menu_mobile_icon');

const pokeDoDiaNome = document.getElementById('pdd-nome');
const pokeDoDiaSkill = document.getElementById('pdd-skill');
const pokeDoDiaGen = document.getElementById('pdd-gen');
const pokeDoDiaAltura = document.getElementById('pdd-altura');
const pokeDoDiaPeso = document.getElementById('pdd-peso');
const pokeDoDiaTipo1 = document.getElementById('pdd-tipo1-txt');
const pokeDoDiaTipo1Div = document.getElementById('pdd-tipo1-div');
const pokeDoDiaTipo2 = document.getElementById('pdd-tipo2-txt');
const pokeDoDiaTipo2Div = document.getElementById('pdd-tipo2-div');

const pokeDoDiaSprite = document.getElementById('pdd-sprite-normal');
const pokeDoDiaSpriteShiny = document.getElementById('pdd-sprite-shiny');

// Adiciona o evento de click no ícone do menu mobile
iconeMenuMobile.addEventListener('click', () => {
    const menuMobile = document.getElementById('menu_mobile_content');// Pega o menu mobile
    menuMobile.classList.toggle('menu-mobile-content--ativo');// Adiciona ou remove a classe que exibe o menu mobile
});

import { getPokeInfos } from './PokeAPI/pokes.js';

function formataAltura(altura){
    let metros = altura / 10;

    return `${metros}m`;
}

function formataPeso(peso){
    let quilos = peso / 10;

    return `${quilos}kg`;
}

async function pokeDoDia(){ // Função que exibe o Pokémon do dia
    try{
        let pokemon = await getPokeInfos();

        let pokePeso = formataPeso(pokemon.pokeWeight);
        let pokeAltura = formataAltura(pokemon.pokeHeight);

        pokeDoDiaNome.textContent = pokemon.pokeName;
        pokeDoDiaSkill.textContent = pokemon.pokeHability;
        pokeDoDiaGen.textContent = pokemon.pokeGenNumber;
        pokeDoDiaAltura.textContent = pokeAltura;
        pokeDoDiaPeso.textContent = pokePeso;
        pokeDoDiaSprite.src = pokemon.pokeSpriteNormal;
        pokeDoDiaSpriteShiny.src = pokemon.pokeSpriteShiny;

        verificaTipos(pokemon.pokeType1, pokemon.pokeType2);

        // Salva a data do pokemon do dia no localStorage
        const agora = new Date();
        localStorage.setItem('dataPokeDoDia', agora.toDateString());

        // Salva o pokemon do dia no localStorage
        localStorage.setItem('pokeDoDia', JSON.stringify(pokemon));
        
    } catch(error){
        console.error(error);
    }
}

function carregaPokeDoDia() {
    const pokemonSalvo = localStorage.getItem('pokeDoDia');
    const dataSalva = localStorage.getItem('dataPokeDoDia');
    const dataAtual = new Date().toDateString();

    if (pokemonSalvo && dataSalva === dataAtual) {
        const pokemon = JSON.parse(pokemonSalvo);

        let pokePeso = formataPeso(pokemon.pokeWeight);
        let pokeAltura = formataAltura(pokemon.pokeHeight);

        pokeDoDiaNome.textContent = pokemon.pokeName;
        pokeDoDiaSkill.textContent = pokemon.pokeHability;
        pokeDoDiaGen.textContent = pokemon.pokeGenNumber;
        pokeDoDiaAltura.textContent = pokeAltura;
        pokeDoDiaPeso.textContent = pokePeso;
        pokeDoDiaSprite.src = pokemon.pokeSpriteNormal;
        pokeDoDiaSpriteShiny.src = pokemon.pokeSpriteShiny;

        verificaTipos(pokemon.pokeType1, pokemon.pokeType2);
    } else {
        // Se não houver dados salvos, chama pokeDoDia para obter e exibir um novo Pokémon
        pokeDoDia();
    }

    agendarPokeDoDia();
}

function verificaTipos(tipo1, tipo2){
    if(tipo2 === ''){
        pokeDoDiaTipo1.textContent = tipo1;
        pokeDoDiaTipo1Div.classList.add(`${tipo1.toLowerCase()}`);

        pokeDoDiaTipo2Div.classList.add('inativo');
    } else {
        pokeDoDiaTipo1.textContent = tipo1;
        pokeDoDiaTipo1Div.classList.add(`${tipo1.toLowerCase()}`);

        pokeDoDiaTipo2.textContent = tipo2;
        pokeDoDiaTipo2Div.classList.add(`${tipo2.toLowerCase()}`);
    }
}

function agendarPokeDoDia() {
    const agora = new Date();
    const proximo = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate() + 1);
    proximo.setHours(0, 0, 0, 0); // Define a data para o próximo dia às 00:00:00
    const espera = proximo - agora;

    setTimeout(function() {
        pokeDoDia();
        agendarPokeDoDia();
    }, espera);
}

document.addEventListener('DOMContentLoaded', carregaPokeDoDia);

