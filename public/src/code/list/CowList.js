class CowList {
  $target = null;
  $prev = null;
  $mainDiv = null;
  data = [];

  constructor($prev) {
    this.$target = document.getElementsByClassName("MainDiv")[0];
    this.$prev = $prev;
    this.$prev.style.display = "none";

    this.getData();
    //this.fetchUrl("cow_house");

    const $mainDiv = document.createElement("div");
    $mainDiv.className = "List";

    this.$mainDiv = $mainDiv;
    this.$target.appendChild(this.$mainDiv);

    setTimeout(() => {
      this.render();
    }, 200);
  }

  async getData() {
    //fetch(`http://myeonu.cafe24app.com/${order}`)

    let fetchData;
    await fetch("cow_house")
      .then((res) => res.json())
      .then((res) => {
        fetchData = res;
      })
      .then((res) => {
        for (let fd of fetchData) {
          let cow = {};

          cow.id = fd.id;
          cow.house = fd.house;
          cow.side = fd.side ? fd.side : null;
          cow.room = fd.room ? fd.room : null;

          fetch(`cow_profile?id=${cow.id}`)
            .then((res) => res.json())
            .then((res) => {
              console.log(cow.id + res[0]);
              cow.birthDate = res[0].birthDate
                ? res[0].birthDate.slice(0, 10)
                : null;
              cow.age = res[0].age ? res[0].age : null;
              cow.sex = res[0].sex ? res[0].sex : null;
            });

          this.data.push(cow);
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
      $itemTitle.innerText = `${this.data[i].id.slice(0, 3)} ${this.data[
        i
      ].id.slice(3, 7)} ${this.data[i].id.slice(7, 13)}`;

      const $house = document.createElement("span");
      $house.className = "ItemDetail";
      if (this.data[i].house == "O") {
        $house.innerText = `방목\n${this.data[i].sex}`;
      } else {
        $house.innerText = `${this.data[i].house[0]}동 ${this.data[i].room}번\n${this.data[i].sex}`;
      }

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
    console.log(this.data);
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
      /*
      this.$mainDiv.removeChild(document.getElementsByClassName("ItemDiv")[0]);
      this.fetchUrl("update").then((res) => {
        const $itemDiv = document.createElement("div");
        $itemDiv.className = "ItemDiv";
        this.$mainDiv.appendChild($itemDiv);
        this.renderItems($itemDiv);
        window.scrollTo(0, 0);
      });
      */
    });

    const $searchDiv = document.createElement("div");
    $searchDiv.className = "SearchDiv";

    const $itemDiv = document.createElement("div");
    $itemDiv.className = "ItemDiv";

    const $searchBar = document.createElement("input");
    $searchBar.className = "Input";
    $searchBar.type = "number";
    $searchBar.min = "0";
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
          count += 1;
        } else {
          item.style.display = "none";
        }
      }
      /*
      if (count == 0) {
        $itemDiv.innerText = "검색결과가 없습니다.";
      } else {
        $itemDiv.innerText = "";
      }
      */
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
