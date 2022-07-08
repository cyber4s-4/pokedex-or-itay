import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";
const PORT = 3000;
const app = express();

interface Pokemon {
    name: string;
    weight: number;
    height: number;
    img: string;
    id: number;
}

const pokemons: Pokemon[] = JSON.parse(
    fs.readFileSync("./data.json", { encoding: "utf-8" })
);

app.use("/", express.static(path.join(__dirname, "../dist")));

app.get("/pokemon/:id", (req: Request, res: Response) => {
    const id = req.params.id;
    const pokemon = pokemons.find((pokemon) => pokemon.id === parseInt(id));
    if (!pokemon) {
        res.sendStatus(404);
    }
    res.send(pokemon);
});
app.listen(PORT, () => console.log("listening on port " + PORT));
