"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypes = exports.getPokemonByName = exports.getPokemonsByType = exports.getAllPokemons = exports.connect = void 0;
const mongodb_1 = require("mongodb");
const connectionString = "mongodb+srv://or:or123@cluster0.khg90.mongodb.net/?retryWrites=true&w=majority";
let client;
let pokeCollection;
const connect = async () => {
    client = new mongodb_1.MongoClient(connectionString);
    try {
        await client.connect();
        pokeCollection = client.db("pokemons-db").collection("pokemons");
        console.log("connected !");
    }
    catch (e) {
        throw "couldnt connect";
    }
};
exports.connect = connect;
const getAllPokemons = async () => {
    const cursor = pokeCollection.find();
    const pokemons = await cursor.toArray();
    return pokemons;
};
exports.getAllPokemons = getAllPokemons;
const getPokemonsByType = async (type) => {
    const cursor = pokeCollection.find({ types: type });
    const pokemons = await cursor.toArray();
    return pokemons;
};
exports.getPokemonsByType = getPokemonsByType;
const getPokemonByName = async (name) => await pokeCollection.findOne({ name: name });
exports.getPokemonByName = getPokemonByName;
const getTypes = async () => {
    const pokeTypesCollection = client
        .db("pokemons-db")
        .collection("poke-types");
    const typesCursor = pokeTypesCollection.find();
    return await typesCursor.toArray();
};
exports.getTypes = getTypes;
//# sourceMappingURL=dbHandler.js.map