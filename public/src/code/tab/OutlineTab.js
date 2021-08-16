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
      .then((res) => (this.data = res));

    setTimeout(() => {
      this.render();
    }, 100);
  }

  render() {
    // header
    const $header = document.createElement("header");
    $header.className = "Header";

    // title
    const $title = document.createElement("h1");
    $title.className = "Title";
    $title.innerText = "Cow_Manager";

    // section
    const $section1 = document.createElement("div");
    $section1.className = "SectionDiv";
    $section1.addEventListener("click", () => {
      new CowList(this.$target);
    });

    const $sectionTitle = document.createElement("div");
    $sectionTitle.className = "Title";
    $sectionTitle.innerText = "소 검색하기";
    $sectionTitle.innerHTML = `<div id="App"></div>`;

    const $sectionContent = document.createElement("div");
    $sectionContent.className = "RowContentDiv";

    const $numOfCow = document.createElement("span");
    $numOfCow.className = "BigElement";
    $numOfCow.innerText = this.data + "마리";

    this.$mainDiv.appendChild($header);
    $header.appendChild($title);
    this.$mainDiv.appendChild($section1);
    $section1.appendChild($sectionTitle);
    $section1.appendChild($sectionContent);
    $sectionContent.appendChild($numOfCow);

    this.$target.appendChild(this.$mainDiv);
  }
}
