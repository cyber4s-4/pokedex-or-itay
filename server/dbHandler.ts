import postgres from "pg";
import dotenv from "dotenv";
import process from "process";
import { Pokemon } from "models/pokemon";
dotenv.config();

let client: postgres.Client;
export const connect = async () => {
    try {
        console.log("connecting");
        client = new postgres.Client({
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false },
        });
        await client.connect();
    } catch (e) {
        console.log("couldnt connect: ", e);
    }
};

export const getAllPokemons = async () => {
    const data = await client.query<Pokemon>("SELECT * FROM pokemons;");
    return data.rows;
};

export const getPokemonsByType = async (type: string) => {
    const data = await client.query<Pokemon>(
        `SELECT * FROM pokemons WHERE '${type}'=ANY(types);`
    );
    return data.rows;
};

export const getPokemonByName = async (name: string) => {
    const data = await client.query<Pokemon>(
        `SELECT * FROM pokemons WHERE name='${name}'`
    );
    return data.rows[0];
};

export const getTypes = async () => {
    const data = await client.query<Pokemon>(
        `SELECT DISTINCT types FROM pokemons;`
    );
    const puffedTypes = data.rows.map((emptyPokemon) => emptyPokemon.types);

    const allTypes = [...new Set(puffedTypes.flat())];

    return allTypes;
};
