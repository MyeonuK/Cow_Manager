class RoomList extends List {
  house = null;

  constructor(house) {
    super();
    console.log(house);
    this.house = house;
    this.getData(house);

    const $mainDiv = document.createElement("div");
    $mainDiv.className = "List";
    this.$mainDiv = $mainDiv;
  }

  async getData(house) {
    //await fetchUrl(`rooms?house=${house}`)
    fetch(`rooms?house=${house}`)
      .then((res) => (this.data = res.json()))
      .then((res) => {
        console.log(this.data);
        let arr = new Array(32);
        arr.fill(0);

        for (let item in this.data) {
          let index = Number(item.slice(2)) - 1;
          if (item[1] == "R") {
            index += 16;
          }

          arr[index] = this.data[item];
        }
        this.data = arr;
        console.log(arr);
      });
  }

  hide() {
    this.$target.removeChild(this.$mainDiv);
    this.$prev.style.display = "block";
  }

  renderItems($target) {
    const $houseDiv = document.createElement("div");
    $houseDiv.className = "HouseDiv";

    for (let i = 0; i < 2; i++) {
      if (i == 1) {
        let $roomsDiv = document.createElement("div");
        $roomsDiv.className = "RoomsDiv";
        $houseDiv.appendChild($roomsDiv);
      }
      const $roomsDiv = document.createElement("div");
      $roomsDiv.className = "RoomsDiv";

      for (let j = 0; j < 16; j++) {
        const $room = document.createElement("div");
        $room.className = "Room";

        const $roomTitle = document.createElement("div");
        $roomTitle.className = "RoomTitle";
        $roomTitle.innerText = `${i == 0 ? "L" : "R"}${j + 1} `;

        const $roomContent = document.createElement("div");
        $roomContent.className = "RoomContent";
        $roomContent.innerText = `${this.data[i * 16 + j]}마리`;

        $roomsDiv.appendChild($room);
        $room.appendChild($roomTitle);
        $room.appendChild($roomContent);
      }
      console.log("wfwewe");
      $houseDiv.appendChild($roomsDiv);
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
  }
}
