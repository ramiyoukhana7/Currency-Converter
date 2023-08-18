const fromCur = document.querySelector(".from select");
const toCur = document.querySelector(".to select");
const getBtn = document.querySelector("form button");
const amount = document.querySelector("form input");
const exRateTxt = document.querySelector("form .result");

for (let i = 0; i < 2; i++) {
    let select;
    if (i === 0) {
        select = fromCur; 
    } else {
        select = toCur; 
    }

    for (let curCode in Country_List) {
        let isSelected = (i === 0 && curCode === "USD") || (i === 1 && curCode === "GBP");
    
        let optionElement = document.createElement('option');
        optionElement.value = curCode;
        optionElement.textContent = curCode;
    
        if (isSelected) {
            optionElement.selected = true;
        }
    
        select.appendChild(optionElement);
    }
    
    select.addEventListener("change", function() {
        let code = select.value;
        let imgTag = select.parentElement.querySelector("img");
        let newImgSrc = `https://flagcdn.com/48x36/'${Country_List[code].toLowerCase()}.png`;
        imgTag.src = newImgSrc;
    });
}


async function getExchangeRate() {

    const amountVal = amount.value || 1;
    const fromCurrencyCode = fromCur.options[fromCur.selectedIndex].value;
    const toCurrencyCode = toCur.options[toCur.selectedIndex].value;

    exRateTxt.innerText = "Getting exchange rate ...";

    fetch(`https://v6.exchangerate-api.com/v6/966c186e8f4fbc13efca5087/latest/${fromCurrencyCode}`)
        .then(function(response) {
        return response.json();
        })
        .then(function(result) {

        const exchangeRate = result.conversion_rates[toCurrencyCode];
        let totalExRate = amountVal * exchangeRate;
        totalExRate = totalExRate.toFixed(2);
        exRateTxt.innerText = amountVal + ' ' + fromCurrencyCode + ' = ' + totalExRate + ' ' + toCurrencyCode;

    })
}

window.addEventListener("load", function() {
    getExchangeRate();
});

getBtn.addEventListener("click", function(e) {
    e.preventDefault();
    getExchangeRate();
});
