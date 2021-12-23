class CowCard {
  $mainDiv = null;
  data = null;

  constructor($target, data) {
    const { title, type, ...etc } = data;

    this.setData(type).then((res) => {
      this.data = res;
      this.render($target, title);
    });
  }

  async setData(type) {
    //let res = await fetch(`cow/count?request=${request}`);
    let res = await fetch(`cow/count?type=all`);
    return await res.json();
  }

  setEvent($target) {
    $target.addEventListener("click", () => {
      new CowList({ type: "all" });
    });
  }

  render($target, title) {
    // $mainDiv
    const $mainDiv = document.createElement("div");
    $mainDiv.className = "CardDiv";

    this.setEvent($mainDiv);

    // $cardTitle
    const $cardTitle = document.createElement("div");
    $cardTitle.className = "Title";
    $cardTitle.innerText = title;

    // $cardContent
    const $cardContent = document.createElement("div");
    $cardContent.className = "CardContentDiv";

    const $content = document.createElement("div");
    $content.className = "Content";
    $content.innerText = `${this.data}마리`;

    $cardContent.appendChild($content);

    // append
    $mainDiv.appendChild($cardTitle);
    $mainDiv.appendChild($cardContent);

    $target.appendChild($mainDiv);
  }
}
