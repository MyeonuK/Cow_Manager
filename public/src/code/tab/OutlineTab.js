class OutlineTab extends Tab {
  $target = null;
  $mainDiv = null;
  data = null;

  constructor($target) {
    super($target);

    this.$target = $target;
    this.$mainDiv = document.createElement("div");
    this.$mainDiv.className = "Tab";

    //fetch(`http://myeonu.cafe24app.com/outline`)
    fetch("outline")
      .then((res) => res.json())
      .then((res) => (this.data = res))
      .then((res) => console.log(this.data));

    setTimeout(() => {
      this.render();
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
    //$section1.render();
    // section
    const $section1 = new CowSection(this.$mainDiv, this.data);

    this.$target.appendChild(this.$mainDiv);
  }
}
