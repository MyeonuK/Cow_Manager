class Tab {
  $mainDiv = null;

  constructor($target) {
    /*
    super($target);
    console.log("Tab");
    const $mainDiv = document.createElement("div");
    $mainDiv.className = "tabDiv";
    $mainDiv.innerText = "tabtabtab";

    this.$mainDiv = $mainDiv;
    $target.appendChild(this.$mainDiv);
    */
  }

  show() {
    this.$mainDiv.style.display = "block";
  }

  hide() {
    this.$mainDiv.style.display = "none";
  }
}
