"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHeader = void 0;
// Create index Header.
const Pokemon_1 = require("./shared/Pokemon");
const main_1 = require("./main");
// import { pokemonComponent, itemsArray, indexMain, indexItemsContainer, setMainDiv, creatFilterBar, creatSideBar, loadArray, updateLocalstorage } from "./main";
function createHeader() {
    let header = document.createElement("div");
    document.body.appendChild(header);
    header.classList.add("header");
    let h1 = document.createElement("h1");
    h1.innerText = "פוקימון ישראל";
    header.append(h1);
    let bar = document.createElement("div");
    let barLink1 = document.createElement("div");
    let search = document.createElement("input");
    search.id = "search-pokemon";
    barLink1.innerText = "חפש";
    bar.classList.add("barContiner");
    barLink1.classList.add("barLink");
    search.classList.add("barLink");
    bar.append(barLink1, search);
    header.append(bar);
    // Finish search button.
    barLink1.addEventListener("click", () => {
        let input = document.getElementById("search-pokemon").value;
        (0, Pokemon_1.getPokemonByName)(input)
            .then((pokemon) => new main_1.pokemonComponent(pokemon, main_1.indexItemsContainer).render())
            .catch((err) => console.log("can not find pokemon"));
    });
}
exports.createHeader = createHeader;
//# sourceMappingURL=header.js.map