//No-Constant global variables.

import {
    getAllPokemonTypes,
    getPokemonByName,
    getPokemonsByType,
    Pokemon,
} from "./shared/Pokemon";

export let indexMain = document.createElement("div");
export let indexItemsContainer = document.createElement("div");
export let itemsArray: Pokemon[] = loadArray();
const pokeListContainer = document.createElement("div");
function reset() {
    itemsArray = [];
    pokeListContainer.innerHTML = "";
}
export class pokemonComponent {
    data: Pokemon;
    parent: HTMLElement;

    constructor(data: Pokemon, parent: HTMLElement) {
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

// Create main div.
export function setMainDiv(div: HTMLElement, container: HTMLElement) {
    div.append(container);
    div.classList.add("main");
    container.classList.add("all-items-container");
}
// Create filter bar.
export function creatFilterBar() {
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

    getAllPokemonTypes().then((types) => {
        types.forEach((type: string) => {
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
        const allPokemons = await getPokemonsByType(currValue);

        /**
         * Finished loading all types and putting them in a select.
         * Finished loading all pokemons from the same type.
         * TODO: Display top 10 pokemons to the screen.
         */
        const pokemonsToRender: Pokemon[] = allPokemons;

        pokemonsToRender.map((p) => {
            const pc = new pokemonComponent(p, pokeListContainer);
            pc.render();
        });
    });

    document.body.appendChild(indexMain);
    filterDiv.append(general);
    filterDiv.append(typesSelect);
    indexItemsContainer.appendChild(filterDiv);
    indexItemsContainer.append(pokeListContainer);
    // Filter button for general.
    general.addEventListener("click", () => {
        removeHTMLItems();
        itemsArray.forEach((element) => {
            let laptopComponent: pokemonComponent = new pokemonComponent(
                element,
                indexItemsContainer
            );
            laptopComponent.render();
        });
    });
}

// Create side bar.
export function creatSideBar() {
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
    indexMain.append(continer);
}
// Return img HTML property.
function addImg(imgUrl: string) {
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
export function updateLocalstorage() {
    localStorage.setItem("ITEMS", JSON.stringify(itemsArray));
}
// Deserialization - exchange string to data.
export function loadArray(): Pokemon[] | [] {
    const items: string | null = localStorage.getItem("ITEMS");
    // If the local storag is empty its make general filter array.
    if (items === null || (items as string) === "[]") {
        console.log("l.s empty");
        return [];
        // return GetInitialItemsArray();
    }
    // Return items as TS.
    return JSON.parse(items);
}

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
