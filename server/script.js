const axios = require("axios").default;
const fs = require("fs");
const path = require("path");
const process = require("process");
console.log(path.join(__dirname, "data.json"));
const dataPath = path.join(__dirname, "./data.json");
const throat = require("throat");
const [operation, amount, start] = process.argv.slice(2);
const connectionString =
    "postgres://ykbwshvxovughu:c2e24154034296fba61f0e43d47f3096f2ad3fda336b54fe9240e022a6426f18@ec2-54-208-104-27.compute-1.amazonaws.com:5432/d14vjkjb53tnve";
const postgres = require("pg");
const client = new postgres.Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
});

const generateID = (id) => {
    if (id > 905) {
        const newId = id - 904;
        return 10000 + newId;
    }
    return id;
};

const fetchTopPokemons = async (n, start = 1) => {
    const allPokemons = [];
    const urls = [];
    for (let i = start; i <= n + start; i++) {
        urls.push(`https://pokeapi.co/api/v2/pokemon/${generateID(i)}`);
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
                index: id,
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
    let maxId = pokemons.length + 1;
    for (let i = 0; i < pokemons.length; i++) {
        const firstPokemon = pokemons[i];
        for (let j = i + 1; j < pokemons.length; j++) {
            maxId++;
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
            const newPokemon = {
                index: maxId,
                name: newName,
                weight: firstPokemon.weight,
                height: secondPokemon.height,
                img: firstPokemon.img,
                types: [...firstPokemon.types, ...secondPokemon.types],
            };
            pokefusion.push(newPokemon);
        }
    }
    fs.writeFileSync(dataPath, JSON.stringify([...pokemons, ...pokefusion]));
};

const insertToDb = async () => {
    await client.connect();
    const pokemons = JSON.parse(
        fs.readFileSync(dataPath, { encoding: "utf-8" })
    );

    for (let pokemon of pokemons) {
        await client
            .query("INSERT INTO pokemons VALUES($1, $2, $3, $4, $5, $6 );", [
                pokemon.index,
                pokemon.name,
                pokemon.weight,
                pokemon.height,
                pokemon.img,
                pokemon.types,
            ])
            .catch((err) => console.log(err));
    }

    await client.end();
};

if (operation === "display") {
    const getAllIds = () => {
        const pokemons = JSON.parse(
            fs.readFileSync(dataPath, { encoding: "utf-8" })
        );

        return pokemons.map((element) => element.index);
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

if (operation === "insert") {
    insertToDb();
}
