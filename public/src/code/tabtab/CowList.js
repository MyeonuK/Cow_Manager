class CowList {
  $target = null;
  $prev = null;
  $mainDiv = null;
  data = null;

  constructor($prev) {
    this.$target = document.getElementsByClassName("MainDiv")[0];
    this.$prev = $prev;
    this.$prev.style.display = "none";

    this.fetchUrl("load");

    const $mainDiv = document.createElement("div");
    $mainDiv.className = "CowList";

    this.$mainDiv = $mainDiv;
    this.$target.appendChild(this.$mainDiv);

    setTimeout(() => {
      this.render();
    }, 300);
  }

  async fetchUrl(order) {
    //fetch(`http://myeonu.cafe24app.com/${order}`)
    fetch(order)
      .then((res) => res.json())
      .then((res) => {
        this.data = res;
      })
      .then((res) => {
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
  }

  renderItems() {
    const $itemDiv = document.createElement("div");
    $itemDiv.className = "ItemDiv";

    let arr = Object.keys(this.data);

    for (let i of arr) {
      const $item = document.createElement("div");
      $item.className = "Item";

      const $itemTitle = document.createElement("span");
      $itemTitle.className = "ItemTitle";
      $itemTitle.innerText = this.data[i].id;

      const $house = document.createElement("span");
      $house.className = "ItemDetail";
      $house.innerText = `${this.data[i].house}동 ${this.data[i].room}호`;

      const $birth = document.createElement("span");
      $birth.className = "ItemDetail";
      $birth.innerText = `${this.data[i].birthDate}\n${this.data[i].age}개월`;

      $item.appendChild($itemTitle);

      $item.appendChild($house);
      $item.appendChild($birth);
      $itemDiv.appendChild($item);
    }

    return $itemDiv;
  }

  hide() {
    this.$target.removeChild(this.$mainDiv);
    this.$prev.style.display = "block";
  }

  render() {
    const $toolBar = document.createElement("div");
    $toolBar.className = "ToolBar";

    const $backButton = document.createElement("button");
    $backButton.className = "Button";
    $backButton.innerText = "back";
    $backButton.addEventListener("click", () => {
      this.hide();
    });

    const $updateButton = document.createElement("button");
    $updateButton.className = "Button";
    $updateButton.innerText = "update";
    $updateButton.addEventListener("click", () => {
      this.$mainDiv.removeChild(document.getElementsByClassName("ItemDiv")[0]);
      this.fetchUrl("update").then((res) => {
        this.$mainDiv.appendChild(this.renderItems());
        window.scrollTo(0, 0);
      });
    });

    this.$mainDiv.appendChild($toolBar);
    $toolBar.appendChild($backButton);
    $toolBar.appendChild($updateButton);
    this.$mainDiv.appendChild(this.renderItems());
  }
}
