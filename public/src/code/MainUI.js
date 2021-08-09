class MainUI {
  $mainDiv = null;
  $tabs = {
    $outlineTab: null,
    $houseTab: null,
    $vaccinTab: null,
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
    this.$tabs.$vaccinTab.hide();
  }

  setTabs($contentDiv, $buttonList) {
    return new Promise(() => {
      setTimeout(() => {
        this.$tabs.$outlineTab = new OutlineTab($contentDiv);
        this.$tabs.$houseTab = new HouseTab($contentDiv);
        this.$tabs.$vaccinTab = new VaccinTab($contentDiv);

        this.hideAllTab($buttonList);
        $buttonList[0].style.color = this.getColor("choose");
        this.$tabs.$outlineTab.show();

        const $tabList = [
          this.$tabs.$outlineTab,
          this.$tabs.$houseTab,
          this.$tabs.$vaccinTab,
        ];
        for (let i = 0; i < $buttonList.length; i++) {
          $buttonList[i].addEventListener("click", () => {
            $tabList[i].show();
          });
        }
      }, 100);
    });
  }

  async render() {
    // contentDiv
    const $contentDiv = document.createElement("div");
    $contentDiv.className = "ContentDiv";

    // nav
    const $nav = document.createElement("nav");
    $nav.className = "Nav";

    // navBtn
    const $outlineBtn = document.createElement("button");
    const $houseBtn = document.createElement("button");
    const $vaccinBtn = document.createElement("button");
    $outlineBtn.innerText = "Cow";
    $houseBtn.innerText = "House";
    $vaccinBtn.innerText = "Vaccin";

    const $buttonList = [$outlineBtn, $houseBtn, $vaccinBtn];

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
    $nav.appendChild($vaccinBtn);
    this.$mainDiv.appendChild($contentDiv);
    this.$mainDiv.appendChild($nav);

    await this.setTabs($contentDiv, $buttonList);
  }
}
