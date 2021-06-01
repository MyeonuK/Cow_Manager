class Tab {
  $mainDiv = null;
  data = null;

  constructor($target, data) {
    /*
    super($target, data);
    console.log("Tab");
    this.data = data;
    const $mainDiv = document.createElement("div");
    $mainDiv.className = "TabDiv";
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
