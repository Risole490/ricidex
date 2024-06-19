// Random pokemon generator codes
export async function getPokeInfos() {
    try {
        const url = await getPokeURL();
        const response = await fetch(url);
        const data = await response.json();
        
        // Infos do pokémon
        const pokeID = data.id;
        const pokeName = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        const pokeHeight = data.height;
        const pokeWeight = data.weight;
        const pokeHability = data.abilities[0].ability.name.charAt(0).toUpperCase() + data.abilities[0].ability.name.slice(1).replace('-', ' ');
        
        // Infos do tipo do pokémon
        if(data.types.length > 1) {
            var pokeType1 = data.types[0].type.name.charAt(0).toUpperCase() + data.types[0].type.name.slice(1);
            var pokeType2 = data.types[1].type.name.charAt(0).toUpperCase() + data.types[1].type.name.slice(1);
        } else {
            var pokeType1 = data.types[0].type.name.charAt(0).toUpperCase() + data.types[0].type.name.slice(1);
            var pokeType2 = '';
        }

        // Infos da imagem do pokémon
        const pokeSpriteNormal = data.sprites.other['official-artwork'].front_default;
        const pokeSpriteShiny = data.sprites.other['official-artwork'].front_shiny;

        // Infos da geração do pokémon
        const pokeSpeciesURL = data.species.url;
        const responseSpecies = await fetch(pokeSpeciesURL);
        const dataSpecies = await responseSpecies.json();
        const pokeGenNumber = dataSpecies.generation.url.split('/').slice(-2)[0];

        return { pokeID, pokeName, pokeHeight, pokeWeight, pokeHability, pokeType1, pokeType2, pokeSpriteNormal, pokeSpriteShiny, pokeGenNumber };        
    } catch (error) {
        console.error(error);
    }
}

async function getPokeURL() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0')
        const data = await response.json();
        let randomPoke = Math.floor(Math.random() * data.results.length);
        return data.results[randomPoke].url;
    } catch (error) {
        console.error(error);
    }
}


// Search pokémon codes
