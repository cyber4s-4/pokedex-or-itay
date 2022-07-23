"use strict";
//No-Constant global variables.
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadArray = exports.updateLocalstorage = exports.creatSideBar = exports.creatFilterBar = exports.setMainDiv = exports.pokemonComponent = exports.itemsArray = exports.indexItemsContainer = exports.indexMain = void 0;
const Pokemon_1 = require("./shared/Pokemon");
exports.indexMain = document.createElement("div");
exports.indexItemsContainer = document.createElement("div");
exports.itemsArray = loadArray();
const pokeListContainer = document.createElement("div");
function reset() {
    exports.itemsArray = [];
    pokeListContainer.innerHTML = "";
}
class pokemonComponent {
    constructor(data, parent) {
        this.data = data;
        this.parent = parent;
    }
    render() {
        const continer = document.createElement("div");
        const image = addImg(this.data.img);
        const name = document.createElement("div");
        const height = document.createElement("div");
        const weight = document.createElement("div");
        // const name = document.createElement("h2");
        continer.classList.add("item-div");
        image.classList.add("itemImage");
        name.classList.add("itemText");
        height.classList.add("itemText");
        weight.classList.add("itemText");
        name.append("שם " + this.data.name);
        height.append("גובה " + this.data.height + "m");
        weight.append("משקל " + this.data.weight + "kg");
        continer.append(image, name, height, weight);
        this.parent.append(continer);
    }
}
exports.pokemonComponent = pokemonComponent;
// Create main div.
function setMainDiv(div, container) {
    div.append(container);
    div.classList.add("main");
    container.classList.add("all-items-container");
}
exports.setMainDiv = setMainDiv;
// Create filter bar.
function creatFilterBar() {
    let filterDiv = document.createElement("div");
    let general = document.createElement("button");
    let typesSelect = document.createElement("select");
    filterDiv.classList.add("filter-bar-container");
    filterDiv.innerText = "מיין לפי";
    general.innerText = "כללי";
    const defaultSelect = document.createElement("option");
    defaultSelect.disabled = true;
    defaultSelect.hidden = true;
    defaultSelect.selected = true;
    defaultSelect.innerText = "לפי סוג";
    (0, Pokemon_1.getAllPokemonTypes)().then((types) => {
        types.forEach((type) => {
            const typeOption = document.createElement("option");
            typeOption.innerText = type;
            typeOption.value = type;
            typesSelect.append(typeOption);
        });
    });
    typesSelect.append(defaultSelect);
    typesSelect.addEventListener("change", async () => {
        reset();
        const currValue = typesSelect.value;
        const allPokemons = await (0, Pokemon_1.getPokemonsByType)(currValue);
        /**
         * Finished loading all types and putting them in a select.
         * Finished loading all pokemons from the same type.
         * TODO: Display top 10 pokemons to the screen.
         */
        const pokemonsToRender = allPokemons;
        pokemonsToRender.map((p) => {
            const pc = new pokemonComponent(p, pokeListContainer);
            pc.render();
        });
    });
    document.body.appendChild(exports.indexMain);
    filterDiv.append(general);
    filterDiv.append(typesSelect);
    exports.indexItemsContainer.appendChild(filterDiv);
    exports.indexItemsContainer.append(pokeListContainer);
    // Filter button for general.
    general.addEventListener("click", () => {
        removeHTMLItems();
        exports.itemsArray.forEach((element) => {
            let laptopComponent = new pokemonComponent(element, exports.indexItemsContainer);
            laptopComponent.render();
        });
    });
}
exports.creatFilterBar = creatFilterBar;
// Create side bar.
function creatSideBar() {
    const continer = document.createElement("div");
    const h3 = document.createElement("h3");
    const myAccount = document.createElement("div");
    const first = document.createElement("div");
    const second = document.createElement("div");
    const thread = document.createElement("div");
    continer.classList.add("side-bar-container");
    h3.innerText = "תפריט";
    first.innerText = "החשבון שלי";
    second.innerText = "מחשבים";
    thread.innerText = "טאבלטים";
    continer.append(h3, myAccount, first, second, thread);
    exports.indexMain.append(continer);
}
exports.creatSideBar = creatSideBar;
// Return img HTML property.
function addImg(imgUrl) {
    const img = document.createElement("img");
    img.src = imgUrl;
    img.draggable = false;
    return img;
}
// Remove all HTML sell items in the main.
function removeHTMLItems() {
    let items = document.getElementsByClassName("item-div");
    while (items.length !== 0) {
        items[0].remove();
    }
}
//
// Serialization - exchange data to string.
function updateLocalstorage() {
    localStorage.setItem("ITEMS", JSON.stringify(exports.itemsArray));
}
exports.updateLocalstorage = updateLocalstorage;
// Deserialization - exchange string to data.
function loadArray() {
    const items = localStorage.getItem("ITEMS");
    // If the local storag is empty its make general filter array.
    if (items === null || items === "[]") {
        console.log("l.s empty");
        return [];
        // return GetInitialItemsArray();
    }
    // Return items as TS.
    return JSON.parse(items);
}
exports.loadArray = loadArray;
//#####################
// DEPRECATED:
//#####################
// Create the initial items list to itemsGenralArray.
// function GetInitialItemsArray() {
//     let arr: Pokemon[] | null = [];
//     let newItem = new Pokemon(
//         "blubasaur",
//         0.7,
//         6.9,
//         "https://img.pokemondb.net/artwork/bulbasaur.jpg",
//         1
//     );
//     arr.push(newItem);
//     let nnewItem = new Pokemon(
//         "archeops",
//         1.4,
//         32,
//         "https://img.pokemondb.net/artwork/large/archeops.jpg",
//         567
//     );
//     arr.push(nnewItem);
//     return arr;
// }
//# sourceMappingURL=main.js.map