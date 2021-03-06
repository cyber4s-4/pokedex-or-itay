import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";
import cors from "cors";
import process from "process";
import { Pokemon } from "models/pokemon";
import {
    connect,
    getAllPokemons,
    getPokemonsByType,
    getTypes,
    getPokemonByName,
} from "./dbHandler";
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());

const pokemons: Pokemon[] = JSON.parse(
    fs.readFileSync(path.join(__dirname, "data.json"), { encoding: "utf-8" })
);

app.use("/", express.static(path.join(__dirname, "../dist")));

app.get("/pokemon/:name", async (req: Request, res: Response) => {
    const name = req.params.name;
    const pokemon = await getPokemonByName(name);
    if (!pokemon) {
        res.sendStatus(404);
    }
    res.send(pokemon);
});

app.get("/pokemons/", async (req: Request, res: Response) => {
    const pokemons = await getAllPokemons();
    res.send(pokemons);
});

app.get("/pokemons/:type", async (req: Request, res: Response) => {
    const type = req.params.type;
    const pokemonByType = await getPokemonsByType(type);
    if (!pokemonByType.length) {
        res.sendStatus(404);
    } else {
        res.send(pokemonByType);
    }
});

app.get("/types", async (req: Request, res: Response) => {
    const types = await getTypes();
    res.send(types);
});

connect().then(() => {
    app.listen(PORT, () => console.log("listening on port " + PORT));
});
