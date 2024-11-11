let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateBalance() {
    const balance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    document.getElementById("balance").textContent = `R$ ${balance.toFixed(2)}`;
}

function addTransaction() {
    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value);

    if (!description || isNaN(amount)) return alert("Por favor, preencha todos os campos!");

    const transaction = {
        id: Date.now(),
        description,
        amount
    };

    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    renderTransactions();
    updateBalance();

    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";
}

function renderTransactions() {
    const transactionList = document.getElementById("transaction-list");
    transactionList.innerHTML = "";

    transactions.forEach((transaction) => {
        const transactionItem = document.createElement("li");
        transactionItem.classList.add("transaction", transaction.amount < 0 ? "expense" : "income");
        transactionItem.innerHTML = `
            ${transaction.description} <span>R$ ${transaction.amount.toFixed(2)}</span>
            <button onclick="removeTransaction(${transaction.id})">X</button>
        `;
        transactionList.appendChild(transactionItem);
    });
}

function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    renderTransactions();
    updateBalance();
}

document.addEventListener("DOMContentLoaded", () => {
    renderTransactions();
    updateBalance();
});
