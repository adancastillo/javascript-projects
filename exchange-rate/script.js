const currencyElementOne = document.querySelector("#currency-one");
const amountElementOne = document.querySelector("#amount-one");
const currencyElementTwo = document.querySelector("#currency-two");
const amountElementTwo = document.querySelector("#amount-two");
const rateElement = document.querySelector("#rate");
const swap = document.querySelector("#swap");

// Fetch exchange rates and updatd the DOM
function calculate() {
  const currencyOne = currencyElementOne.value;
  const currencyTwo = currencyElementTwo.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOne}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      const rate = data.rates[currencyTwo];

      rateElement.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;

      amountElementTwo.value = (amountElementOne.value * rate).toFixed(2);
    });
}

// Event Listeners
currencyElementOne.addEventListener("change", calculate);
amountElementOne.addEventListener("input", calculate);
currencyElementTwo.addEventListener("change", calculate);
amountElementTwo.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  const temp = currencyElementOne.value;
  currencyElementOne.value = currencyElementTwo.value;
  currencyElementTwo.value = temp;
  calculate();
});

calculate();
