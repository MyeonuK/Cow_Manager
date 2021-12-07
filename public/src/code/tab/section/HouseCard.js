class HouseCard {
  $mainDiv = null;

  constructor($target, house) {
    this.requestData(house).then((res) => {
      this.render($target, res);
    });
  }

  async requestData(house) {
    let data = { house: house, cnt: null, age: null };

    let res = await fetch(`cow/count?request=house&&house=${house}`);
    data.cnt = await res.json();

    res = await fetch(`cow/age?request=house&&house=${house}`);
    data.age = await res.json();

    return data;
  }

  render($target, data) {
    const $mainDiv = document.createElement("div");
    $mainDiv.className = "CardDiv";
    $mainDiv.addEventListener("click", () => {
      let $roomList = new RoomList(house);
      //$roomList.render();
    });

    const $sectionTitle = document.createElement("div");
    $sectionTitle.className = "Title";
    if (data.house == "O") {
      $sectionTitle.innerText = "방  목";
    } else {
      $sectionTitle.innerText = `${data.house} 축사`;
    }

    const $sectionContent = document.createElement("div");
    $sectionContent.className = "ColContentDiv";

    const $infoDiv = document.createElement("div");
    $infoDiv.classList = "BigElement";
    $infoDiv.innerText = `${data.cnt}마리 (${data.age}개월)`;

    $mainDiv.appendChild($sectionTitle);
    $mainDiv.appendChild($sectionContent);
    $sectionContent.appendChild($infoDiv);

    $target.appendChild($mainDiv);
  }
}
