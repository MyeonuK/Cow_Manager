export class RoomList {
  $target = null;
  $prev = null;
  $mainDiv = null;
  data = { age: null, count: null };
  house = null;

  constructor(data) {
    const { house, ...etc } = data;
    this.title = `${house} 축사`;
    this.house = house;

    this.setElement();

    this.setData(house).then((res) => {
      this.render();
    });
  }

  async setData(house) {
    let result = await fetch(`cow/count?type=room&&house=${house}`);
    this.data.count = await result.json();

    result = await fetch(`cow/age?type=room&&house=${house}`);
    this.data.age = await result.json();
  }

  setElement() {
    this.$target = document.getElementsByClassName("MainDiv")[0];
    this.$prev = document.getElementsByClassName("ContentDiv")[0];
  }

  hide() {
    this.$target.removeChild(this.$mainDiv);
    this.$prev.style.display = "block";
  }

  renderItems($target) {
    const $houseDiv = document.createElement("div");
    $houseDiv.className = "HouseDiv";

    let roomNum = 16;

    if (this.house == "B") {
      roomNum = 9;
    } else if (this.house == "C") {
      roomNum = 19;
    }

    for (let i = 0; i < 2; i++) {
      const $roomsDiv = document.createElement("div");
      $roomsDiv.className = "RoomsDiv";
      $houseDiv.appendChild($roomsDiv);

      for (let j = 0; j < roomNum; j++) {
        // room
        const $room = document.createElement("div");
        $room.className = "Room";

        // roomTitle
        const $roomTitle = document.createElement("div");
        $roomTitle.className = "RoomTitle";
        $roomTitle.innerText = j + 1;

        // roomContent
        const $roomContent = document.createElement("div");
        $roomContent.className = "RoomContent";
        if (this.data.age[i][j] == null) {
          $roomContent.innerText = "-";
        } else {
          $roomContent.innerText = `${this.data.count[i][j]}마리
            평균 ${this.data.age[i][j]}개월`;

          $room.addEventListener("click", () => {
            new CowList({
              type: "room",
              prev: this.$mainDiv,
              house: this.house,
              side: i == 0 ? "L" : "R",
              room: j + 1,
            });
          });
        }

        $roomsDiv.appendChild($room);
        $room.appendChild($roomTitle);
        $room.appendChild($roomContent);
      }

      if (i == 0) {
        let $roomsDiv = document.createElement("div");
        $roomsDiv.className = "RoomsDiv";

        let $entranceImg = document.createElement("img");
        $entranceImg.className = "EntranceImg";
        $entranceImg.src = "src/images/arrowImg.png";

        $houseDiv.appendChild($roomsDiv);
        $roomsDiv.appendChild($entranceImg);
      }
    }

    $target.appendChild($houseDiv);
  }

  async render() {
    // mainDiv
    const $mainDiv = document.createElement("div");
    $mainDiv.className = "List";
    this.$mainDiv = $mainDiv;

    const $toolbar = document.createElement("div");
    $toolbar.className = "ToolBar";

    const $backButton = document.createElement("button");
    $backButton.className = "Button";
    $backButton.innerText = "back";
    $backButton.addEventListener("click", () => {
      this.hide();
    });

    const $title = document.createElement("span");
    $title.className = "Title";
    $title.innerText = `${this.house} 축사`;

    const $itemDiv = document.createElement("div");
    $itemDiv.className = "ItemDiv";

    this.$mainDiv.appendChild($toolbar);
    $toolbar.appendChild($backButton);
    $toolbar.appendChild($title);
    this.$mainDiv.appendChild($itemDiv);

    setTimeout(() => {
      this.renderItems($itemDiv);
    }, 200);

    this.$prev.style.display = "none";
    this.$target.appendChild(this.$mainDiv);
    /*
    if (this.house == "O") {
      this.hide();
      new CowList(document.getElementsByClassName("ContentDiv")[0], "OOOO");
    }
*/
    document.body.scrollTop = document.body.scrollHeight;
    //window.scrollTo(0, document.body.scrollHeight);
  }
}
