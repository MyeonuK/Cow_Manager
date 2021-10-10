class CowSection {
  $target = null;
  $mainDiv = null;
  data = null;

  constructor($target, data) {
    this.$target = $target;
    this.data = data;
    this.$mainDiv = document.createElement("div");
    this.$mainDiv.className = "SectionDiv";
    this.$mainDiv.addEventListener("click", () => {
      new CowList(document.getElementsByClassName("ContentDiv")[0]);
    });
    this.render();
  }

  render() {
    const $sectionTitle = document.createElement("div");
    $sectionTitle.className = "Title";
    $sectionTitle.innerText = "소 검색하기";

    const $sectionContent = document.createElement("div");
    $sectionContent.className = "RowContentDiv";

    const $numOfCow = document.createElement("span");
    $numOfCow.className = "BigElement";
    $numOfCow.innerText = this.data + "마리";

    this.$mainDiv.appendChild($sectionTitle);
    this.$mainDiv.appendChild($sectionContent);
    $sectionContent.appendChild($numOfCow);

    this.$target.appendChild(this.$mainDiv);
  }
}
