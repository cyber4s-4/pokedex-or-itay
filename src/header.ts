// Create index Header.
import { getPokemonByName, Pokemon } from "./shared/Pokemon";
import { pokemonComponent, indexItemsContainer} from "./main";
// import { pokemonComponent, itemsArray, indexMain, indexItemsContainer, setMainDiv, creatFilterBar, creatSideBar, loadArray, updateLocalstorage } from "./main";
export function createHeader() {
  let header = document.createElement("div");
  document.body.appendChild(header);
  header.classList.add("header");
  let h1 = document.createElement("h1");
  h1.innerText = "פוקימון ישראל";
  header.append(h1);

  let bar = document.createElement("div");
  let barLink1 = document.createElement("div");
  let search = document.createElement("input");
  search.id = "search-pokemon"
  barLink1.innerText = "חפש";

  bar.classList.add("barContiner");
  barLink1.classList.add("barLink");
  search.classList.add("barLink");
  bar.append(barLink1, search);

  header.append(bar);

  // Finish search button.
  barLink1.addEventListener("click", () => {
    let input = (document.getElementById("search-pokemon") as HTMLInputElement
      ).value
      getPokemonByName(input)
      .then((pokemon) => new pokemonComponent( pokemon,indexItemsContainer).render())
      .catch((err) => console.log("can not find pokemon"));
  
  });
}
