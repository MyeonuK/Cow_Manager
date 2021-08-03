class Modal {
  $modal = null;
  data = null;

  constructor($target, data) {
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
      <div class="Modal_Title">${this.data.id}</div>
      <span class="Modal_Info_Title">성별 및 생년월일</span>
      <span class="Modal_Group">
        <span class="Modal_Info">${this.data.sex}</span>
        <span class="Modal_Info">${this.data.birthDate}</span>
      </span>
      <span class="Modal_Info_Title">구제역</span>
      <span class="Modal_Group">
      <span class="Modal_Info">${this.data.famInfo}</span>
      <span class="Modal_Info">${this.data.famDate}</span>
    </span>
      <span class="Modal_Info_Title">브루셀라</span>
      <span class="Modal_Group">
        <span class="Modal_Info">${this.data.bruInfo}</span>
        <span class="Modal_Info">${this.data.bruDate}</span>
      </span>
      <span class="Modal_Info_Title">결핵</span>
      <span class="Modal_Group">
        <span class="Modal_Info">${this.data.tubeInfo}</span>
        <span class="Modal_Info">${this.data.tubeDate}</span>
      </span>
    </div>
    `;

    this.$modal.appendChild($modal_window);
  }
}
