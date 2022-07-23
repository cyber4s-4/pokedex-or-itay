"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPokemonsByType = exports.getAllPokemonTypes = exports.getPokemonByName = exports.Pokemon = void 0;
class Pokemon {
    constructor(name, weight, height, img, id, types) {
        if (weight < 0 || height < 0) {
            throw new TypeError("weight & height must be bigger then 0");
        }
        if (!name) {
            throw new TypeError("can not execpt empty name");
        }
        if (!img) {
            throw new TypeError("can not execpt empty image");
        }
        this.name = name;
        this.weight = weight;
        this.height = height;
        this.img = img;
        this.id = id;
        this.types = types;
    }
}
exports.Pokemon = Pokemon;
/**
 *
 * Beaware - async function. means it`ll run seperately if you will not
 * use it with await.
 *
 * this function gets the name of the pokemon and returns a Promise with
 * the pokemon's object.
 *
 */
const getPokemonByName = async (pokemonName) => {
    const BASE_URL = "/pokemon/";
    // ask from the api to give me a json object about my pokemon
    const response = await fetch(BASE_URL + pokemonName);
    console.log(response);
    const pokemonValues = await response.json();
    // get the values from the body of the response.
    const weight = pokemonValues.weight;
    const height = pokemonValues.height;
    const name = pokemonValues.name;
    const id = pokemonValues.index;
    const types = pokemonValues.types;
    const img = pokemonValues.img;
    console.log(img);
    return new Pokemon(name, weight, height, img, id, types);
};
exports.getPokemonByName = getPokemonByName;
const getAllPokemonTypes = async () => {
    const response = await (await fetch("/types")).json();
    return response;
};
exports.getAllPokemonTypes = getAllPokemonTypes;
const getPokemonsByType = async (typeName) => {
    const response = await (await fetch("/pokemons/" + typeName)).json();
    return response;
};
exports.getPokemonsByType = getPokemonsByType;
//# sourceMappingURL=Pokemon.js.map