class CowModal {
  $mainDiv = null;
  $target = null;
  data = null;

  constructor(id) {
    const $target = document.getElementsByTagName("body")[0];
    this.$target = $target;

    const $mainDiv = document.createElement("div");
    $mainDiv.className = "Modal";
    this.$mainDiv = $mainDiv;

    this.setData(id);

    setTimeout(() => {
      this.render();
    }, 200);
  }

  async setData(id) {
    await fetch(`cow_vaccin?id=${id}`)
      .then((res) => res.json())
      .then((res) => {
        this.data = res[0];
      });
  }

  removeModal() {}

  render() {
    console.log(this.data);
    document.getElementById("App").style.overflow = "hidden";
    let $maind = this.$mainDiv;

    this.$mainDiv.addEventListener("click", function () {
      document.getElementById("App").style.overflow = "auto";
      $maind.remove();
    });

    const $modal_body = document.createElement("div");
    $modal_body.className = "Modal_Body";

    $modal_body.innerHTML = `
      <div class="Modal_Title">${this.data.id.slice(0, 3)} ${this.data.id.slice(
      3,
      7
    )} ${this.data.id.slice(7, 13)}</div>
      <div class="Modal_Info_Title">구제역</div>
      <div class="Modal_Info_Group">
        <div class="Modal_Info_Content">${this.data.famInfo}</div>
        <div class="Modal_Info_Content">${
          this.data.famDate === null ? "" : this.data.famDate.slice(0, 10)
        }</div>
    </div>
      <div class="Modal_Info_Title">브루셀라</div>
      <div class="Modal_Info_Group">
        <div class="Modal_Info_Content">${this.data.bruInfo}</div>
        <div class="Modal_Info_Content">${
          this.data.bruDate === null ? "" : this.data.bruDate.slice(0, 10)
        }</div>
      </div>
      <div class="Modal_Info_Title">결핵</div>
      <div class="Modal_Info_Group">
        <div class="Modal_Info_Content">${this.data.tubeInfo}</div>
        <div class="Modal_Info_Content">${
          this.data.tubeDate === null ? "" : this.data.tubeDate.slice(0, 10)
        }</div>
      </span>
    `;

    this.$mainDiv.appendChild($modal_body);
    this.$target.appendChild(this.$mainDiv);
  }
}
