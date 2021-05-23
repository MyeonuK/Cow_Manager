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

  setData(callback) {
    callback();
    console.log(this.data);
  }

  ppp() {
    this.data.parseData();
  }

  async render() {
    const $tabTitle = document.createElement("h2");
    $tabTitle.className = "tabTitle";
    $tabTitle.innerText = "CowTab";

    this.data = new ReadXlsx("data/test.xlsx");
    this.setData(this.ppp);

    /*
    const p = async () => {
      this.setData();
      return 1;
    };
    p().then(() => {
      console.log(this.data.getData());
    });
    */

    this.$mainDiv.appendChild($tabTitle);
    this.$mainDiv.appendChild($testP);
  }
}
