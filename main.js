const route =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";
let varData = "";
let totalItems = [];

function getData(url, callback) {
  fetch(url)
    .then((res) => res.json())
    .then((res) => callback(res));
}

function loadNavBar(data) {
  const numItems = document.getElementById("numItems");
  numItems.textContent = totalItems.length + " Items";

  const navBar = document.getElementById("navbar");
  varData = data;
  navBar.innerHTML = "";

  for (const item of data) {
    const nav_item = document.createElement("li");
    const nav_link = document.createElement("a");
    nav_link.className = "nav-link";
    nav_link.textContent = item.name;
    nav_item.appendChild(nav_link);
    nav_item.onclick = updateCenter;
    navBar.appendChild(nav_item);

    if (item.name === "Burguers") {
      updateBannerCenterOnClick(item);
    }
  }
}

function updateCenter(item) {
  const itemText = item.target.textContent;
  const nameItem = document.getElementById("nameItem");
  nameItem.textContent = itemText;

  const products = document.getElementById("productsMenu");
  products.innerHTML = "";

  for (const name of varData) {
    if (name.name === itemText) {
      for (const product of name.products) {
        const card = document.createElement("div");
        card.className = "card";
        card.style = "width: 18rem;";

        const img = document.createElement("img");
        img.src = product.image;
        img.className = "card-img-top";
        img.alt = product.name;

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        const cardTitle = document.createElement("h5");
        cardTitle.className = "card-title";
        cardTitle.textContent = product.name;

        const cardText = document.createElement("p");
        cardText.className = "card-text";
        cardText.textContent = product.description;

        const cardPrice = document.createElement("p");
        cardPrice.className = "card-price";
        cardPrice.textContent = product.price;

        const btn = document.createElement("a");
        btn.className = "btn btn btn-dark";
        btn.textContent = "Add to car";
        btn.onclick = updateCar;

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardBody.appendChild(cardPrice);
        cardBody.appendChild(btn);

        card.appendChild(img);
        card.appendChild(cardBody);

        products.appendChild(card);
      }
    }
  }
}

function updateBannerCenterOnClick(item) {
  const textItemMenu = item.name;
  const nameItem = document.getElementById("nameItem");

  const products = document.getElementById("productsMenu");
  products.innerHTML = "";
  nameItem.textContent = textItemMenu;

  for (const product of item.products) {
    const card = document.createElement("div");
    card.className = "card";
    card.style = "width: 18rem;";

    const img = document.createElement("img");
    img.src = product.image;
    img.className = "card-img-top";
    img.alt = product.name;

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.textContent = product.name;

    const cardText = document.createElement("p");
    cardText.className = "card-text";
    cardText.textContent = product.description;

    const cardPrice = document.createElement("p");
    cardPrice.className = "card-price";
    cardPrice.textContent = product.price;

    const btn = document.createElement("a");
    btn.className = "btn btn btn-dark";
    btn.textContent = "Add to car";
    btn.onclick = updateCar;

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(cardPrice);
    cardBody.appendChild(btn);

    card.appendChild(img);
    card.appendChild(cardBody);

    products.appendChild(card);
  }
}

function updateCar(item) {
  const product = item.target.parentNode;
  const child = product.children;
  const description = child[0].textContent;
  const price = child[2].textContent;

  let agregado = false;

  for (let i = 0; i < totalItems.length && !agregado; ++i) {
    if (description === totalItems[i].des) {
      let obj = totalItems[i];
      obj.qty += 1;
      obj.amt = obj.qty * obj.prc;
      agregado = true;
    }
  }
  if (!agregado) {
    let obj = {
      it: totalItems.length + 1,
      qty: 1,
      des: description,
      prc: price,
      amt: price,
    };
    totalItems.push(obj);
  }

  const numItems = document.getElementById("numItems");
  let total = 0;
  for (let element of totalItems) {
    total += element.qty;
  }
  numItems.textContent = total + " Items";
}

const car = document.getElementById("carrito");

car.onclick = showOrder;

