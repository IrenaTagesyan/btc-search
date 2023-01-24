const form = document.getElementById("f");
const input_adrs = document.getElementById("ba");

const wallet = document.querySelector(".st");
const input = document.querySelector(".sb");
const url = "https://blockchain.info/multiaddr?cors=true&active=";
const xhr = new XMLHttpRequest();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();
  if (input_adrs.value != 0) {
    init_data();
  }
});

function checkInputs() {
  const input_adrsValue = input_adrs.value.trim();

  if (input_adrsValue === "") {
    setErrorFor(input_adrs, " Enter Bitcoin Address");
  } else if (input_adrsValue.length < 25) {
    setErrorFor(input_adrs, "Invalid Bitcoin Address");
  } else if (input_adrsValue.length > 59) {
    setErrorFor(input_adrs, "Invalid Bitcoin Address");
  } else if (!/^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(input_adrsValue)) {
    setErrorFor(input_adrs, "Invalid Bitcoin address");
  } else {
    setSuccessFor(input_adrs);
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.className = "x error";
  small.innerText = message;
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "x success";
}

function init_data() {
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var jsontext = xhr.responseText;
      var data = JSON.parse(jsontext);
      let balance_info = data.wallet.final_balance;

      document.getElementsByClassName("balance")[0].style.display = "flex";
      document.getElementsByClassName("balance")[0].innerHTML =
        "Total Balance: " + balance_info;
    }
  };

  xhr.open("GET", url + wallet.value, true);
  xhr.send();
}
