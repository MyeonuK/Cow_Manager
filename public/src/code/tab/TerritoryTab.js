class TerritoryTab extends Tab {
  $mainDiv = null;
  data = null;

  constructor($target) {
    super($target);

    this.$mainDiv = document.createElement("div");
    this.$mainDiv.className = "Tab";

    this.render($target);
  }

  renderSections($target) {
    const $territoryStatusCard = new TerritoryCard($target);
  }

  render($target) {
    // header
    const $header = document.createElement("header");
    $header.className = "Header";

    // title
    const $title = document.createElement("h1");
    $title.className = "Title";
    $title.innerText = "Territory_Manager";

    this.$mainDiv.appendChild($header);
    $header.appendChild($title);

    this.renderSections(this.$mainDiv);
    $target.appendChild(this.$mainDiv);
  }
}
