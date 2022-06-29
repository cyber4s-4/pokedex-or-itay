export class Pokemon {
    name: string;
    weight: number;
    height: number;
    img: string;
    id: number;

    constructor(
        name: string,
        weight: number,
        height: number,
        img: string,
        id: number
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
    const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

    // ask from the api to give me a json object about my pokemon
    const response = await fetch(BASE_URL + pokemonName);
    const pokemonValues = await response.json();

    // get the values from the body of the response.
    const weight = pokemonValues.weight;
    const height = pokemonValues.height;
    const name = pokemonValues.name;
    const id = pokemonValues.id;

    // get the image
    const frontSprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    return new Pokemon(name, weight, height, frontSprite, id);
};

//##############################
//Usage
//##############################

// async function someFunction() {
//     const ditto = await getPokemonByName("ditto");
//     console.log(ditto);
// }
