console.log("app is running!");

class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;
    this.mainUI = new MainUI(this.$target);
  }
}
