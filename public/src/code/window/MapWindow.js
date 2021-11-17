class MapWindow {
  $target = null;
  $prev = null;
  $mainDiv = null;
  codeArr = [];
  statusArr = [];
  latlngArr = [];

  constructor() {
    this.getData();
    const $mainDiv = document.createElement("div");
    $mainDiv.className = "Window";
    this.$mainDiv = $mainDiv;
  }

  async getData() {
    fetch("territory_latlng")
      .then((res) => res.json())
      .then((res) => {
        for (let d of res) {
          let index = this.codeArr.indexOf(d.code);

          if (index == -1) {
            this.codeArr.push(d.code);
            this.statusArr.push(d.status);
            this.latlngArr.push([]);
            this.latlngArr[this.latlngArr.length - 1][d.number - 1] = [
              d.lat,
              d.lng,
            ];
          } else {
            this.latlngArr[index][d.number - 1] = [d.lat, d.lng];
          }
        }
      });
  }

  hide() {
    document.getElementById(
      "TerritoryStatus"
    ).innerText = `완료 : ${countData[1]}
    미완료 : ${countData[0]}`;
    this.$target.removeChild(this.$mainDiv);
    this.$prev.style.display = "block";
  }

  updateStatus() {
    console.log(polygon);
    fetch(
      `territory_staus_update?code=${polygon.code}&status=${polygon.status}`
    ).then((res) => {
      //console.log(res);
    });
  }

  setMap($target) {
    const $myMap = document.createElement("div");
    $myMap.className = "Map";
    $myMap.id = "map";

    console.log(this.latlngArr);

    let map = new naver.maps.Map($myMap, {});

    map.setMapTypeId(naver.maps.MapTypeId.SATELLITE);
    map.setCenter(new naver.maps.LatLng(34.97853285886776, 126.42913659770767));
    map.setZoom(16);

    // map.fitBounds(
    //   new naver.maps.LatLngBounds(
    //     new naver.maps.LatLng(34.98071296135815, 126.42829974847407),
    //     new naver.maps.LatLng(34.97491094739774, 126.43166860308105)
    //   )
    // );
    //map.setMapTypeId(naver.maps.MapTypeId.HYBRID);

    for (let i = 0; i < this.latlngArr.length; i++) {
      let polygonPath = [];
      for (let j = 0; j < this.latlngArr[i].length; j++) {
        polygonPath.push(
          new naver.maps.LatLng(
            this.latlngArr[i][j][0],
            this.latlngArr[i][j][1]
          )
        );
      }

      let color;
      if (this.statusArr[i] == 0) {
        color = "#ff0000";
      } else if (this.statusArr[i] == 1) {
        color = "#0000ff";
      }
      let polygon = new naver.maps.Polygon({
        code: this.codeArr[i],
        status: this.statusArr[i],
        map: map,
        paths: [polygonPath],
        fillColor: color,
        fillOpacity: 0.3,
        strokeColor: color,
        strokeOpacity: 0.6,
        strokeWeight: 3,
        clickable: true,
      });

      naver.maps.Event.addListener(polygon, "click", function () {
        //this.updateStatus();
        console.log("ing");
        fetch(
          `territory_status_update?code=${polygon.code}&status=${
            polygon.status == 0 ? 1 : 0
          }`
        ).then((res) => {
          if (polygon.status == 0) {
            polygon.setOptions({
              status: 1,
              fillColor: "#0000ff",
              strokeColor: "#0000ff",
            });
            countData[0]--;
            countData[1]++;
          } else if (polygon.status == 1) {
            polygon.setOptions({
              status: 0,
              fillColor: "#ff0000",
              strokeColor: "#ff0000",
            });
            countData[0]++;
            countData[1]--;
          }
        });
      });
    }

    $target.appendChild($myMap);

    // 지도 잘리는 문제 해결
    setTimeout(function () {
      window.dispatchEvent(new Event("resize"));
    }, 300);
  }

  render() {
    this.$target = document.getElementsByClassName("MainDiv")[0];
    this.$prev = document.getElementsByClassName("ContentDiv")[0];
    this.$prev.style.display = "none";

    const $toolbar = document.createElement("div");
    $toolbar.className = "ToolBar";

    const $backButton = document.createElement("button");
    $backButton.className = "Button";
    $backButton.innerText = "back";
    $backButton.addEventListener("click", () => {
      this.hide();
    });

    const $title = document.createElement("span");
    $title.className = "Title";
    $title.innerText = `지도`;

    const $mapContainer = document.createElement("div");
    $mapContainer.className = "MapContainer";

    this.setMap($mapContainer);

    this.$mainDiv.appendChild($toolbar);
    $toolbar.appendChild($backButton);
    $toolbar.appendChild($title);
    this.$mainDiv.appendChild($mapContainer);

    this.$target.appendChild(this.$mainDiv);
  }
}
