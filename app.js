const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn=document.querySelector("button");
let msg= document.querySelector(".msg");

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }



  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc= `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img= element.parentElement.querySelector("img");
    img.src=newSrc;
};


btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    
    getExchange();

})


async function getExchange(){
    
    let amt= document.querySelector(".amount input");
    let amtVal= amt.value;
    let fromCurrency = document.getElementById('fromCurrency').value;
    let toCurrency = document.getElementById('toCurrency').value;
    if(amtVal==="" || amtVal < 1){
        amtVal=1;
        amt.value="1";
        }
        
        
    let URL=`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency.toLowerCase()}.json`;

    let res= await fetch(URL);
    let data= await res.json();
    let rate = await data[fromCurrency.toLowerCase()][toCurrency.toLowerCase()];
 
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurrency} = ${finalAmount} ${toCurrency}`;


}

window.addEventListener("load",()=>{
    getExchange();
})