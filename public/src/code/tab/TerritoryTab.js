class TerritoryTab extends Tab {
  $target = null;
  $mainDiv = null;
  data = null;

  constructor($target) {
    super($target);

    this.$target = $target;

    this.$mainDiv = document.createElement("div");
    this.$mainDiv.className = "Tab";

    this.getData();

    setTimeout(() => {
      console.log(this.data);
      this.render();
    }, 200);
  }

  async getData() {
    fetch("territory_status")
      .then((res) => res.json())
      .then((res) => (this.data = res));
  }

  renderSections() {
    let $territoryStatusSection = new TerritoryStatusSection(this.data);
    $territoryStatusSection.render(this.$mainDiv);
  }

  render() {
    // header
    const $header = document.createElement("header");
    $header.className = "Header";

    // title
    const $title = document.createElement("h1");
    $title.className = "Title";
    $title.innerText = "Territory_Manager";

    this.$mainDiv.appendChild($header);
    $header.appendChild($title);

    this.renderSections();
    this.$target.appendChild(this.$mainDiv);
  }
}
