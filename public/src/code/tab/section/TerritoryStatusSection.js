class TerritoryStatusSection {
  $mainDiv = null;
  data = null;

  constructor(data) {
    this.data = data;
    if (this.data[0] === undefined) {
      countData[0] = 0;
    } else {
      countData[0] = this.data[0].cnt;
    }

    if (this.data[1] === undefined) {
      countData[1] = 0;
    } else {
      countData[1] = this.data[1].cnt;
    }
  }

  updateData(d) {
    if (d == 0) {
      countData[0]++;
      countData[1]--;
    } else if (d == 1) {
      countData[0]--;
      countData[1]++;
    }
  }

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
    $infoDiv.className = "BigElement";
    $infoDiv.id = "TerritoryStatus";
    $infoDiv.innerText = `완료 : ${countData[1]}
    미완료 : ${countData[0]}`;

    this.$mainDiv.appendChild($sectionTitle);
    this.$mainDiv.appendChild($sectionContent);
    $sectionContent.appendChild($infoDiv);

    $target.appendChild(this.$mainDiv);
  }
}

let countData = [0, 0];
