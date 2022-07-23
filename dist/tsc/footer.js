"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=footer.js.map