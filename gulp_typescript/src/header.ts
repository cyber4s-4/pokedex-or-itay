// Create index Header.

export function createHeader() {
  let header = document.createElement("div");
  document.body.appendChild(header);
  header.classList.add("header");
  let h1 = document.createElement("h1");
  h1.innerText = "פוקימון ישראל";
  header.append(h1);

  let bar = document.createElement("div");
  let barLink1 = document.createElement("div");

  barLink1.innerText = "חפש";

  bar.classList.add("barContiner");
  barLink1.classList.add("barLink");
  bar.append(barLink1);

  header.append(bar);
}
