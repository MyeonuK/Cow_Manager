class TerritoryCard {
  $mainDiv = null;
  data = null;

  constructor($target, territory) {
    this.requestData(territory).then((res) => {
      console.log(res);
      this.data = res;
      this.render($target, res);
    });
  }

  async requestData(territory) {
    return await (await fetch(`territory/status`)).json();
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

  render($target, data) {
    // mainDiv
    let $mainDiv = document.createElement("div");
    $mainDiv.className = "CardDiv";
    $mainDiv.addEventListener("click", () => {
      let $mapWindow = new MapWindow();
      setTimeout(() => {
        $mapWindow.render();
      }, 200);
    });

    // sectionTitle
    const $sectionTitle = document.createElement("div");
    $sectionTitle.className = "Title";
    $sectionTitle.innerText = "완료 여부";

    // sectionContent
    const $sectionContent = document.createElement("div");
    $sectionContent.className = "ColContentDiv";

    // infoDiv
    const $infoDiv = document.createElement("div");
    $infoDiv.className = "BigElement";
    $infoDiv.id = "TerritoryStatus";
    $infoDiv.innerText = `완료 : ${data[1]}
    미완료 : ${data[0]}`;

    $mainDiv.appendChild($sectionTitle);
    $mainDiv.appendChild($sectionContent);
    $sectionContent.appendChild($infoDiv);

    $target.appendChild($mainDiv);
  }
}

let countData = [0, 0];
