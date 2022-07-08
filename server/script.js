const axios = require("axios").default;
const fs = require("fs");

const fetchTopPokemons = async (n, start = 1) => {
    const allPokemons = [];
    for (let i = start; i <= n + start; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        axios
            .get(url)
            .then((res) => {
                const { name, id, height, weight } = res.data;
                const pokemon = {
                    name,
                    id,
                    height,
                    weight,
                    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
                };
                console.log(
                    `####       loaded pokemon ${name} id:${id} from: ${url}    ####`
                );
                allPokemons.push(pokemon);
                fs.writeFileSync("./data.json", JSON.stringify(allPokemons));
            })
            .catch((err) => console.log(`###        ERROR: ${err}     ###`));
    }
    return allPokemons;
};

// fetchTopPokemons(998, 1);

const getAllIds = () => {
    const pokemons = JSON.parse(
        fs.readFileSync("./data.json", { encoding: "utf-8" })
    );

    return pokemons.map((element) => element.id);
};

const allIDs = getAllIds();
console.log(allIDs.reduce((prev, curr) => (prev >= curr ? prev : curr), 1));
console.log(allIDs.length);
