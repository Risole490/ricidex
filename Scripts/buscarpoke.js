const secaoBuscarPoke = document.querySelector('#middle-spmon');
const botaoBuscarPoke = document.querySelector('#spmon-btn');
const inputBuscarPoke = document.querySelector('#spmon-input');
const inputShiny = document.querySelector('#input-shiny');

const erroBuscarPoke = document.querySelector('#spmon-erro');

import { buscarPokeURL } from './PokeAPI/pokes.js';

botaoBuscarPoke.addEventListener('click', async () => {
    erroBuscarPoke.style.opacity = '0';
 
    botaoBuscarPoke.classList.add('roda');
    botaoBuscarPoke.disabled = true;

    setTimeout(function() {
        botaoBuscarPoke.classList.remove('roda');
    }, 1000);

    const isShinyChecked = inputShiny.checked;
    const pokeBuscado = inputBuscarPoke.value.toLowerCase();
    
    if(pokeBuscado == '') {
        erroBuscarPoke.innerHTML = 'Digite um pokémon.';
        botaoBuscarPoke.disabled = false;
        erroBuscarPoke.style.opacity = '1';
        return;
    }

    try{
        const pokeInfos = await buscarPokeURL(pokeBuscado);

        if(pokeInfos === 'Pokémon não encontrado') {
            erroBuscarPoke.innerHTML = 'Pokémon não encontrado.';
            botaoBuscarPoke.disabled = false;
            erroBuscarPoke.style.opacity = '1';
            return;
        }

        let pokeName = pokeInfos.pokeName;
        let pokeHabilidade = pokeInfos.pokeHability;
        let pokeType1 = pokeInfos.pokeType1;
        let pokeType2 = pokeInfos.pokeType2;
        let pokeGenNumber = pokeInfos.pokeGenNumber;
        let pokeSprite;

        if(isShinyChecked) {
            pokeSprite = pokeInfos.pokeSpriteShiny;

        } else {
            pokeSprite = pokeInfos.pokeSpriteNormal;
        }

        if(pokeType2 == '') {
            secaoBuscarPoke.innerHTML = `
            <div class="spmon-header">
                <h2 class="spmon-nome">${pokeName}</h2>
            </div>

            <div class="section-middle-poke">
                <img src="${pokeSprite}" alt="Pokémon" class="spmon-img">

                <div class="spmon-infos">
                    <p class="spmon-tipo ${pokeType1}">${pokeType1}</p>
                    <p class="spmon-info">Habilidade: <span>${pokeHabilidade}</span></p>
                    <p class="spmon-info
                    ">Geração <span>${pokeGenNumber}</span></p>
                </div>
            </div>
            `;

            if(isShinyChecked) {
                const secaoBuscarPokeHeader = document.querySelector('.spmon-header');
                secaoBuscarPokeHeader.innerHTML += `
                    <p class="spmon-shiny" id="spmon-shiny">Shiny!</p>
                `;
            }

        } else {
            secaoBuscarPoke.innerHTML = `
            <div class="spmon-header">
                <h2 class="spmon-nome">${pokeName}</h2>
            </div>

            <div class="section-middle-poke">
                <img src="${pokeSprite}" alt="Pokémon" class="spmon-img">

                <div class="spmon-infos">
                    <p class="spmon-tipo ${pokeType1}">${pokeType1}</p>
                    <p class="spmon-tipo
                    ${pokeType2}">${pokeType2}</p>
                    <p class="spmon-info">Habilidade: <span>${pokeHabilidade}</span></p>
                    <p class="spmon-info
                    ">Geração <span>${pokeGenNumber}</span></p>
                </div>
            </div>
            `;

            if(isShinyChecked) {
                const secaoBuscarPokeHeader = document.querySelector('.spmon-header');
                secaoBuscarPokeHeader.innerHTML += `
                    <p class="spmon-shiny" id="spmon-shiny">Shiny!</p>
                `;
            }
        }

        setTimeout(function() {
            botaoBuscarPoke.disabled = false;
        }, 5000);
    } catch(error) {
        erroBuscarPoke.innerHTML = 'Pokémon não encontrado.';
    }
});