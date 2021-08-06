class Outline {
  $mainDiv = null;
  data = null;

  constructor($target, data) {
    //super($target, data);
    console.log(data);
    this.data = data;

    const $mainDiv = document.createElement("div");
    $mainDiv.className = "OutlineDiv";

    this.$mainDiv = $mainDiv;
    $target.appendChild(this.$mainDiv);
    this.render();
  }

  render() {
    console.log(data);
    let arr = Object.keys(this.data);
    for (let d of arr) {
      console.log(d);
    }
  }
}
