console.log("app is running!");

class App {
  $target = null;
  data = [];

  constructor($target) {
    document.cookie = "SameSite=Lax;";

    /*
    let pcDevice = "win16|win32|win64|mac|macintel";

    if (navigator.platform) {
      if (pcDevice.indexOf(navigator.platform.toLowerCase()) < 0) {
        location.replace("http://rlagusdn0217.cafe24.com/mobile.html");
      } else {
        this.$target = $target;
        this.mainUI = new MainUI(this.$target);
      }
    }
  */

    this.$target = $target;
    this.mainUI = new MainUI(this.$target);
  }
}
