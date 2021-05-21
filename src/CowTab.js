class CowTab extends Tab {
  $mainDiv = null;
  data = null;

  constructor($target) {
    super($target);
    const $mainDiv = document.createElement("div");
    $mainDiv.className = "CowSearch";

    this.$mainDiv = $mainDiv;
    $target.appendChild(this.$mainDiv);

    this.render();
  }

  render() {
    const $tabTitle = document.createElement("h2");
    $tabTitle.className = "tabTitle";
    $tabTitle.innerText = "cowcowcow";

    this.data = new ReadXlsx("data/data.xlsx");

    this.$mainDiv.appendChild($tabTitle);
  }
}
