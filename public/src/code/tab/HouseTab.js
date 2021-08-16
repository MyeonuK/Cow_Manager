class HouseTab extends Tab {
  $target = null;
  $mainDiv = null;
  data = null;

  constructor($target) {
    super($target);

    this.$target = $target;
    this.$mainDiv = document.createElement("div");
    this.$mainDiv.className = "Tab";

    //fetch(`http://myeonu.cafe24app.com/house`)
    fetch("house")
      .then((res) => res.json())
      .then((res) => this.setData(res));

    setTimeout(() => {
      this.render();
    }, 100);
  }

  setData(data) {
    this.data = {};
    let houses = Array.from(new Set(data.map((a) => a.house)));
    for (let house of houses) {
      let rooms = data.map((item) => {
        let arr = [];
        if (item.house == house) {
          return item.room;
        }
      });

      this.data[house] = rooms;
    }
  }

  renderSections() {
    // section
    let houses = Object.keys(this.data);
    for (let house of houses) {
      const $section = document.createElement("div");
      $section.className = "SectionDiv";
      $section.addEventListener("click", () => {});

      const $sectionTitle = document.createElement("div");
      $sectionTitle.className = "Title";
      $sectionTitle.innerText = `${house}번 축사`;

      const $sectionContent = document.createElement("div");
      $sectionContent.className = "ColContentDiv";

      for (let room of this.data[house]) {
        const $roomT = document.createElement("div");
        $roomT.classList = "BigElement";
        $roomT.innerText = `${room}번 칸`;
        $sectionContent.appendChild($roomT);
      }

      this.$mainDiv.appendChild($section);
      $section.appendChild($sectionTitle);
      $section.appendChild($sectionContent);
    }
  }

  render() {
    // header
    const $header = document.createElement("header");
    $header.className = "Header";

    // title
    const $title = document.createElement("h1");
    $title.className = "Title";
    $title.innerText = "Cow_Manager";

    this.$mainDiv.appendChild($header);
    $header.appendChild($title);
    this.renderSections();
    this.$target.appendChild(this.$mainDiv);
  }
}