function showOrder() {
  const nameItem = document.getElementById("nameItem");
  const products = document.getElementById("productsMenu");
  let total = 0;
  products.innerHTML = "";
  nameItem.textContent = "Order Detail";

  const table = document.createElement("table");
  table.className = "table table-striped";
  const thead = document.createElement("thead");
  const trhead = document.createElement("tr");

  const itemheader = document.createElement("th");
  itemheader.textContent = "Item";
  const qtyheader = document.createElement("th");
  qtyheader.textContent = "Qty.";
  const decheader = document.createElement("th");
  decheader.textContent = "Description";
  const unitheader = document.createElement("th");
  unitheader.textContent = "Unit Price";
  const amtheader = document.createElement("th");
  amtheader.textContent = "Amount";
  const mdf = document.createElement("th");
  mdf.textContent = "Modify";

  trhead.appendChild(itemheader);
  trhead.appendChild(qtyheader);
  trhead.appendChild(decheader);
  trhead.appendChild(unitheader);
  trhead.appendChild(amtheader);
  trhead.appendChild(mdf);

  thead.appendChild(trhead);
  const tbody = document.createElement("tbody");
  for (let element of totalItems) {
    const trbody = document.createElement("tr");

    const itembody = document.createElement("td");
    itembody.className = "item";
    itembody.textContent = element.it;
    const qtybody = document.createElement("td");
    qtybody.className = "qty";
    qtybody.textContent = element.qty;
    const decbody = document.createElement("td");
    decbody.className = "dec";
    decbody.textContent = element.des;
    const unitbody = document.createElement("td");
    unitbody.className = "unit";
    unitbody.textContent = element.prc;

    const amtbody = document.createElement("td");
    amtbody.className = "amt";
    amtbody.textContent = (Math.round(element.amt * 100) / 100).toFixed(2);
    total += parseFloat((Math.round(element.amt * 100) / 100).toFixed(2));
    const mdfbody = document.createElement("td");

    const row = document.createElement("row");
    const btnPlus = document.createElement("button");
    btnPlus.onclick = addProduct;
    btnPlus.type = "button";
    btnPlus.className = "btn btn-secondary";
    btnPlus.id = "btnPlus";
    btnPlus.textContent = "+";

    const btnMinus = document.createElement("button");
    btnMinus.onclick = lessProduct;
    btnMinus.type = "button";
    btnMinus.className = "btn btn-secondary";
    btnMinus.id = "btnMinus";
    btnMinus.textContent = "-";

    row.appendChild(btnPlus);
    row.appendChild(btnMinus);
    mdfbody.appendChild(row);

    trbody.appendChild(itembody);
    trbody.appendChild(qtybody);
    trbody.appendChild(decbody);
    trbody.appendChild(unitbody);
    trbody.appendChild(amtbody);
    trbody.appendChild(mdfbody);
    tbody.appendChild(trbody);
  }

  table.appendChild(thead);
  table.appendChild(tbody);

  const totalrow = document.createElement("div");
  totalrow.className = "row";

  const colTotal = document.createElement("div");
  colTotal.className = "col";
  const totaltext = document.createElement("p");
  totaltext.id = "totalText";

  totaltext.textContent = "Total:$" + total;
  colTotal.appendChild(totaltext);

  const colBtn = document.createElement("div");
  colBtn.className = "col";

  const btncancel = document.createElement("button");
  btncancel.onclick = createModal;
  btncancel.type = "button";
  btncancel.className = "btn btn-red";
  btncancel.id = "btnCancel";
  btncancel.setAttribute("data-bs-toggle", "modal");
  btncancel.setAttribute("data-bs-target", "#miModal");
  btncancel.textContent = "Cancel";
  colBtn.appendChild(btncancel);

  const btnconfirm = document.createElement("button");
  btnconfirm.onclick = confirmOrder;
  btnconfirm.type = "button";
  btnconfirm.className = "btn btn-bone";
  btnconfirm.textContent = "Confirm order";
  colBtn.appendChild(btnconfirm);

  totalrow.appendChild(colTotal);
  totalrow.appendChild(colBtn);

  products.appendChild(table);
  products.appendChild(totalrow);

  createModal();
}

