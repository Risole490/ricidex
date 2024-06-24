const secaoGerarPoke = document.querySelector('#middle-gmon');
const botaoGerarPoke = document.querySelector('#gmon-btn');

const erroGerarPoke = document.querySelector('#gmon-erro');

import { getPokeInfos } from './PokeAPI/pokes.js';

function chanceShiny() {
    let chance = Math.floor(Math.random() * 100); // 0 a 99
    if(chance <= 1) { // 1% de chance
        return true;
    } else {
        return false;
    }
}

botaoGerarPoke.addEventListener('click', async () => {
    botaoGerarPoke.classList.add('roda');
    botaoGerarPoke.disabled = true;

    setTimeout(function() {
        botaoGerarPoke.classList.remove('roda');
    }, 1000);

    try{
        const pokeInfos = await getPokeInfos();
        
        let pokeName = pokeInfos.pokeName;
        let pokeHability = pokeInfos.pokeHability;
        let pokeGenNumber = pokeInfos.pokeGenNumber;
        let pokeType1 = pokeInfos.pokeType1;
        let pokeType2 = pokeInfos.pokeType2;
        let pokeSprite = pokeInfos.pokeSpriteNormal;
        let pokeSpriteShiny = pokeInfos.pokeSpriteShiny;

        if(chanceShiny()) {
            pokeSprite = pokeSpriteShiny;
        } else {
            pokeName = pokeName;
        }

        if(pokeType2 == '') {
            secaoGerarPoke.innerHTML = `
            <div class="gmon-header">
                <h2 class="gmon-nome">${pokeName}</h2>
            </div>

            <div class="section-middle-poke">
                <img src="${pokeSprite}" alt="Pokémon" class="gmon-img">

                <div class="gmon-infos">
                    <p class="gmon-tipo ${pokeType1}">${pokeType1}</p>
                    <p class="gmon-info">Habilidade: <span>${pokeHability}</span></p>
                    <p class="gmon-info">Geração <span>${pokeGenNumber}</span></p>
                </div>
            </div>
         `;

            if(chanceShiny()) {
                const secaoGerarPokeHeader = document.querySelector('.gmon-header');
                secaoGerarPokeHeader.innerHTML += `
                    <p class="gmon-shiny" id="gmon-shiny">Shiny!</p>
                `;
            }

        } else {
            secaoGerarPoke.innerHTML = `
            <div class="gmon-header">
                <h2 class="gmon-nome">${pokeName}</h2>
            </div>

            <div class="section-middle-poke">
                <img src="${pokeSprite}" alt="Pokémon" class="gmon-img">

                <div class="gmon-infos">
                    <p class="gmon-tipo ${pokeType1}">${pokeType1}</p>
                    <p class="gmon-tipo ${pokeType2}">${pokeType2}</p>
                    <p class="gmon-info">Habilidade: <span>${pokeHability}</span></p>
                    <p class="gmon-info">Geração <span>${pokeGenNumber}</span></p>
                </div>
            
            </div>
            `;

            if(chanceShiny()) {
                const secaoGerarPokeHeader = document.querySelector('.gmon-header');
                secaoGerarPokeHeader.innerHTML += `
                    <p class="gmon-shiny" id="gmon-shiny">Shiny!</p>
                `;
            }
        }

        setTimeout(function() {
            botaoGerarPoke.disabled = false;
        }, 5000);

    } catch (error) {
        console.error(error);
        erroGerarPoke.style.opacity = '1';
    }
});