export class Pokemon {
    name: string;
    weight: number;
    height: number;
    img: string;
    id: number;
    types: string[];

    constructor(
        name: string,
        weight: number,
        height: number,
        img: string,
        id: number,
        types: string[]
    ) {
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
/**
 *
 * Beaware - async function. means it`ll run seperately if you will not
 * use it with await.
 *
 * this function gets the name of the pokemon and returns a Promise with
 * the pokemon's object.
 *
 */
export const getPokemonByName = async (pokemonName: string) => {
    const BASE_URL = "/pokemon/";

    // ask from the api to give me a json object about my pokemon
    const response = await fetch(BASE_URL + pokemonName);
    console.log(response);
    const pokemonValues = await response.json();

    // get the values from the body of the response.
    const weight = pokemonValues.weight;
    const height = pokemonValues.height;
    const name = pokemonValues.name;
    const id = pokemonValues.id;
    const types = pokemonValues.types;
    const img = pokemonValues.img;

    console.log(img);

    return new Pokemon(name, weight, height, img, id, types);
};

export const getAllPokemonTypes = async () => {
    const response = await (await fetch("/types")).json();
    console.log(response);
    return response;
};

export const getPokemonsByType = async (typeName: string) => {
    const response = await (await fetch("/pokemons/" + typeName)).json();

    return response;
};
