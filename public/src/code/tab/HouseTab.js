class HouseTab extends Tab {
  $target = null;
  $mainDiv = null;
  data = null;

  constructor($target) {
    super($target);

    this.$target = $target;
    this.$mainDiv = document.createElement("div");
    this.$mainDiv.className = "Tab";

    this.getData();
    //fetch(`http://myeonu.cafe24app.com/houseList`)
    /*fetch("house")
      .then((res) => res.json())
      .then((res) => this.setData(res));
*/
    setTimeout(() => {
      console.log(this.data);
      this.render();
    }, 100);
  }

  async getData() {
    fetch("houseList")
      .then((res) => res.json())
      .then((res) => (this.data = res));
  }

  setData(data) {
    this.data = {};
    let houses = Array.from(new Set(data.map((a) => a.house[0])));
    for (let house of houses) {
      let rooms = data
        .map((item) => {
          if (item.house[0] == house) {
            return `${item.house[1]}${item.room}`;
          }
        })
        .filter((elem, i) => elem != undefined);

      this.data[house] = rooms;
    }
  }

  renderSections() {
    // section
    let houses = Object.keys(this.data);

    for (let house of houses) {
      let $houseSection = new HouseSection(house, this.data[house]);
      $houseSection.render(this.$mainDiv);
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
