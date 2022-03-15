import { MainUI } from "./MainUI.js";

export class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;
    this.mainUI = new MainUI(this.$target);
  }
}
