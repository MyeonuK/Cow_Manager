class CowTab extends Tab {
  $mainDiv = null;
  data = null;

  constructor($target, data) {
    super($target, data);
    this.data = data;

    const $mainDiv = document.createElement("div");
    $mainDiv.className = "CowDiv";

    this.$mainDiv = $mainDiv;
    $target.appendChild(this.$mainDiv);

    this.render();
  }

  pushData($target, item, itemInfo) {
    const $item = document.createElement("div");
    $item.innerHTML = `
      <div class="item">
        <span class="item_animalNo">${item}</span>
        <span class="item_info">${itemInfo.BirthDate}</span>
        <span class="item_info">${itemInfo.Sex}</span>
        <span class="item_info">${itemInfo.HouseNo}</span>
        <span class="item_info">${itemInfo.CageNo}</span>
        <span class="item_info">${itemInfo.Fam}</span>
        <span class="item_info">${itemInfo.Brucella}</span>
        <span class="item_info">${itemInfo.Tube}</span>
      </div>`;

    $target.appendChild($item);
  }

  render() {
    const $tabTitle = document.createElement("h2");
    $tabTitle.className = "TabTitle";
    $tabTitle.innerText = "CowTab";
    const $article = document.createElement("article");

    let cowList = Object.keys(this.data);
    for (let item of cowList) {
      this.pushData($article, item, this.data[item]);
    }

    this.$mainDiv.appendChild($tabTitle);
    this.$mainDiv.appendChild($article);
  }
}
