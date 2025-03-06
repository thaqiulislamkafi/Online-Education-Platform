// functions

function PinVerification(pin) {
    let Pin = document.getElementById(pin).value;
    if (Pin.length !== 4) {
        alert("Please enter 4 digit pin");
        return false;
    }
    return true;
}

function AccountNoVerified(accountNo) {
    var bankAccountNumber = document.getElementById(accountNo).value;
    if (bankAccountNumber.length !== 11) {
        alert("Please enter 11 digit Bank Account Number");
        return false;
    }
    return true;
}

// Toggle Button 

let cards = document.querySelectorAll(".card");
let secters = document.querySelectorAll(".secter");

for (let j = 1; j < secters.length; j++) {
    secters[j].style.display = "none";
}

for (let i = 0; i < cards.length; i++) {
    let card = cards[i];
    card.addEventListener("click", function (event) {
        for (let j = 0; j < secters.length; j++) {
            secters[j].style.display = "none";
        }
        secters[i].style.display = "block";
    })
}

//add money

document.getElementById("addmoney-btn").addEventListener("click", function (event) {
    event.preventDefault();
    if (!(AccountNoVerified("bank-account-number")))
        return;

    if (!(PinVerification("addmoney-pin")))
        return;

    var amount = document.getElementById("amount").value;
    amount = parseFloat(amount);
    var balance = document.getElementById("balance").innerText;
    balance = parseFloat(balance);

    var sum = amount + balance;
    document.getElementById("balance").innerText = sum;
})

// Cash Out 

document.getElementById("withdraw-btn").addEventListener("click", function (event) {
    event.preventDefault();

    if (!(AccountNoVerified("agent-number")))
        return;

    if (!(PinVerification("withdraw-pin")))
        return;

    var cashAmount = document.getElementById("cash-amount").value;
    cashAmount = parseFloat(cashAmount);
    var balance = document.getElementById("balance").innerText;
    balance = parseFloat(balance);

    var difference = balance - cashAmount;
    document.getElementById("balance").innerText = difference;
})

// Transfer Money

document.getElementById("send-btn").addEventListener("click", function (event) {
    event.preventDefault();

    let transferAmount = document.getElementById("transfer-amount").value;

    if (!(AccountNoVerified("account-number")))
        return;

    if (!(PinVerification("transfer-pin")))
        return;

    var balance = document.getElementById("balance").innerText;
    balance = parseFloat(balance);

    var difference = balance - transferAmount;
    document.getElementById("balance").innerText = difference;
})

// Pay bill

document.getElementById("pay-btn").addEventListener("click", function (event) {
    event.preventDefault();

    if (!(AccountNoVerified("biller-account-number")))
        return;

    if (!(PinVerification("bill-pin")))
        return;

    var payAmount = document.getElementById("pay-amount").value;
    payAmount = parseFloat(payAmount);
    var balance = document.getElementById("balance").innerText;
    balance = parseFloat(balance);

    var difference = balance - payAmount;
    document.getElementById("balance").innerText = difference;

    // Show verification section
    document.getElementById("verification").style.display = "block";
    document.getElementById("payment").style.display = "none";

})

// Verification Confirm Button

document.getElementById("confirm-btn").addEventListener("click", function (event) {
    event.preventDefault();

    let verificationCode = document.getElementById("verification-code").value;

    if (verificationCode.length !== 6) {
        alert("Please enter a valid 6-digit verification code");
        return;
    }

    // Redirect to login page
    window.location.href = "../login.html";
})

// Transactions

// document.getElementById("addmoney-btn").addEventListener("click", function (event) {
//     let trans = document.createElement("div");
//     let container = document.getElementById("transactions");
//     trans.innerHTML = `
//                 <div class="form-control">
//               <label class="label">
//                 <span class="label-text font-semibold">Pin Number</span>
//               </label>
//               <input id="withdraw-pin" type="password" placeholder="Enter 4 Digit Pin Number"
//                 class="input input-bordered rounded-3xl bg-gray-200 border-none text-sm" required />
//             </div>
//     `
//     container.appendChild(trans);
// })