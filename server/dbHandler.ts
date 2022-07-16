import { MongoClient, Db, Collection } from "mongodb";
import { Pokemon } from "models/pokemon";

const connectionString =
    "mongodb+srv://or:or123@cluster0.khg90.mongodb.net/?retryWrites=true&w=majority";
let client: MongoClient;
let pokeCollection: Collection<Pokemon>;
export const connect = async () => {
    client = new MongoClient(connectionString);
    try {
        await client.connect();
        pokeCollection = client.db("pokemons-db").collection("pokemons");
        console.log("connected !");
    } catch (e) {
        throw "couldnt connect";
    }
};

export const getAllPokemons = async () => {
    const cursor = pokeCollection.find();
    const pokemons = await cursor.toArray();
    return pokemons;
};

export const getPokemonsByType = async (type: string) => {
    const cursor = pokeCollection.find({ types: type });
    const pokemons = await cursor.toArray();
    return pokemons;
};

export const getPokemonByName = async (name: string) =>
    await pokeCollection.findOne({ name: name });

export const getTypes = async () => {
    const pokeTypesCollection = client
        .db("pokemons-db")
        .collection("poke-types");
    const typesCursor = pokeTypesCollection.find();
    return await typesCursor.toArray();
};
