const axios = require("axios").default;
const fs = require("fs");
const path = require("path");
const process = require("process");
console.log(path.join(__dirname, "data.json"));
const dataPath = path.join(__dirname, "./data.json");
const throat = require("throat");
const { MongoClient } = require("mongodb");
const [operation, amount, start] = process.argv.slice(2);
const connectionString =
    "mongodb+srv://or:or123@cluster0.khg90.mongodb.net/?retryWrites=true&w=majority";

// const client = new MongoClient(connectionString);

// client.connect(async () => {
//     const pokeDB = client.db("pokemons-db");
//     const pokeCollection = pokeDB.collection("pokemons");
// });

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
    const client = new MongoClient(connectionString);

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
    client.connect(async () => {
        const pokeDB = client.db("pokemons-db");
        const pokeCollection = pokeDB.collection("pokemons");
        await pokeCollection.insertMany([...pokemons, ...pokefusion]);
        client.close();
    });
};

const loadTypes = async () => {
    const pokemons = JSON.parse(
        fs.readFileSync(dataPath, { encoding: "utf-8" })
    );

    const types = [...new Set(pokemons.map((pokemon) => pokemon.types).flat())];
    const client = new MongoClient(connectionString);
    await client.connect();
    const typesCollection = client.db("pokemons-db").collection("poke-types");
    await typesCollection.insertMany(
        types.map((type) => {
            return { type };
        })
    );
    client.close();
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

loadTypes();
