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
    let res = await fetch("house-list");
    this.data = await res.json();
  }

  renderSections() {
    console.log(this.data);
    // section
    for (let d of this.data) {
      const $houseCard = new HouseCard(d);
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

    this.renderSections();
    $target.appendChild(this.$mainDiv);
  }
}
