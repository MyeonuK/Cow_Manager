class HouseTab extends Tab {
  $mainDiv = null;

  constructor($target) {
    super($target);
    console.log("HouseTab");
    const $mainDiv = document.createElement("div");
    $mainDiv.className = "HouseDiv";
    $mainDiv.innerText = "househouse";

    this.$mainDiv = $mainDiv;
    $target.appendChild(this.$mainDiv);
  }
}
