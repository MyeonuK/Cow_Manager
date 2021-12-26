class RoomList extends List {
  $target = null;
  $prev = null;
  $mainDiv = null;
  data = [];
  house = null;

  constructor(house) {
    super();
    this.house = house;
    this.getData(house);

    const $mainDiv = document.createElement("div");
    $mainDiv.className = "List";
    this.$mainDiv = $mainDiv;
  }

  async getData(house) {
    await fetch(`house_room?house=${house}`)
      .then((res) => res.json())
      .then((res) => {
        let left = new Array(19);
        let right = new Array(19);

        for (let room of res) {
          if (room.side == "L") {
            left[room.room] = room;
          } else {
            right[room.room] = room;
          }
        }

        this.data.push(left);
        this.data.push(right);
      });
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
        const $room = document.createElement("div");
        $room.className = "Room";

        const $roomTitle = document.createElement("div");
        $roomTitle.className = "RoomTitle";
        $roomTitle.innerText = j + 1;

        const $roomContent = document.createElement("div");
        $roomContent.className = "RoomContent";
        if (this.data[i][j] == undefined) {
          $roomContent.innerText = "-";
        } else {
          $roomContent.innerText = `${this.data[i][j].cnt}마리
            평균 ${this.data[i][j].age}개월`;

          $room.addEventListener("click", () => {
            new CowList(
              this.$mainDiv,
              i == 0 ? this.house + "L" + (j + 1) : this.house + "R" + (j + 1)
            );
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

  render() {
    this.$target = document.getElementsByClassName("MainDiv")[0];
    this.$prev = document.getElementsByClassName("ContentDiv")[0];
    this.$prev.style.display = "none";

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

    this.$target.appendChild(this.$mainDiv);

    if (this.house == "O") {
      this.hide();
      new CowList(document.getElementsByClassName("ContentDiv")[0], "OOOO");
    }
  }
}
