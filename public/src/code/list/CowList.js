class CowList {
  $target = null;
  $prev = null;
  $mainDiv = null;
  data = null;
  temp = null;

  constructor(data) {
    const { title, type, house, room, ...etc } = data;

    this.title = title;
    this.setElements();

    this.setData(type, house, room).then((res) => {
      this.data = res;
      console.log(res);
      this.render();
    });
  }

  setElements() {
    // mainDiv
    this.$mainDiv = document.createElement("div");
    this.$mainDiv.className = "List";

    this.$target = document.getElementsByClassName("MainDiv")[0];
    this.$prev = document.getElementsByClassName("ContentDiv")[0];
  }

  async setData(data) {
    const { type, house, room, ...etc } = data;
    let res;

    switch (type) {
      case "all":
      default:
        res = await fetch(`cow/list?type=all`);
        return await res.json();
    }
  }

  hide() {
    this.$target.removeChild(this.$mainDiv);
    this.$prev.style.display = "block";
  }

  renderItems($itemDiv) {
    let arr = Object.keys(this.data);

    for (let i of arr) {
      let item = this.data[i];

      const $item = document.createElement("div");
      $item.className = "Item";

      const $itemTitle = document.createElement("span");
      $itemTitle.className = "ItemTitle";
      $itemTitle.innerText = `${item.id.slice(0, 3)} ${item.id.slice(
        3,
        7
      )} ${item.id.slice(7, 13)}`;

      const $house = document.createElement("span");
      $house.className = "ItemDetail";
      if (item.House.house == "O") {
        $house.innerText = `방목\n${item.sex}`;
      } else {
        $house.innerText = `${item.House.house}동 ${item.House.side}${item.House.room}번\n${item.sex}`;
      }

      const $birth = document.createElement("span");
      $birth.className = "ItemDetail";
      $birth.innerText = `${item.birthDate}\n${item.age}개월`;

      $item.addEventListener("click", function () {
        //const $itemModal = new CowModal(item.id);
      });

      $item.appendChild($itemTitle);
      $item.appendChild($house);
      $item.appendChild($birth);
      $itemDiv.appendChild($item);
    }
  }

  render() {
    this.$prev.style.display = "none";

    this.$target.appendChild(this.$mainDiv);

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
    $title.innerText = this.title;

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
    $searchBar.pattern = `\d*`;
    $searchBar.placeholder = "번호를 입력하세요";
    $searchBar.min = "0";
    $searchBar.oninput = async function () {
      const $itemArr = document.getElementsByClassName("Item");
      let inputValue = $searchBar.value.replace(/(\s*)/g, "");
      let count = 0;

      async function removeAlll() {
        for (let item of $itemArr) {
          item.remove();
        }
      }

      await removeAlll();
      /////////
      /*
      console.log(this.data);

      let arr = Object.keys(this.data);

      for (let i of arr) {
        let item = this.data[i];

        if (item.id.includes(inputValue)) {
          const $item = document.createElement("div");
          $item.className = "Item";

          const $itemTitle = document.createElement("span");
          $itemTitle.className = "ItemTitle";
          $itemTitle.innerText = `${item.id.slice(0, 3)} ${item.id.slice(
            3,
            7
          )} ${item.id.slice(7, 13)}`;

          const $house = document.createElement("span");
          $house.className = "ItemDetail";
          if (item.House.house == "O") {
            $house.innerText = `방목\n${item.sex}`;
          } else {
            $house.innerText = `${item.House.house}동 ${item.House.side}${item.House.room}번\n${item.sex}`;
          }

          const $birth = document.createElement("span");
          $birth.className = "ItemDetail";
          $birth.innerText = `${item.birthDate}\n${item.age}개월`;

          $item.addEventListener("click", function () {
            const $itemModal = new CowModal(item.id);
          });

          $item.appendChild($itemTitle);
          $item.appendChild($house);
          $item.appendChild($birth);
          $itemDiv.appendChild($item);
        }
      }
      */
      /////////////

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
      document.body.scrollTop = document.body.scrollHeight;

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
