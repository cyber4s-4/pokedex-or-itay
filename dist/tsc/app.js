"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const header_1 = require("./header");
const main_1 = require("./main");
const footer_1 = require("./footer");
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
//# sourceMappingURL=app.js.map