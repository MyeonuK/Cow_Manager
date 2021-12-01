class OutlineTab extends Tab {
  $target = null;
  $mainDiv = null;

  constructor($target) {
    super($target);

    this.$target = $target;
    this.$mainDiv = document.createElement("div");
    this.$mainDiv.className = "Tab";

    this.render();
  }

  renderCards($target) {
    /*
    const $cowSection = new CowSection(this.data);
    console.log($target);
    $cowSection.render($target);
*/
    const $totalCowCard = new CowCard("전체 개체", "total");
    setTimeout(() => {
      $totalCowCard.render($target);
    }, 200);
  }

  render() {
    // header
    const $header = document.createElement("header");
    $header.className = "Header";

    // title
    const $title = document.createElement("h1");
    $title.className = "Title";
    $title.innerText = "Cow_Manager";

    this.$mainDiv.appendChild($header);
    $header.appendChild($title);

    this.renderCards(this.$mainDiv);

    this.$target.appendChild(this.$mainDiv);
  }
}
