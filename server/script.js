const axios = require("axios").default;
const fs = require("fs");
const { type } = require("os");
const path = require("path");
const process = require("process");
console.log(path.join(__dirname, "data.json"));
const dataPath = path.join(__dirname, "./data.json");
const throat = require("throat");
const [operation, amount, start] = process.argv.slice(2);

const fetchTopPokemons = async (n, start = 1) => {
    const allPokemons = [];
    const urls = [];
    for (let i = start; i <= n + start; i++) {
        urls.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
    }
    const data = Promise.all(
        urls.map(throat(10, (url) => fetchPokemon(url, allPokemons)))
    );
    return allPokemons;
};

const fetchPokemon = (url, allPokemons) => {
    axios
        .get(url)
        .then((res) => {
            const { name, id, height, weight, types } = res.data;
            const pokemon = {
                name,
                id,
                height,
                weight,
                img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
                types: types.map((typeSlot) => typeSlot.type.name),
            };
            console.log(
                `####       loaded pokemon ${name} id:${id} from: ${url}    ####`
            );
            allPokemons.push(pokemon);
            fs.writeFileSync(dataPath, JSON.stringify(allPokemons));
        })
        .catch((err) => console.log(`###        ERROR: ${err}     ###`));
};

const mix = () => {
    const pokemons = JSON.parse(
        fs.readFileSync(dataPath, { encoding: "utf-8" })
    );
    const pokefusion = [];
    const maxId = pokemons.length + 1;
    for (let i = 0; i < pokemons.length; i++) {
        const firstPokemon = pokemons[i];
        for (let j = i + 1; j < pokemons.length; j++) {
            const secondPokemon = pokemons[j];
            const newName =
                firstPokemon.name.substr(
                    0,
                    parseInt(firstPokemon.name.length / 2)
                ) +
                secondPokemon.name.substr(
                    parseInt(secondPokemon.name.length / 2),
                    secondPokemon.name.length - 1
                );
            pokefusion.push({
                id: maxId,
                name: newName,
                weight: firstPokemon.weight,
                height: secondPokemon.height,
                img: firstPokemon.img,
                types: [],
            });
        }
    }
    fs.writeFileSync(
        "./data.json",
        JSON.stringify([...pokemons, ...pokefusion])
    );
};
if (operation === "display") {
    const getAllIds = () => {
        const pokemons = JSON.parse(
            fs.readFileSync(dataPath, { encoding: "utf-8" })
        );

        return pokemons.map((element) => element.id);
    };

    const allIDs = getAllIds();
    console.log(
        "max : ",
        allIDs.reduce((prev, curr) => (prev >= curr ? prev : curr), 1)
    );
    console.log("amount: ", allIDs.length);
}

if (operation === "fetch") {
    fetchTopPokemons(
        amount ? parseInt(amount) - 1 : 100,
        start ? parseInt(start) : 1
    );
}

if (operation === "mix") {
    mix();
}
