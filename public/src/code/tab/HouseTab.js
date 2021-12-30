class HouseTab extends Tab {
  $mainDiv = null;
  data = null;

  constructor($target) {
    super($target);

    this.$mainDiv = document.createElement("div");
    this.$mainDiv.className = "Tab";

    this.setData().then((res) => {
      this.render($target);
    });
  }

  async setData() {
    let res = await fetch("house/title");
    this.data = await res.json();
    console.log(this.data);
  }

  renderSections($target) {
    // section
    for (let house of this.data) {
      const $houseCard = new HouseCard($target, house);
      setTimeout(() => {
        $houseCard.render();
      }, 100);
    }
  }

  render($target) {
    // header
    const $header = document.createElement("header");
    $header.className = "Header";

    // title
    const $title = document.createElement("h1");
    $title.className = "Title";
    $title.innerText = "House_Manager";

    this.$mainDiv.appendChild($header);
    $header.appendChild($title);

    this.renderSections(this.$mainDiv);
    $target.appendChild(this.$mainDiv);
  }
}
