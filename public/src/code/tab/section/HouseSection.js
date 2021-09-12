class HouseSection {
  $mainDiv = null;
  house = null;
  rooms = null;

  constructor(house, rooms) {
    this.house = house;
    this.rooms = rooms;
  }

  render($target) {
    this.$mainDiv = document.createElement("div");
    this.$mainDiv.className = "SectionDiv";
    this.$mainDiv.addEventListener("click", () => {
      let $roomList = new RoomList(this.house);

      $roomList.render(document.getElementsByClassName("ContentDiv")[0]);
    });

    const $sectionTitle = document.createElement("div");
    $sectionTitle.className = "Title";
    $sectionTitle.innerText = `${this.house} 축사`;

    const $sectionContent = document.createElement("div");
    $sectionContent.className = "ColContentDiv";

    for (let room of this.rooms) {
      const $roomT = document.createElement("div");
      $roomT.classList = "BigElement";
      $roomT.innerText = `${room}번 칸`;
      $sectionContent.appendChild($roomT);
    }

    this.$mainDiv.appendChild($sectionTitle);
    this.$mainDiv.appendChild($sectionContent);

    $target.appendChild(this.$mainDiv);
  }
}
