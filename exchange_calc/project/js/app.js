let input = document.getElementById("input");
let from = document.getElementById("from");
let to = document.getElementById("to");
let result = document.getElementById("result");
let historyList = document.getElementById("historyList");

function createOption(x, y, z) {
  let opt = document.createElement("option");
  let content = document.createTextNode(y);
  opt.setAttribute("value", NumConverter(z));
  opt.appendChild(content);
  x.appendChild(opt);
}

function NumConverter(x) {
  return Number(x.replace(",", ""));
}

for (x in rate.rates) {
  createOption(from, x, rate.rates[x]);
  createOption(to, x, rate.rates[x]);
}
// create table row
function createTr(x) {
  let rowSpacer = document.getElementById("rowSpacer");
  if(rowSpacer){
    rowSpacer.remove();
  }

  let tr = document.createElement("tr");

  x.map(function (el) {
    let td = document.createElement("td");
    let text = document.createTextNode(el);

    td.appendChild(text);
    tr.appendChild(td);
  });

  historyList.appendChild(tr);
}

// store in local storage
function store() {
  localStorage.setItem("record", historyList.innerHTML);
};

document.getElementById("calc").addEventListener("submit", function (e) {
  e.preventDefault();

  let x = input.value;
  let y = from.value;
  let z = to.value;

  // convert to MMK
  let mmk = x * y;

  //convert to desired currency
  let final = mmk / z;
  let finalResult = final.toFixed(2);

  let fromText = x + " " + from.options[from.selectedIndex].innerText;
  let toText = to.options[to.selectedIndex].innerText;
  let date = new Date().toLocaleString();
  let arr = [date, fromText, toText, finalResult];
  createTr(arr);
  store();

  // show result
  result.innerHTML = finalResult;
  input.value = "";
  input.focus();
  from.value = "";
  to.value = "1";
});

// Show data from local storage when page starts loading
(function () {
  if (localStorage.getItem("record")) {
    historyList.innerHTML = localStorage.getItem("record");
  } else{
    historyList.innerHTML = `<tr id="rowSpacer" ><td colspan="4">There is no record.</td></tr>`
  }
})();

// Change to Dark/Light Mode
function changeMode(){
  document.body.classList.toggle("night-mode")
  document.getElementById("modeIcon").classList.toggle("fa-sun")
}
