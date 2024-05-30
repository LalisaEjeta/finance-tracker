const category = document.getElementById("category");
let amount = document.getElementById("amount");
const info = document.getElementById("info");
const date = document.getElementById("date");
const addBtn = document.getElementById("addBtn");
const tbl = document.getElementById("dataTable");
const form = document.getElementById("form");
const totalIncome = document.getElementById("totalIncome");
const totalExpense = document.getElementById("totalExpense");
const myBalance = document.getElementById("balance");
const myStatus = document.getElementById("status");


let totInc = 0;
let totExp = 0;
let balance = 0;

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
// });

addBtn.addEventListener("click", function () {
  const tr = document.createElement("tr");
  tr.className = "bg-warning"
  const td1 = document.createElement("td");
  td1.innerText = category.options[category.selectedIndex].value;
  td1.className = "p-3";

  const td2 = document.createElement("td");
  td2.innerText = amount.value;
  td2.className = "p-3";
  const td3 = document.createElement("td");
  td3.innerText = info.value;
  td3.className = "p-3";
  const td4 = document.createElement("td");
  td4.innerText = date.value;
  td4.className = "p-3";

  const delBtn = document.createElement("button");
  delBtn.className = "btn btn-primary";
  delBtn.innerText = "Delete";
  delBtn.className = "btn btn-danger";
  delBtn.addEventListener("click", function () {
    tr.remove();
  });

  const td5 = document.createElement("td");
  td5.className = "p-3";
  td5.appendChild(delBtn);

  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(td5);

  tbl.appendChild(tr);

  if (category.options[category.selectedIndex].value === "Income") {
    console.log("object");
    totInc += parseFloat(amount.value);
  } else if (category.options[category.selectedIndex].value === "Expense") {
    totExp += parseFloat(amount.value);
  }

  delBtn.addEventListener("click", function () {
    tr.remove();
    const deletedAmount = parseFloat(td2.innerText); // Get the amount of the deleted entry
    if (td1.innerText === "Income") {
      totInc -= deletedAmount; // Subtract from total income
    } else if (td1.innerText === "Expense") {
      totExp -= deletedAmount; // Subtract from total expense
    }
    balance = totInc - totExp; // Update balance
    // Update the displayed values
    totalIncome.innerText = "Your income " + totInc;
    totalExpense.innerText = "Your expense " + totExp;
    myBalance.innerText = "Your balance " + balance;
  });

  balance = totInc - totExp;

//   if (totInc === NaN) {
//     totalIncome.style.display = "none";
//   }

  totalIncome.innerText = "Your total income " + totInc;
  totalExpense.innerText = "Your total expense " + totExp;
  myBalance.innerText = "Your total balance " + balance;
  if(balance > 0){
    myStatus.innerText = "You are expending wisely"
    myStatus.className = "text-success"
  } else {
    myStatus.innerText = "You have to reduce your expenses."
    myStatus.className = "text-danger"
  }
  
});
