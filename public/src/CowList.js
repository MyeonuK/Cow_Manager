class CowList {
  $mainDiv = null;
  data = null;

  constructor($target) {
    //fetch("http://myeonu.cafe24app.com/load")
    fetch("load")
      .then((res) => res.json())
      .then((res) => {
        this.data = res;
      })
      .then((res) => {
        console.log(this.data);
        for (let i of this.data) {
          if (i.birthDate == null) {
            i.birthDate = "";
          } else {
            i.birthDate = i.birthDate.slice(0, 10);
          }
          if (i.famDate == null) {
            i.famDate = "";
          } else {
            i.famDate = i.famDate.slice(0, 10);
          }

          if (i.bruDate == null) {
            i.bruDate = "";
          } else {
            i.bruDate = i.bruDate.slice(0, 10);
          }

          if (i.tubeDate == null) {
            i.tubeDate = "";
          } else {
            i.tubeDate = i.tubeDate.slice(0, 10);
          }
        }
      });

    const $mainDiv = document.createElement("div");
    $mainDiv.className = "OutlineDiv";

    this.$mainDiv = $mainDiv;
    $target.appendChild(this.$mainDiv);

    setTimeout(() => {
      this.render();
    }, 300);
  }

  show() {
    this.$mainDiv.style.display = "block";
  }

  hide() {
    this.$mainDiv.style.display = "none";
  }

  render() {
    const $backButton = document.createElement("button");
    $backButton.addEventListener("click", () => {
      delete this;
    });

    let arr = Object.keys(this.data);

    for (let i of arr) {
      console.log(this.data[i]);
      const $item = document.createElement("div");
      $item.className = "ItemDiv";

      const $itemTitle = document.createElement("span");
      $itemTitle.className = "ItemTitle";
      $itemTitle.innerText = this.data[i].id;

      const $itemContent = document.createElement("span");
      $itemContent.className = "ItemContent";

      const $house = document.createElement("span");
      $house.className = "ItemDetail";
      $house.innerText = this.data[i].house;

      const $room = document.createElement("span");
      $room.className = "ItemDetail";
      $room.innerText = this.data[i].room;

      $itemContent.appendChild($house);
      $itemContent.appendChild($room);

      $item.appendChild($itemTitle);
      $item.appendChild($itemContent);
      this.$mainDiv.appendChild($item);
    }
  }
}
