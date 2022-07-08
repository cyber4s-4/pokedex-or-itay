const axios = require("axios").default;
const fs = require("fs");
const fetchTopPokemons = async (n, start = 1) => {
    const allPokemons = [];
    for (let i = start; i <= n; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        const fetchedInfo = (await axios.get(url)).data;
        const { name, id, height, weight } = fetchedInfo;
        const pokemon = {
            name,
            id,
            height,
            weight,
            img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        };
        allPokemons.push(pokemon);
        console.log(`####       loaded pokemon ${name} id:${id}     ####`);
    }
    return allPokemons;
};

fetchTopPokemons(200, 101).then((data) => {
    fs.appendFileSync("./data.json", JSON.stringify(data));
});
