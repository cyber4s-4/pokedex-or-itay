import { createHeader } from "./header";
import { pokemonComponent, itemsArray, indexMain, indexItemsContainer, setMainDiv, creatFilterBar, creatSideBar, loadArray, updateLocalstorage } from "./main";
import { createFooter } from "./footer";

// Create index header.
createHeader();

// Create index main.
setMainDiv(indexMain, indexItemsContainer);
creatFilterBar();
creatSideBar();
updateLocalstorage();

// Render pokemons.
itemsArray.forEach((element) => {
  let component: pokemonComponent = new pokemonComponent(
    element,
    indexItemsContainer
  );
  component.render();
});

// Create index fotter.
createFooter();

