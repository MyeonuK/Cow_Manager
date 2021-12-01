class CowCard {
  $mainDiv = null;
  title = null;
  data = null;

  constructor($target, title, request) {
    this.$target = $target;
    this.title = title;

    this.setData(request).then((res) => {
      this.render($target);
    });
  }

  async setData(request) {
    let res = await fetch(`cow-count?request=${request}`);
    this.data = await res.json();
  }

  render($target) {
    // $mainDiv
    const $mainDiv = document.createElement("div");
    $mainDiv.className = "CardDiv";
    $mainDiv.addEventListener("click", () => {
      new CowList(document.getElementsByClassName("ContentDiv")[0]);
    });

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
    $mainDiv.appendChild($cardTitle);
    $mainDiv.appendChild($cardContent);

    $target.appendChild($mainDiv);
  }
}
