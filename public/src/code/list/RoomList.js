class RoomList {
  house = null;

  constructor(house) {
    this.house = house;
    this.getData(house);
  }

  async getData(house) {
    await fetchUrl(`rooms?house=${house}`).then((res) => {
      this.data = res;
    });
  }

  render() {
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
    $title.innerText = "";
  }
}
