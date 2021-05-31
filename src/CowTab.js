class CowTab extends Tab {
  $mainDiv = null;
  data = null;

  constructor($target, data) {
    super($target, data);
    this.data = data;

    const $mainDiv = document.createElement("div");
    $mainDiv.className = "CowSearch";

    this.$mainDiv = $mainDiv;
    $target.appendChild(this.$mainDiv);

    this.render();
  }

  render() {
    const $tabTitle = document.createElement("h2");
    $tabTitle.className = "tabTitle";
    $tabTitle.innerText = "CowTab";

    const $testP = document.createElement("p");
    console.log(this.data.parsedData);
    let array = Object.keys(this.data.parsedData);
    $testP.innerText = Object.keys(this.data.parsedData[array[1]]);

    this.$mainDiv.appendChild($tabTitle);
    this.$mainDiv.appendChild($testP);
  }
}
