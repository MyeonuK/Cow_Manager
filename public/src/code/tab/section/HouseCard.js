class HouseCard {
  $mainDiv = null;
  title = null;
  data = null;

  constructor($target, title, request) {
    this.$target = $target;
    this.title = title;
  }

  render($target) {
    const $mainDiv = document.createElement("div");
    $mainDiv.className = "CardDiv";
    $mainDiv.addEventListener("click", () => {
      let $roomList = new RoomList(this.house);
      $roomList.render();
    });

    const $sectionTitle = document.createElement("div");
    $sectionTitle.className = "Title";
    if (this.house == "O") {
      $sectionTitle.innerText = "방 목";
    } else {
      $sectionTitle.innerText = `${this.house} 축사`;
    }

    const $sectionContent = document.createElement("div");
    $sectionContent.className = "ColContentDiv";

    const $infoDiv = document.createElement("div");
    $infoDiv.classList = "BigElement";
    $infoDiv.innerText = `${this.count}마리 (${this.age}개월)`;

    $mainDiv.appendChild($sectionTitle);
    $mainDiv.appendChild($sectionContent);
    $sectionContent.appendChild($infoDiv);

    $target.appendChild($mainDiv);
  }
}
