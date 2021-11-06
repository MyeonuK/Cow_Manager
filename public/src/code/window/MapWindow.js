class MapWindow {
  $target = null;
  $prev = null;
  $mainDiv = null;
  addressArr = [];
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
          let index = this.addressArr.indexOf(d.address);

          if (index == -1) {
            this.addressArr.push(d.address);
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
    this.$target.removeChild(this.$mainDiv);
    this.$prev.style.display = "block";
  }

  updateStatus() {
    console.log(polygon);
    fetch(`territory_staus_update?address=${polygon.address}`).then((res) => {
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
      let polygon = new naver.maps.Polygon({
        address: this.addressArr[i],
        map: map,
        paths: [polygonPath],
        fillColor: "#ff0000",
        fillOpacity: 0.3,
        strokeColor: "ff0000",
        strokeOpacity: 0.6,
        strokeWeight: 3,
        clickable: true,
      });

      console.log(polygon.address);

      naver.maps.Event.addListener(polygon, "click", function () {
        //this.updateStatus();
        console.log(polygon);
        fetch(
          `territory_status_update?address=${encodeURIComponent(
            polygon.address
          )}`
        ).then((res) => {
          console.log(res);
        });
      });
    }

    $target.appendChild($myMap);

    // 지도 잘리는 문제 해결
    setTimeout(function () {
      window.dispatchEvent(new Event("resize"));
    }, 0);
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
