"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const cors_1 = __importDefault(require("cors"));
const process_1 = __importDefault(require("process"));
const dbHandler_1 = require("./dbHandler");
const PORT = process_1.default.env.PORT || 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const pokemons = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, "data.json"), { encoding: "utf-8" }));
app.use("/", express_1.default.static(path_1.default.join(__dirname, "../dist")));
app.get("/pokemon/:name", async (req, res) => {
    const name = req.params.name;
    const pokemon = await (0, dbHandler_1.getPokemonByName)(name);
    if (!pokemon) {
        res.sendStatus(404);
    }
    res.send(pokemon);
});
app.get("/pokemons/", async (req, res) => {
    const pokemons = await (0, dbHandler_1.getAllPokemons)();
    res.send(pokemons);
});
app.get("/pokemons/:type", async (req, res) => {
    const type = req.params.type;
    const pokemonByType = await (0, dbHandler_1.getPokemonsByType)(type);
    if (!pokemonByType.length) {
        res.sendStatus(404);
    }
    else {
        res.send(pokemonByType);
    }
});
app.get("/types", async (req, res) => {
    const types = await (0, dbHandler_1.getTypes)();
    res.send(types);
});
(0, dbHandler_1.connect)().then(() => {
    app.listen(PORT, () => console.log("listening on port " + PORT));
});
//# sourceMappingURL=server.js.map