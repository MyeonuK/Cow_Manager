class HouseCard {
  $target = null;
  $mainDiv = null;
  data = null;

  constructor($target, house) {
    this.$target = $target;
    this.requestData(house).then((res) => {
      //this.render($target, res);
      this.data = res;
    });
  }

  async requestData(house) {
    let data = { house: house, cnt: null, age: null };

    let res = await fetch(`cow/count?type=house&&house=${house}`);
    data.cnt = await res.json();

    res = await fetch(`cow/age?type=house&&house=${house}`);
    data.age = await res.json();

    return data;
  }

  //render($target, data) {
  render() {
    //const { house, cnt, age, ...etc } = this.data;
    const $mainDiv = document.createElement("div");
    $mainDiv.className = "CardDiv";
    $mainDiv.addEventListener("click", () => {
      switch (this.data.house) {
        case "O":
          const $cowList = new CowList({
            title: "방목 소 목록",
            type: "house",
            house: this.data.house,
          });
          break;
        default:
          const $roomList = new RoomList({ house: this.data.house });
          break;
      }
      //$roomList.render();
    });

    const $sectionTitle = document.createElement("div");
    $sectionTitle.className = "Title";
    if (this.data.house == "O") {
      $sectionTitle.innerText = "방  목";
    } else {
      $sectionTitle.innerText = `${this.data.house} 축사`;
    }

    const $sectionContent = document.createElement("div");
    $sectionContent.className = "ColContentDiv";

    const $infoDiv = document.createElement("div");
    $infoDiv.classList = "BigElement";
    $infoDiv.innerText = `${this.data.cnt}마리 (${this.data.age}개월)`;

    $mainDiv.appendChild($sectionTitle);
    $mainDiv.appendChild($sectionContent);
    $sectionContent.appendChild($infoDiv);

    this.$target.appendChild($mainDiv);
    console.log(this.data.house);
  }
}
