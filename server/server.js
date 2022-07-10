"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const cors_1 = __importDefault(require("cors"));
const PORT = 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const pokemons = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, "data.json"), { encoding: "utf-8" }));
app.use("/", express_1.default.static(path_1.default.join(__dirname, "../dist")));
app.get("/pokemon/:name", (req, res) => {
    const name = req.params.name;
    const pokemon = pokemons.find((pokemon) => pokemon.name === name);
    if (!pokemon) {
        res.sendStatus(404);
    }
    res.send(pokemon);
});
app.get("/pokemons/", (req, res) => {
    res.send(pokemons);
});
app.get("/pokemons/:type", (req, res) => {
    const type = req.params.type;
    const pokemonByType = pokemons.filter((pokemon) => pokemon.types.find((pokeType) => pokeType === type));
    if (!pokemonByType.length) {
        res.sendStatus(404);
    }
    else {
        res.send(pokemonByType);
    }
});
app.get("/types", (req, res) => {
    const types = pokemons.map((pokemon) => pokemon.types).flat();
    const typesFiltered = types.filter((type, index) => types.indexOf(type) === index);
    console.log(typesFiltered);
    res.send(typesFiltered);
});
app.listen(PORT, () => console.log("listening on port " + PORT));
//# sourceMappingURL=server.js.map