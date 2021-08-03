class CowTab extends Tab {
  $mainDiv = null;
  data = null;

  constructor($target, data) {
    super($target, data);
    console.log(data);
    this.data = data;

    const $mainDiv = document.createElement("div");
    $mainDiv.className = "CowDiv";

    this.$mainDiv = $mainDiv;
    $target.appendChild(this.$mainDiv);
    this.render();
  }

  getData(item) {
    const $item = document.createElement("div");
    //let itemInfo = this.data[item];

    $item.className = "Item";
    $item.innerHTML = `
        <a class="Item_AnimalNo" href="https://www.mtrace.go.kr/mtracesearch/cattleNoSearch.do?btsProgNo=0109008401&btsActionMethod=SELECT&cattleNo=${item.id}"">${item.id}</a>
        
        <span class="Info_Group">
          <span class="Item_Info">${item.sex}</span>
          <span class="Item_Info">${item.birthDate}</span>
        </span>
        <span class="Info_Group">
          <span class="Item_Info">${item.famInfo}</span>
          <span class="Item_Info">${item.famDate}</span>
        </span>
        <span class="Info_Group">
          <span class="Item_Info">${item.bruInfo}</span>
          <span class="Item_Info">${item.bruDate}</span>
        </span>
        <span class="Info_Group">
          <span class="Item_Info">${item.tubeInfo}</span>
          <span class="Item_Info">${item.tubeDate}</span>
        </span>`;

    $item.addEventListener("click", function () {
      let $modal = new Modal(
        document.getElementsByClassName("CowDiv")[0],
        item
      );
    });

    return $item;
  }

  setArticle(value) {
    const $article = document.createElement("article");
    $article.className = "Article";
    $article.id = "Article";

    const $itemTitle = document.createElement("div");
    $itemTitle.className = "ItemTitle";
    $itemTitle.innerHTML = `
      <a class="Item_AnimalNo">등록번호</a>
      <span class="Item_Info">축사 및 우리</span>
      <span class="Item_Info">성별 및 생년월일</span>
      <span class="Item_Info">구제역</span>
      <span class="Item_Info">브루셀라</span>
      <span class="Item_Info">결핵</span>`;
    $article.appendChild($itemTitle);

    //let cowList = Object.keys(this.data).sort();

    /*for (let item of cowList) {
      if (item.includes(value)) {
        $article.appendChild(this.getData(item));
      }
    }
    */
    for (let item of this.data) {
      console.log(item.sex);
      if (item.id.includes(value)) {
        $article.appendChild(this.getData(item));
      }
    }

    return $article;
  }

  render() {
    const $tabTitleDiv = document.createElement("div");
    $tabTitleDiv.className = "TabTitleDiv";

    const $tabTitle = document.createElement("h2");
    $tabTitle.className = "TabTitle";
    $tabTitle.innerText = "CowTab";

    const $input = document.createElement("input");
    $input.className = "Input";
    $input.type = "number";
    $input.oninput = function () {
      const $itemArr = document.getElementsByClassName("Item");

      for (let item of $itemArr) {
        let tempNo = item
          .getElementsByClassName("Item_AnimalNo")[0]
          .innerText.replace(/(\s*)/g, "");
        let tempValue = $input.value.replace(/(\s*)/g, "");

        if (tempNo.includes(tempValue)) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
      }
    };

    const $testButton = document.createElement("button");
    $testButton.className = "Button";
    $testButton.innerText = "test";
    $testButton.onclick = function () {
      fetch("http://myeonu.cafe24app.com/update")
        //fetch("http://localhost:8001/update")
        .then((res) => res.json())
        .then((res) => console.log(res));
    };

    const $updateButton = document.createElement("button");
    $updateButton.className = "Button";
    $updateButton.innerText = "update";
    $updateButton.onclick = function () {
      fetch("http://myeonu.cafe24app.com/update")
        //fetch("http://localhost:8001/pls")
        .then((res) => res.json())
        .then((res) => console.log(res));
    };
    $tabTitleDiv.appendChild($tabTitle);
    $tabTitleDiv.appendChild($testButton);
    $tabTitleDiv.appendChild($updateButton);
    $tabTitleDiv.appendChild($input);

    let $article = this.setArticle("");

    this.$mainDiv.appendChild($tabTitleDiv);
    this.$mainDiv.appendChild($article);
  }
}
