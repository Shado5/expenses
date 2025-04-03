const expenses = [];
let total = 0; 
let itemName = "";

function enterValue() {
    let itemValue = parseFloat(document.getElementById("value").value);
    itemName = document.getElementById("itemname").value;

    
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
    newItem.textContent = `${name}: $${value.toFixed(2)}`; // Display name and value
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
    });

    // Append the delete button to the newItem div
    newItem.appendChild(deleteBtn);

    // Append the newItem div to the container
    let container = document.querySelector(".inputfeilds");
    container.appendChild(newItem);
}

