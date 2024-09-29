const { host, hostname, href, origin, pathname, port, protocol, search } = window.location;
console.log(
    "host: " + host +
    "\nhostname: " + hostname +
    "\nhref: " + href +
    "\norigin: " + origin +
    "\npathname: " + pathname +
    "\nport: " + port +
    "\nprotocol: " + protocol +
    "\nsearch: " + search
);

const root = "/";

// Endpoints
const endpoints = {
    weightUnits: root + "weightUnits",
    bottleSizes: root + "bottleSizes",
    capTypes: root + "capTypes",
    bottleCapTypes: root + "bottleCapTypes",
    bottleAndCapColors: root + "bottleAndCapColors",
    activeIngredients: root + "activeIngredients"
}

document.onload = getWeightUnits();
document.onload = getCapTypes();
document.onload = getBottleSizes();
document.onload = getBottleCapTypes();
document.onload = getBottleAndCapColors();
document.onload = getActiveIngredients();

let bottleSizes;
let bottleCapTypes;
let bottleAndCapColors;
let activeIngredients;

for (let i = 0; i < 4; i++) {
    document.querySelectorAll(".form-group")[i].addEventListener("change", function () {
        if (field1.value != "" && field2.value != "" && field3.value != "" && field4.value != "") {
            section2.style.display = "block";
        } else {
            section2.style.display = "none";
        }
    });
}

document.querySelectorAll(".form-group")[3].addEventListener("change", function () {
    if (field4.value != "") {
        section3.style.display = "none";
    }
})

for (let i = 4; i < 8; i++) {
    document.querySelectorAll(".form-group")[i].addEventListener("change", function () {
        if (field5.value != "" && field6.value != "" && field7.value != "" && field8.value != "") {
            section3.style.display = "block";
        } else {
            section3.style.display = "none";
        }
    });
}

field1.addEventListener("change", resetSectionsBelow);
field4.addEventListener("change", resetSectionsBelow);

function resetSectionsBelow() {
    for (let key in bottleSizes) {
        if (bottleSizes.hasOwnProperty(key)) {
            if (key === field4.value) {
                field5.innerHTML = `<option value="" disabled selected hidden>Bottle color</option>`;
                bottleAndCapColors.forEach(element => {
                    const option = document.createElement("option");
                    option.value = element;
                    option.text = element;
                    field5.appendChild(option);
                });

                field6.innerHTML = `<option value="" disabled selected hidden>Bottle cap type</option>`;
                bottleCapTypes.forEach(element => {
                    const option = document.createElement("option");
                    option.value = element.type;
                    option.text = element.type;
                    field6.appendChild(option);
                });

                field7.innerHTML = `<option value="" disabled selected hidden>Bottle cap color</option>`;
                bottleAndCapColors.forEach(element => {
                    const option = document.createElement("option");
                    option.value = element;
                    option.text = element;
                    field7.appendChild(option);
                });

                field8.innerHTML = `<option value="" disabled selected hidden>Pills per bottle</option>`;
                bottleSizes[key].forEach(element => {
                    const option = document.createElement("option");
                    option.value = element;
                    option.text = element;
                    field8.appendChild(option);
                });
            }
        }
    }

    // Move all items down from field9 to field10
    for (let i = 0; i < field9.children.length; i++) {
        const item = field9.children[i].querySelector('.activeIngredient');
        item.click();
    }
    pool.textContent = field1.value;
    poolValue = parseInt(pool.textContent, 10);

    section3.style.display = "none";
}

/**
 * Active ingredients
 */
const label = document.querySelector('label[for="field9"]');
label.style.display = 'none';
let poolValue = 0;

const observer = new MutationObserver(function () {
    if (field9.querySelectorAll('li').length > 0) {
        label.style.display = 'block';
    } else {
        label.style.display = 'none';
    }
});

observer.observe(field9, { childList: true });

// Function to update the counter and pool display
function updatePoolDisplay() {
    pool.textContent = poolValue;
}

