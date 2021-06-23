class Modal {
  $modal = null;
  title = null;
  data = null;

  constructor($target, title, data) {
    let $app = document.getElementsByTagName("body")[0];
    $app.style.overflow = "hidden";

    let temp = document.getElementsByClassName("Modal")[0];
    if (temp) {
      temp.remove();
    }
    const $modal = document.createElement("div");
    $modal.className = "Modal";
    $modal.addEventListener("click", this.remove);

    this.$modal = $modal;
    $target.appendChild(this.$modal);

    this.title = title;
    this.data = data;

    this.render();
  }

  remove() {
    let temp = document.getElementsByClassName("Modal")[0];
    temp.remove();
    let $app = document.getElementsByTagName("body")[0];
    $app.style.overflow = "auto";
  }

  render() {
    const $modal_window = document.createElement("div");
    $modal_window.className = "Modal_Window";
    $modal_window.innerHTML = `
    <div class="Modal_Content">
      <div class="Modal_Title">${this.title}</div>
      <span class="Modal_Info_Title">축사</span>
      <span class="Modal_Group">
        <span class="Modal_Info">${this.data.HouseNo}번 축사</span>
        <span class="Modal_Info">${this.data.CageNo}번 우리</span>
      </span>
      <span class="Modal_Info_Title">성별 및 생년월일</span>
      <span class="Modal_Group">
        <span class="Modal_Info">${this.data.Sex}</span>
        <span class="Modal_Info">${this.data.BirthDate}</span>
      </span>
      <span class="Modal_Info_Title">구제역</span>
        <span class="Modal_Info">${this.data.Fam}</span>
      <span class="Modal_Info_Title">브루셀라</span>
      <span class="Modal_Group">
        <span class="Modal_Info">${this.data.BruInfo}</span>
        <span class="Modal_Info">${this.data.BruDate}</span>
      </span>
      <span class="Modal_Info_Title">결핵</span>
      <span class="Modal_Group">
        <span class="Modal_Info">${this.data.TubeInfo}</span>
        <span class="Modal_Info">${this.data.TubeDate}</span>
      </span>
    </div>
    `;

    this.$modal.appendChild($modal_window);
  }
}
