import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";
import cors from "cors";
import process from "process";
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
interface Pokemon {
    name: string;
    weight: number;
    height: number;
    img: string;
    index: number;
    types: string[];
}

const pokemons: Pokemon[] = JSON.parse(
    fs.readFileSync(path.join(__dirname, "data.json"), { encoding: "utf-8" })
);

app.use("/", express.static(path.join(__dirname, "../dist")));

app.get("/pokemon/:name", (req: Request, res: Response) => {
    const name = req.params.name;
    const pokemon = pokemons.find((pokemon) => pokemon.name === name);
    if (!pokemon) {
        res.sendStatus(404);
    }
    res.send(pokemon);
});

app.get("/pokemons/", (req: Request, res: Response) => {
    res.send(pokemons);
});

app.get("/pokemons/:type", (req: Request, res: Response) => {
    const type = req.params.type;
    const pokemonByType = pokemons.filter((pokemon) =>
        pokemon.types.find((pokeType) => pokeType === type)
    );
    if (!pokemonByType.length) {
        res.sendStatus(404);
    } else {
        res.send(pokemonByType);
    }
});

app.get("/types", (req: Request, res: Response) => {
    const types = pokemons.map((pokemon) => pokemon.types).flat();
    const typesFiltered = types.filter(
        (type, index) => types.indexOf(type) === index
    );
    console.log(typesFiltered);
    res.send(typesFiltered);
});
app.listen(PORT, () => console.log("listening on port " + PORT));
