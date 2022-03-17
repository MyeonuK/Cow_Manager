import { OutlineTab } from "./cow/cowTab.js";
import { HouseTab } from "./house/HouseTab.js";
import { TerritoryTab } from "./territory/TerritoryTab.js";

export class MainUI {
  $mainDiv = null;
  $contentDiv = null;
  $tabs = {
    $outlineTab: null,
    $houseTab: null,
    $territoryTab: null,
  };

  constructor($target) {
    const $mainDiv = document.createElement("div");
    $mainDiv.className = "MainDiv";

    this.$mainDiv = $mainDiv;
    $target.appendChild(this.$mainDiv);

    //.then((res) => console.log(this.data));

    this.render();
  }

  getColor(color) {
    switch (color) {
      case "choose":
        return "#444444";
      case "unchoose":
        return "#bbbbbb";
    }
  }

  hideAllTab($buttonList) {
    $buttonList.forEach(
      (button) => (button.style.color = this.getColor("unchoose"))
    );
    this.$tabs.$outlineTab.hide();
    this.$tabs.$houseTab.hide();
    this.$tabs.$territoryTab.hide();
  }

  setTabs($contentDiv, $buttonList) {
    return new Promise(() => {
      setTimeout(() => {
        this.$tabs.$outlineTab = new OutlineTab($contentDiv);
        this.$tabs.$houseTab = new HouseTab($contentDiv);
        this.$tabs.$territoryTab = new TerritoryTab($contentDiv);

        this.hideAllTab($buttonList);
        $buttonList[0].style.color = this.getColor("choose");
        this.$tabs.$outlineTab.show();

        const $tabList = [
          this.$tabs.$outlineTab,
          this.$tabs.$houseTab,
          this.$tabs.$territoryTab,
        ];
        for (let i = 0; i < $buttonList.length; i++) {
          $buttonList[i].addEventListener("click", () => {
            let childs = this.$mainDiv.childNodes;

            while (childs.length > 2) {
              this.$mainDiv.removeChild(childs[2]);
            }
            this.$contentDiv.style.display = "block";

            $tabList[i].show();
          });
        }
      }, 100);
    });
  }

  async render() {
    // contentDiv
    this.$contentDiv = document.createElement("div");
    this.$contentDiv.className = "ContentDiv";

    // nav
    const $nav = document.createElement("nav");
    $nav.className = "Nav";

    // navBtn
    const $outlineBtn = document.createElement("button");
    const $houseBtn = document.createElement("button");
    const $territoryBtn = document.createElement("button");
    $outlineBtn.innerText = "Cow";
    $houseBtn.innerText = "House";
    $territoryBtn.innerText = "Territory";

    const $buttonList = [$outlineBtn, $houseBtn, $territoryBtn];

    $buttonList.forEach((button) => {
      button.className = "Button";
      button.addEventListener("click", () => {
        this.hideAllTab($buttonList);
        button.style.color = this.getColor("choose");
      });
    });

    // append
    $nav.appendChild($outlineBtn);
    $nav.appendChild($houseBtn);
    $nav.appendChild($territoryBtn);
    this.$mainDiv.appendChild(this.$contentDiv);
    this.$mainDiv.appendChild($nav);

    await this.setTabs(this.$contentDiv, $buttonList);
  }
}
