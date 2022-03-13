export class TerritoryStatusUpdateSection {
  $mainDiv = null;
  data = null;

  constructor() {}

  render($target) {
    this.$mainDiv = document.createElement("div");
    this.$mainDiv.className = "SectionDiv";
    this.$mainDiv.addEventListener("click", () => {
      let $mapWindow = new MapWindow();
      setTimeout(() => {
        $mapWindow.render();
      }, 200);
    });

    const $sectionTitle = document.createElement("div");
    $sectionTitle.className = "Title";
    $sectionTitle.innerText = "완료 여부";

    const $sectionContent = document.createElement("div");
    $sectionContent.className = "ColContentDiv";

    const $infoDiv = document.createElement("div");
    $infoDiv.classList = "BigElement";
    $infoDiv.innerText = `완료 : ${
      this.data[0] === undefined ? 0 : this.data[0].cnt
    }
      미완료 : ${this.data[1] === undefined ? 0 : this.data[1].cnt}`;

    this.$mainDiv.appendChild($sectionTitle);
    this.$mainDiv.appendChild($sectionContent);
    $sectionContent.appendChild($infoDiv);

    $target.appendChild(this.$mainDiv);
  }
}
