`use strict`; // qat'iy rejim yoqish

// fetch dagi url bo'yicha qiymatni callback function ga o'zlashtirib olish
function getFromAPI(url, callback) {
  let obj;
  fetch(url)
    .then((res) => res.json())
    .then((data) => (obj = data))
    .then(() => callback(obj));
}

// viloyatlar nomi
let regions = [
  "Andijon",
  "Buxoro",
  "Jizzax",
  "Namangan",
  "Navoiy",
  "Samarqand",
  "Toshkent",
];

// tanlab olish funktsiyasi
function $(param) {
  return document.querySelector(param);
}

// elementlarni tanlab olish
let wrapper = $(".wrapper"),
  choose = $(".choose");

// viloyatlar nomini dinamik option yaratib select ga qo'shib olish uchun
regions.forEach((item) => {
  let option = document.createElement("option");
  option.innerHTML = item;
  choose.appendChild(option);
});

// namoz vaqtlarini ekranga render qilish uchun
function render(array) {
  console.log(array.times);
  let card = document.createElement("div");
  card.setAttribute("class", "card");
  card.innerHTML = `
    <p class="text">${array.date}</p>
    <p class="text">Saharlik : ${array.times.tong_saharlik}</p>
    <p class="text">Quyosh : ${array.times.quyosh}</p>
    <p class="text">Peshin : ${array.times.peshin}</p>
    <p class="text">Asr : ${array.times.asr}</p>
    <p class="text">Shom-Iftor : ${array.times.shom_iftor}</p>
    <p class="text">Xufton : ${array.times.hufton}</p>
  `;
  wrapper.appendChild(card);
}
getFromAPI("https://islomapi.uz/api/present/day?region=Buxoro", render);

choose.addEventListener("change", (e) => {
  e.preventDefault();
  console.log(e.target.value);
  fetch(`https://islomapi.uz/api/present/day?region=${e.target.value}`)
    .then((res) => res.json())
    .then((data) => renderKindOf(data));
  function renderKindOf(region_name) {
    let card = document.createElement("div");
    card.setAttribute("class", "card");
    card.innerHTML = `
      <p class="text">${e.target.value}</p>
      <p class="text">${region_name.date}</p>
      <p class="text">Saharlik : ${region_name.times.tong_saharlik}</p>
      <p class="text">Quyosh : ${region_name.times.quyosh}</p>
      <p class="text">Peshin : ${region_name.times.peshin}</p>
      <p class="text">Asr : ${region_name.times.asr}</p>
      <p class="text">Shom-Iftor : ${region_name.times.shom_iftor}</p>
      <p class="text">Xufton : ${region_name.times.hufton}</p>
    `;
    wrapper.innerHTML = null;
    wrapper.appendChild(card);
  }
});

let newData = new Date();
let newHours = newData.getHours();
let newMinutes = newData.getMinutes();
let newSeconds = newData.getSeconds();
console.log(newData);

function startTime() {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById("time").innerHTML = h + ":" + m + ":" + s;
  setTimeout(startTime, 1000);
}
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  } // add zero in front of numbers < 10
  return i;
}
