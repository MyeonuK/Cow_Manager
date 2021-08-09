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

  renderItems($itemDiv) {
    let arr = Object.keys(this.data);

    for (let i of arr) {
      const $item = document.createElement("div");
      $item.className = "Item";

      const $itemTitle = document.createElement("span");
      $itemTitle.className = "ItemTitle";
      $itemTitle.innerText = this.data[i].id;

      const $house = document.createElement("span");
      $house.className = "ItemDetail";
      $house.innerText = `${this.data[i].house}동 ${this.data[i].room}호\n${this.data[i].sex}`;

      const $birth = document.createElement("span");
      $birth.className = "ItemDetail";
      $birth.innerText = `${this.data[i].birthDate}\n${this.data[i].age}개월`;

      $item.appendChild($itemTitle);

      $item.appendChild($house);
      $item.appendChild($birth);
      $itemDiv.appendChild($item);
    }
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

    const $title = document.createElement("span");
    $title.className = "Title";
    $title.innerText = "전체 소 목록";

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

    const $searchDiv = document.createElement("div");
    $searchDiv.className = "SearchDiv";

    const $itemDiv = document.createElement("div");
    $itemDiv.className = "ItemDiv";

    const $searchBar = document.createElement("input");
    $searchBar.className = "Input";
    $searchBar.type = "number";
    $searchBar.oninput = function () {
      const $itemArr = document.getElementsByClassName("Item");
      let inputValue = $searchBar.value.replace(/(\s*)/g, "");
      let count = 0;

      for (let item of $itemArr) {
        let itemValue = item
          .getElementsByClassName("ItemTitle")[0]
          .innerText.replace(/(\s*)/g, "");

        if (itemValue.includes(inputValue)) {
          item.style.display = "flex";
          count++;
        } else {
          item.style.display = "none";
        }
      }

      /*
        if (count == 0) {
          $itemDiv.innerText = "검색결과가 없습니다.";
        } else {
          $itemDiv.removeAttribute("innerText");
        }*/
    };

    this.$mainDiv.appendChild($toolBar);
    $toolBar.appendChild($backButton);
    $toolBar.appendChild($title);
    $toolBar.appendChild($updateButton);
    this.$mainDiv.appendChild($searchDiv);
    $searchDiv.appendChild($searchBar);
    this.$mainDiv.appendChild($itemDiv);
    this.renderItems($itemDiv);
  }
}