function addProduct(item) {
  const row = item.target.parentNode.parentNode.parentNode;
  const des = row.children[2].textContent;
  for (let i = 0; i < totalItems.length; ++i) {
    if (des === totalItems[i].des) {
      let obj = totalItems[i];
      obj.qty += 1;
      obj.amt = obj.qty * obj.prc;
    }
  }

  const numItems = document.getElementById("numItems");
  let total = 0;
  for (let element of totalItems) {
    total += element.qty;
  }
  numItems.textContent = total + " Items";

  showOrder();
}

function lessProduct(item) {
  const row = item.target.parentNode.parentNode.parentNode;
  const des = row.children[2].textContent;
  for (let i = 0; i < totalItems.length; ++i) {
    if (des === totalItems[i].des) {
      let obj = totalItems[i];
      obj.qty -= 1;
      if (obj.qty === 0) {
        totalItems.splice(i, 1);
      }
      obj.amt = obj.qty * obj.prc;
    }
  }

  const numItems = document.getElementById("numItems");
  let total = 0;
  for (let element of totalItems) {
    total += element.qty;
  }
  numItems.textContent = total + " Items";

  showOrder();
}

function confirmOrder() {
  // eslint-disable-next-line no-console
  console.log(totalItems);
}

function createModal() {
  const modalspace = document.getElementById("modalSpace");
  modalspace.innerHTML = "";

  const modafade = document.createElement("div");
  modafade.className = "modal fade";
  modafade.id = "miModal";
  modafade.setAttribute("data-bs-backdrop", "static");
  modafade.setAttribute("data-bs-keyboard", "false");
  modafade.setAttribute("tabindex", "-1");
  modafade.setAttribute("aria-labelledby", "staticBackdropLabel");
  modafade.setAttribute("aria-hidden", "true");

  const modaldiag = document.createElement("div");
  modaldiag.className = "modal-dialog";

  const modalcontent = document.createElement("div");
  modalcontent.className = "modal-content";

  const modalheader = document.createElement("div");
  modalheader.className = "modal-header";

  const title = document.createElement("h5");
  title.className = "modal-title";
  title.id = "staticBackdropLabel";
  title.textContent = "Cancel the order";

  const btn = document.createElement("button");
  btn.setAttribute("type", "button");
  btn.setAttribute("class", "btn-close");
  btn.setAttribute("data-bs-dismiss", "modal");
  btn.setAttribute("aria-label", "Close");

  modalheader.appendChild(title);
  modalheader.appendChild(btn);

  const modalbody = document.createElement("div");
  modalbody.className = "modal-body";

  const par = document.createElement("p");
  par.textContent = "Are you sure about cancelling the order?";

  modalbody.appendChild(par);

  const modalfooter = document.createElement("div");
  modalfooter.className = "modal-footer";

  const btnyes = document.createElement("button");
  btnyes.setAttribute("type", "button");
  btnyes.className = "btn btn-bone";
  btnyes.id = "btnyes";
  btnyes.setAttribute("data-bs-dismiss", "modal");
  btnyes.textContent = "Yes, I want to cancel the order";
  btnyes.onclick = clearItems;

  const btnno = document.createElement("button");
  btnno.setAttribute("type", "button");
  btnno.className = "btn btn-red";
  btnno.setAttribute("data-bs-dismiss", "modal");
  btnno.textContent = "No, I want to continue adding products";

  modalfooter.appendChild(btnyes);
  modalfooter.appendChild(btnno);

  modalcontent.appendChild(modalheader);
  modalcontent.appendChild(modalbody);
  modalcontent.appendChild(modalfooter);

  modaldiag.appendChild(modalcontent);

  modafade.appendChild(modaldiag);
  modalspace.appendChild(modafade);
}

function clearItems() {
  totalItems = [];
  const numItems = document.getElementById("numItems");
  numItems.textContent = "0 Items";
  showOrder();
}

getData(route, loadNavBar);
