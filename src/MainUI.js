class MainUI {
  $mainDiv = null;
  $tabs = {
    $cowTab: null,
    $houseTab: null,
    $vaccinTab: null,
  };
  data = null;

  constructor($target) {
    const $mainDiv = document.createElement("div");
    $mainDiv.className = "MainDiv";

    this.$mainDiv = $mainDiv;
    console.log($target);
    $target.appendChild(this.$mainDiv);

    this.render();
  }

  hideAllTab() {
    this.$tabs.$cowTab.hide();
    this.$tabs.$houseTab.hide();
    this.$tabs.$vaccinTab.hide();
  }

  setTabs($contentDiv) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.$tabs.$cowTab = new CowTab($contentDiv, this.data);
        this.$tabs.$houseTab = new HouseTab($contentDiv, this.data);
        this.$tabs.$vaccinTab = new VaccinTab($contentDiv, this.data);
        this.hideAllTab();
        this.$tabs.$cowTab.show();
      }, 1000);
    });
  }

  async render() {
    this.data = new ReadXlsx("data/test.xlsx");

    const $header = document.createElement("header");
    $header.className = "Header";

    const $title = document.createElement("h1");
    $title.className = "Title";
    $title.innerText = "Cow_Manager";

    $header.appendChild($title);

    const $nav = document.createElement("nav");
    $nav.className = "Nav";

    const $cowBtn = document.createElement("button");
    $cowBtn.className = "Button";
    $cowBtn.innerText = "Cow";
    $cowBtn.addEventListener("click", () => {
      this.hideAllTab();
      this.$tabs.$cowTab.show();
    });

    const $houseBtn = document.createElement("button");
    $houseBtn.className = "Button";
    $houseBtn.innerText = "House";
    $houseBtn.addEventListener("click", () => {
      this.hideAllTab();
      this.$tabs.$houseTab.show();
    });

    const $vaccinBtn = document.createElement("button");
    $vaccinBtn.className = "Button";
    $vaccinBtn.innerText = "Vaccin";
    $vaccinBtn.addEventListener("click", () => {
      this.hideAllTab();
      this.$tabs.$vaccinTab.show();
    });

    $nav.appendChild($cowBtn);
    $nav.appendChild($houseBtn);
    $nav.appendChild($vaccinBtn);

    const $contentDiv = document.createElement("div");
    $contentDiv.className = "ContentDiv";

    this.$mainDiv.appendChild($header);
    this.$mainDiv.appendChild($nav);
    this.$mainDiv.appendChild($contentDiv);

    await this.setTabs($contentDiv);
  }
}
