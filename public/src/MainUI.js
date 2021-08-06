class MainUI {
  $mainDiv = null;
  $tabs = {
    $outlineTab: null,
    $houseTab: null,
    $vaccinTab: null,
  };
  data = null;

  constructor($target) {
    const $mainDiv = document.createElement("div");
    $mainDiv.className = "MainDiv";

    this.$mainDiv = $mainDiv;
    $target.appendChild(this.$mainDiv);
    //fetch("http://myeonu.cafe24app.com/load")
    fetch("load")
      .then((res) => res.json())
      .then((res) => {
        this.data = res;
        console.log;
      })
      .then((res) => {
        console.log(this.data);
        for (let i of this.data) {
          if (i.birthDate == null) {
            i.birthDate = "";
          } else {
            i.birthDate = i.birthDate.slice(0, 10);
          }
          if (i.famDate == null) {
            i.famDate = "";
          } else {
            i.famDate = i.famDate.slice(0, 10);
          }

          if (i.bruDate == null) {
            i.bruDate = "";
          } else {
            i.bruDate = i.bruDate.slice(0, 10);
          }

          if (i.tubeDate == null) {
            i.tubeDate = "";
          } else {
            i.tubeDate = i.tubeDate.slice(0, 10);
          }
        }
      });
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
        console.log(this.data);
        this.$tabs.$outlineTab = new Outline($contentDiv, this.data);
        this.$tabs.$houseTab = new HouseTab($contentDiv, this.data);
        this.$tabs.$vaccinTab = new VaccinTab($contentDiv, this.data);

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
      }, 300);
    });
  }

  async render() {
    // header
    const $header = document.createElement("header");
    $header.className = "Header";

    // title
    const $title = document.createElement("h1");
    $title.className = "Title";
    $title.innerText = "Cow_Manager";

    // contentDiv
    const $contentDiv = document.createElement("div");
    $contentDiv.className = "ContentDiv";

    // section1
    const $section = document.createElement("div");
    $section.className = "Section";

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
    $contentDiv.appendChild($header);
    $contentDiv.appendChild($section);
    $header.appendChild($title);
    $nav.appendChild($outlineBtn);
    $nav.appendChild($houseBtn);
    $nav.appendChild($vaccinBtn);
    this.$mainDiv.appendChild($contentDiv);
    this.$mainDiv.appendChild($nav);

    await this.setTabs($contentDiv, $buttonList);
  }
}
