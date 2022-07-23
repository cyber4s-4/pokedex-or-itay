"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypes = exports.getPokemonByName = exports.getPokemonsByType = exports.getAllPokemons = exports.connect = void 0;
const pg_1 = __importDefault(require("pg"));
const dotenv_1 = __importDefault(require("dotenv"));
const process_1 = __importDefault(require("process"));
dotenv_1.default.config();
let client;
const connect = async () => {
    try {
        console.log("connecting");
        client = new pg_1.default.Client({
            connectionString: process_1.default.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false },
        });
        await client.connect();
    }
    catch (e) {
        console.log("couldnt connect: ", e);
    }
};
exports.connect = connect;
const getAllPokemons = async () => {
    const data = await client.query("SELECT * FROM pokemons;");
    return data.rows;
};
exports.getAllPokemons = getAllPokemons;
const getPokemonsByType = async (type) => {
    const data = await client.query(`SELECT * FROM pokemons WHERE '${type}'=ANY(types);`);
    return data.rows;
};
exports.getPokemonsByType = getPokemonsByType;
const getPokemonByName = async (name) => {
    const data = await client.query(`SELECT * FROM pokemons WHERE name='${name}'`);
    return data.rows[0];
};
exports.getPokemonByName = getPokemonByName;
const getTypes = async () => {
    const data = await client.query(`SELECT DISTINCT types FROM pokemons;`);
    const puffedTypes = data.rows.map((emptyPokemon) => emptyPokemon.types);
    const allTypes = [...new Set(puffedTypes.flat())];
    return allTypes;
};
exports.getTypes = getTypes;
//# sourceMappingURL=dbHandler.js.map