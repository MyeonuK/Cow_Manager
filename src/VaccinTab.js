class VaccinTab extends Tab {
  $mainDiv = null;

  constructor($target) {
    super($target);
    const $mainDiv = document.createElement("div");
    $mainDiv.className = "VaccinDiv";
    $mainDiv.innerText = "vaccinvaccin";

    this.$mainDiv = $mainDiv;
    $target.appendChild(this.$mainDiv);
  }
}
