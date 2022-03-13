class List {
  $target = null;
  $prev = null;
  $mainDiv = null;
  data = null;

  hide() {
    this.$target.removeChild(this.$mainDiv);
    this.$prev.style.display = "block";
  }
}
