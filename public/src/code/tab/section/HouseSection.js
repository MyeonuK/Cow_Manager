class HouseSection {
  $mainDiv = null;
  house = null;
  count = null;
  age = null;

  constructor(d) {
    this.house = d.house;
    this.count = d.cnt;
    this.age = d.age;
  }

  render($target) {
    this.$mainDiv = document.createElement("div");
    this.$mainDiv.className = "SectionDiv";
    this.$mainDiv.addEventListener("click", () => {
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

    this.$mainDiv.appendChild($sectionTitle);
    this.$mainDiv.appendChild($sectionContent);
    $sectionContent.appendChild($infoDiv);

    $target.appendChild(this.$mainDiv);
  }
}
