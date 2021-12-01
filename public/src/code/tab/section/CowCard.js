class CowCard {
  $mainDiv = null;
  title = "";
  data = null;

  constructor(title, request) {
    this.title = title;
    this.getData(request);
  }

  async getData(request) {
    fetch(`cow_count?request=${request}`)
      .then((res) => res.json())
      .then((res) => (this.data = res));
  }

  render($target) {
    setTimeout(() => {
      // $mainDiv
      const $mainDiv = document.createElement("div");
      $mainDiv.className = "CardDiv";
      $mainDiv.addEventListener("click", () => {
        new CowList(document.getElementsByClassName("ContentDiv")[0]);
      });
      this.$mainDiv = $mainDiv;

      // $cardTitle
      const $cardTitle = document.createElement("div");
      $cardTitle.className = "Title";
      $cardTitle.innerText = this.title;

      // $cardContent
      const $cardContent = document.createElement("div");
      $cardContent.className = "CardContentDiv";

      console.log(this.data);
      const $content = document.createElement("div");
      $content.className = "Content";
      $content.innerText = `${this.data}마리`;

      $cardContent.appendChild($content);
      /*
      for (let c of this.data) {
        const $content = document.createElement("div");
        $content.className = "Content";
        $content.innerText = c;

        $cardContent.appendChild($content);
      }*/

      // append
      this.$mainDiv.appendChild($cardTitle);
      this.$mainDiv.appendChild($cardContent);

      $target.appendChild(this.$mainDiv);
    }, 200);
  }
}
