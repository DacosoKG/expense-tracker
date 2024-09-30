const balanceAmount = document.getElementById("balance");
const moneyPlusAmount = document.getElementById("money-plus");
const moneyMinusAmount = document.getElementById("money-minus");
const historyList = document.getElementById("list");
const addTransactionForm = document.getElementById("form");
const newTransactionText = document.getElementById("text");
const newTransactionAmount = document.getElementById("amount");

let allTransactions = [];

addTransactionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputText = newTransactionText.value.trim();
  const inputAmount = newTransactionAmount.value.trim();
  if (inputText !== "" && inputAmount !== "") {
    const newId = Math.floor(Math.random() * 100);

    const newTransaction = {
      id: newId,
      text: inputText,
      amount: Number(inputAmount),
    };

    allTransactions.push(newTransaction);

    createTransactionList();
    calculateTotals();
  }
  newTransactionText.value = "";
  newTransactionAmount.value = "";
});

//! History Functions

function createTransactionList() {
  historyList.innerHTML = "";

  for (let transaction of allTransactions) {
    singleTransaction(transaction);
  }
}

function singleTransaction(transaction) {
  console.log(transaction);
  const { amount, text, id } = transaction;
  const li = document.createElement("li");
  li.classList.add(amount < 0 ? "minus" : "plus");
  li.innerHTML = `${text}<span>${amount}</span><button onclick="deleteFn(${id})" class='delete-btn'>x</button>`;
  historyList.appendChild(li);
}

function deleteFn(id) {
  const newAllTransactions = allTransactions.filter(
    (transaction) => transaction.id != id
  );
  allTransactions = newAllTransactions;
  createTransactionList();
  calculateTotals();
}

//! Display totals

function calculateTotals() {
  const totalBalance = allTransactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncome = allTransactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpense = allTransactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  balanceAmount.innerHTML = `$${totalBalance}`;
  moneyPlusAmount.innerHTML = `$+${totalIncome}`;
  moneyMinusAmount.innerHTML = `$${totalExpense}`;
}