document.addEventListener('DOMContentLoaded', () => {
    // Function to handle item selection
    function selectItem(event) {
        const item = event.target;

        if (item.classList.contains('activeIngredient')) {
            const parent = item.parentElement;
            if (parent.parentElement.id === 'field9') {
                const input = item.nextElementSibling.querySelector('input');
                if (input.value > 0) {
                    poolValue += parseInt(input.value);
                    updatePoolDisplay();
                }
            }

            parent.innerHTML = `<div style="width: 40px; height: 40px; margin: auto"><svg width="100%" height="100%" viewBox="0 0 100 100"><circle class="circle" cx="50" cy="50" r="30" fill="none" stroke="#FFFFFF" stroke-width="5"/></svg></div>`;
            parent.style.backgroundColor = '#007BFF';
            setTimeout(() => {
                const listItem = document.createElement("li");
                listItem.appendChild(item);

                if (parent.parentElement.id === 'field9') {
                    parent.remove();
                    field10.appendChild(listItem);
                    sortList(field10);
                    return;
                }

                if (parent.parentElement.id === 'field10') {
                    // Create the main container div with the class 'counter-container'
                    const counterContainer = document.createElement('div');
                    counterContainer.classList.add('counter-container');

                    // Create the decrement button
                    const decrementButton = document.createElement('button');
                    decrementButton.type = 'button';
                    decrementButton.classList.add('counter-button', 'decrement');
                    decrementButton.textContent = '-'; // Set the text of the button

                    // Create the input field to display the counter value
                    const counterDisplay = document.createElement('input');
                    counterDisplay.type = 'number';
                    counterDisplay.classList.add('counter-display');
                    counterDisplay.value = 0; // Initial value
                    counterDisplay.min = 0;
                    counterDisplay.step = 25;

                    // Create the increment button
                    const incrementButton = document.createElement('button');
                    incrementButton.type = 'button';
                    incrementButton.classList.add('counter-button', 'increment');
                    incrementButton.textContent = '+';

                    // Append the decrement button, counter display, and increment button to the counter container
                    counterContainer.appendChild(decrementButton);
                    counterContainer.appendChild(counterDisplay);
                    counterContainer.appendChild(incrementButton);
                    listItem.appendChild(counterContainer);

                    parent.remove();
                    field9.appendChild(listItem);
                    sortList(field9);
                    return;
                }
            }, 500);
        } else if (item.classList.contains('increment')) {
            const sibling = item.previousElementSibling;

            // Check if enough in pool to increment
            if (poolValue >= 25) {
                sibling.value = parseInt(sibling.value) + 25;
                poolValue -= 25;
                updatePoolDisplay();
            }
        } else if (item.classList.contains('decrement')) {
            const sibling = item.nextElementSibling;

            // Check if the counter value is greater than 0 to decrement
            if (sibling.value >= 25) {
                sibling.value = parseInt(sibling.value) - 25;
                poolValue += 25;
                updatePoolDisplay();
            }
        }
    }

    field10.addEventListener('click', selectItem);
    field9.addEventListener('click', selectItem);
});

function sortList(ul) {
    const listItems = Array.from(ul.children);

    // Sort the list items based on the text content of their first child
    listItems.sort((a, b) => {
        const textA = a.firstElementChild.textContent.toLowerCase();
        const textB = b.firstElementChild.textContent.toLowerCase();
        return textA.localeCompare(textB);
    });

    // Append the sorted <li> elements back to the <ul>
    listItems.forEach(li => ul.appendChild(li));
}

/**
 * Calling endpoints
 */
async function getWeightUnits() {
    const response = await fetch(endpoints.weightUnits);
    const data = await response.json();

    for (let i = 0; i < data.length; i++) {
        const option = document.createElement("option");
        option.value = data[i];
        option.text = data[i] + "mg";
        field1.appendChild(option);
    }
}

async function getCapTypes() {
    const response = await fetch(endpoints.capTypes);
    const data = await response.json();

    for (let i = 0; i < data.length; i++) {
        const option = document.createElement("option");
        option.value = data[i];
        option.text = data[i];
        field2.appendChild(option);
    }
}

async function getBottleSizes() {
    const response = await fetch(endpoints.bottleSizes);
    bottleSizes = await response.json();

    for (let key in bottleSizes) {
        if (bottleSizes.hasOwnProperty(key)) {
            const option = document.createElement("option");
            option.value = key;
            option.text = key;
            field4.appendChild(option);
        }
    }
}

async function getBottleCapTypes() {
    const response = await fetch(endpoints.bottleCapTypes);
    bottleCapTypes = await response.json();
}

async function getBottleAndCapColors() {
    const response = await fetch(endpoints.bottleAndCapColors);
    bottleAndCapColors = await response.json();
}

async function getActiveIngredients() {
    const response = await fetch(endpoints.activeIngredients);
    activeIngredients = await response.json();

    for (let i = 0; i < activeIngredients.length; i++) {
        const button = document.createElement("button");
        button.appendChild(document.createTextNode(activeIngredients[i]));
        const listItem = document.createElement("li");
        listItem.appendChild(button);
        button.classList.add("activeIngredient");
        field10.appendChild(listItem);
    }

    sortList(field10);
}
