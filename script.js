const expenses = [];
let total = 0; 
let itemName = "";

window.onload = function () {
    // Load data from localStorage when the page loads
    const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    savedExpenses.forEach(expense => {
        expenses.push(expense); // Add them to the array
        createDiv(expense.name, expense.value);
    });
    console.log(savedExpenses);
}

function enterValue() {
    let itemValue = parseFloat(document.getElementById("value").value);
    itemName = document.getElementById("itemname").value;
        document.getElementById("saveiconimg").src = "images/saveicon.png";
    
        // Push an object with both name and value to the expenses array
        expenses.push({ name: itemName, value: itemValue });

        // Update the total
        total = expenses.reduce((acc, expense) => acc + expense.value, 0);
        document.getElementById("total").innerHTML = total;
        
        // Create a div displaying the item name and value
    createDiv(itemName, itemValue);

}

function createDiv(name, value) {
    let newItem = document.createElement("div");
    newItem.textContent = `${name}: $${value?.toFixed(2) ?? 0}`; // Display name and value
    newItem.classList.add("item");

    // Create a delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.classList.add("deleteButton");

    // Add a click event listener to remove the item
    deleteBtn.addEventListener("click", function () {
        // Find the index of the item in the expenses array
        let index = expenses.findIndex(expense => expense.name === name && expense.value === value);
        if (index !== -1) {
            expenses.splice(index, 1); // Remove item from the array
        }

        // Update the total after deletion
        total = expenses.reduce((acc, expense) => acc + expense.value, 0);
        document.getElementById("total").innerHTML = total;

        // Remove the div from the DOM
        newItem.remove();
        document.getElementById("saveiconimg").src = "images/saveicon.png";
    });

    // Append the delete button to the newItem div
    newItem.appendChild(deleteBtn);

    // Append the newItem div to the container
    let container = document.querySelector(".inputfields");
    container.appendChild(newItem);
}

function saveToLocalStorage() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    alert("Expenses saved!");
    document.getElementById("saveiconimg").src = "images/saved.png";
}

function searchExpenses(event) {
    event.preventDefault();

    const query = document.querySelector(".search-input").value.toLowerCase();
    const items = document.querySelectorAll(".item");
    const container = document.querySelector(".inputfields");

    let bestMatch = null;

    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
            if (!bestMatch || text.startsWith(query)) {
                bestMatch = item;
            }
        }
    });

    if (bestMatch) {
        // Find the index of the first .item div
        let firstItem = Array.from(container.children).find(child => child.classList.contains("item"));
        
        if (firstItem) {
            container.insertBefore(bestMatch, firstItem);
        } else {
            container.appendChild(bestMatch); // Fallback
        }

        bestMatch.style.backgroundColor = "#ffffcc"; // optional highlight
        setTimeout(() => bestMatch.style.backgroundColor = "", 1500);
    } else {
        alert("No match found.");
    }
}


