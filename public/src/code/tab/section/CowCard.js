class CowCard {
  $mainDiv = null;
  title = null;
  data = {};

  constructor($target, data) {
    const { type, ...etc } = data;

    this.setElements(data);

    this.setData(type).then((res) => {
      this.data = res;
      this.render($target);
    });
  }

  setElements(data) {
    const { type, ...etc } = data;

    // $mainDiv
    this.$mainDiv = document.createElement("div");
    this.$mainDiv.className = "CardDiv";
    this.$mainDiv.addEventListener("click", () => {
      new CowList({ type: "all" });
    });

    // title
    if (type == "all") {
      this.title = "전체 목록";
    }
  }

  async setData(type) {
    //let res = await fetch(`cow/count?request=${request}`);
    let res = await fetch(`cow/count?type=all`);
    return await res.json();
  }

  render($target) {
    // $cardTitle
    const $cardTitle = document.createElement("div");
    $cardTitle.className = "Title";
    $cardTitle.innerText = this.title;

    // $cardContent
    const $cardContent = document.createElement("div");
    $cardContent.className = "CardContentDiv";

    const $content = document.createElement("div");
    $content.className = "Content";
    $content.innerText = `${this.data}마리`;

    $cardContent.appendChild($content);

    // append
    this.$mainDiv.appendChild($cardTitle);
    this.$mainDiv.appendChild($cardContent);

    $target.appendChild(this.$mainDiv);
  }
}
