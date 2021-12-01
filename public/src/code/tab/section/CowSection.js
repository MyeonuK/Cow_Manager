class CowSection {
  $mainDiv = null;
  data = null;

  constructor(data) {
    this.data = data;
  }

  render($target) {
    const $mainDiv = document.createElement("div");
    $mainDiv.className = "SectionDiv";
    $mainDiv.addEventListener("click", () => {
      new CowList(document.getElementsByClassName("ContentDiv")[0]);
    });

    const $sectionTitle = document.createElement("div");
    $sectionTitle.className = "Title";
    $sectionTitle.innerText = "소 검색하기";

    const $sectionContent = document.createElement("div");
    $sectionContent.className = "RowContentDiv";

    const $numOfCow = document.createElement("span");
    $numOfCow.className = "BigElement";
    $numOfCow.innerText = this.data + "마리";

    $mainDiv.appendChild($sectionTitle);
    $mainDiv.appendChild($sectionContent);
    $sectionContent.appendChild($numOfCow);

    this.$mainDiv = $mainDiv;
    $target.appendChild(this.$mainDiv);
  }
}
