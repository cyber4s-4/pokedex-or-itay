var app;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./dist/tsc/footer.js":
/*!****************************!*\
  !*** ./dist/tsc/footer.js ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createFooter = void 0;
function createFooter() {
    let fotter = document.createElement("div");
    document.body.appendChild(fotter);
    fotter.classList.add("fotter");
    let fotterBar = document.createElement("div");
    let fotterBarLink1 = document.createElement("div");
    let fotterBarLink2 = document.createElement("div");
    fotterBarLink1.innerText = "אודות";
    fotterBarLink2.innerText = "צור קשר";
    fotterBar.classList.add("barContiner");
    fotterBarLink1.classList.add("barLink");
    fotterBarLink2.classList.add("barLink");
    fotterBar.append(fotterBarLink1);
    fotterBar.append(fotterBarLink2);
    fotter.append(fotterBar);
}
exports.createFooter = createFooter;


/***/ }),

/***/ "./dist/tsc/header.js":
/*!****************************!*\
  !*** ./dist/tsc/header.js ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createHeader = void 0;
// Create index Header.
const Pokemon_1 = __webpack_require__(/*! ./shared/Pokemon */ "./dist/tsc/shared/Pokemon.js");
const main_1 = __webpack_require__(/*! ./main */ "./dist/tsc/main.js");
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


/***/ }),

/***/ "./dist/tsc/main.js":
/*!**************************!*\
  !*** ./dist/tsc/main.js ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


//No-Constant global variables.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.loadArray = exports.updateLocalstorage = exports.creatSideBar = exports.creatFilterBar = exports.setMainDiv = exports.pokemonComponent = exports.itemsArray = exports.indexItemsContainer = exports.indexMain = void 0;
const Pokemon_1 = __webpack_require__(/*! ./shared/Pokemon */ "./dist/tsc/shared/Pokemon.js");
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
        console.log(types);
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


/***/ }),

/***/ "./dist/tsc/shared/Pokemon.js":
/*!************************************!*\
  !*** ./dist/tsc/shared/Pokemon.js ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getPokemonsByType = exports.getAllPokemonTypes = exports.getPokemonByName = exports.Pokemon = void 0;
class Pokemon {
    constructor(name, weight, height, img, id, types) {
        if (weight < 0 || height < 0) {
            throw new TypeError("weight & height must be bigger then 0");
        }
        if (!name) {
            throw new TypeError("can not execpt empty name");
        }
        if (!img) {
            throw new TypeError("can not execpt empty image");
        }
        this.name = name;
        this.weight = weight;
        this.height = height;
        this.img = img;
        this.id = id;
        this.types = types;
    }
}
exports.Pokemon = Pokemon;
/**
 *
 * Beaware - async function. means it`ll run seperately if you will not
 * use it with await.
 *
 * this function gets the name of the pokemon and returns a Promise with
 * the pokemon's object.
 *
 */
const getPokemonByName = async (pokemonName) => {
    const BASE_URL = "/pokemon/";
    // ask from the api to give me a json object about my pokemon
    const response = await fetch(BASE_URL + pokemonName);
    console.log(response);
    const pokemonValues = await response.json();
    // get the values from the body of the response.
    const weight = pokemonValues.weight;
    const height = pokemonValues.height;
    const name = pokemonValues.name;
    const id = pokemonValues.index;
    const types = pokemonValues.types;
    const img = pokemonValues.img;
    console.log(img);
    return new Pokemon(name, weight, height, img, id, types);
};
exports.getPokemonByName = getPokemonByName;
const getAllPokemonTypes = async () => {
    const response = await (await fetch("/types")).json();
    return response;
};
exports.getAllPokemonTypes = getAllPokemonTypes;
const getPokemonsByType = async (typeName) => {
    const response = await (await fetch("/pokemons/" + typeName)).json();
    return response;
};
exports.getPokemonsByType = getPokemonsByType;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*************************!*\
  !*** ./dist/tsc/app.js ***!
  \*************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const header_1 = __webpack_require__(/*! ./header */ "./dist/tsc/header.js");
const main_1 = __webpack_require__(/*! ./main */ "./dist/tsc/main.js");
const footer_1 = __webpack_require__(/*! ./footer */ "./dist/tsc/footer.js");
// Create index header.
(0, header_1.createHeader)();
// Create index main.
(0, main_1.setMainDiv)(main_1.indexMain, main_1.indexItemsContainer);
(0, main_1.creatFilterBar)();
(0, main_1.creatSideBar)();
(0, main_1.updateLocalstorage)();
// Render pokemons.
main_1.itemsArray.forEach((element) => {
    let component = new main_1.pokemonComponent(element, main_1.indexItemsContainer);
    component.render();
});
// Create index fotter.
(0, footer_1.createFooter)();

})();

app = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=app.js.map