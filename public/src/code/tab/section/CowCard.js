class CowCard {
  $mainDiv = null;
  data = null;

  constructor($target, title, request) {
    this.requestData(request).then((res) => {
      this.data = res;
      this.render($target, title);
    });
  }

  async requestData(request) {
    let res = await fetch(`cow/count?request=${request}`);
    return await res.json();
  }

  render($target, title) {
    // $mainDiv
    const $mainDiv = document.createElement("div");
    $mainDiv.className = "CardDiv";
    $mainDiv.addEventListener("click", () => {
      new CowList(document.getElementsByClassName("ContentDiv")[0]);
    });

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
