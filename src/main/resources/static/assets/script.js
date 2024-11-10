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
    activeIngredients: root + "activeIngredients",
    smallIngredients: root + "smallIngredients"
}

document.onload = populateQuantity();
document.onload = getWeightUnits();
document.onload = getCapTypes();
document.onload = getBottleSizes();
document.onload = getBottleCapTypes();
document.onload = getBottleAndCapColors();
document.onload = getActiveIngredients();
document.onload = getSmallIngredients();
document.onload = setTimeout(() => {
    sortList(field11);
}, 2000);

let bottleSizes;
let bottleCapTypes;
let bottleAndCapColors;
let activeIngredients;
let smallIngredients;

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
                    option.value = element;
                    option.text = element;
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

    // Move all items down from field10 to field11
    for (let i = 0; i < field10.children.length; i++) {
        const item = field10.children[i].querySelector('.activeIngredient');
        item.click();
    }
    pool.textContent = field1.value;
    poolValue = parseInt(pool.textContent, 10);

    section3.style.display = "none";
}

/**
 * Active ingredients
 */
const label9 = document.querySelector('label[for="field9"]');
label9.style.display = 'none';

const label10 = document.querySelector('label[for="field10"]');
label10.style.display = 'none';

let poolValue = 0;

const observer = new MutationObserver(function () {
    if (field9.querySelectorAll('li').length > 0) {
        label9.style.display = 'block';
    } else {
        label9.style.display = 'none';
    }

    if (field10.querySelectorAll('li').length > 0) {
        label10.style.display = 'block';
    } else {
        label10.style.display = 'none';
    }
});

observer.observe(field9, { childList: true });
observer.observe(field10, { childList: true });

// Function to update the counter and pool display
function updatePoolDisplay() {
    const header = document.querySelectorAll('.smallSection')[2];
    pool.textContent = poolValue;

    if (poolValue == 0) {
        const list = document.querySelectorAll('.counter-display');
        
        list.forEach(item => {
            if (item.value <= 0) {
                item.parentElement.parentElement.firstChild.click();
            }
        });

        header.style.display = 'none';
        sendButton.style.display = 'block';
    } else {
        sendButton.style.display = 'none';
        header.style.display = 'flex';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Function to handle item selection
    function selectItem(event) {
        const item = event.target;

        if (item.classList.contains('activeIngredient') || item.classList.contains('smallIngredient')) {
            const parent = item.parentElement;
            if (parent.parentElement.id === 'field10') {
                const select = item.nextElementSibling.querySelector('select');
                if (select.value > 0) {
                    poolValue += parseInt(select.value);
                    updatePoolDisplay();
                }
            }

            if (parent.parentElement.id === 'field11' && poolValue <= 0 && item.classList.contains('activeIngredient')) {
                event.preventDefault();
                const temp = item.innerText;
                item.innerText = "No more sources available";
                setTimeout(() => {
                    item.innerText = temp;
                    item.blur();
                }, 1500);
            } else {
                parent.innerHTML = `<div style="width: 40px; height: 40px; margin: auto"><svg width="100%" height="100%" viewBox="0 0 100 100"><circle class="circle" cx="50" cy="50" r="30" fill="none" stroke="#FFFFFF" stroke-width="5"/></svg></div>`;
                parent.style.backgroundColor = '#007BFF';
                setTimeout(() => {
                    const listItem = document.createElement("li");
                    listItem.appendChild(item);

                    if (parent.parentElement.id === 'field9' || parent.parentElement.id === 'field10') {
                        parent.remove();
                        field11.appendChild(listItem);
                        sortList(field11);
                        return;
                    }

                    if (parent.parentElement.id === 'field11' && item.classList.contains('activeIngredient')) {
                        const counterContainer = document.createElement('div');
                        counterContainer.classList.add('counter-container');

                        const counterDisplay = document.createElement('select');
                        counterDisplay.classList.add('counter-display');

                        counterContainer.appendChild(counterDisplay);
                        listItem.appendChild(counterContainer);

                        counterDisplay.innerHTML = `<option value="-1" disabled selected hidden>Add ingredient</option>`;

                        counterDisplay.addEventListener('focus', () => {
                            beforeChange = counterDisplay.value;
                            refreshInput(counterDisplay);
                        });

                        counterDisplay.addEventListener('input', () => {
                            if (counterDisplay.value != beforeChange) {
                                if (beforeChange == -1) {
                                    beforeChange = 0;
                                }

                                poolValue += parseInt(beforeChange);
                                poolValue -= parseInt(counterDisplay.value);
                                refreshInput(counterDisplay);
                                beforeChange = counterDisplay.value;
                                updatePoolDisplay();

                                if (counterDisplay.value == 0) {
                                    item.click();
                                }
                            }
                        });

                        parent.remove();
                        field10.appendChild(listItem);
                        sortList(field10);
                        return;
                    }

                    if (parent.parentElement.id === 'field11' && item.classList.contains('smallIngredient')) {
                        const counterContainer = document.createElement('div');
                        counterContainer.classList.add('counter-container');

                        const decrementButton = document.createElement('button');
                        decrementButton.type = 'button';
                        decrementButton.classList.add('counter-button');
                        decrementButton.textContent = '-';

                        const counterDisplay = document.createElement('input');
                        counterDisplay.type = 'number';
                        counterDisplay.classList.add('small-counter-display');
                        counterDisplay.value = 0;
                        counterDisplay.min = 0;
                        counterDisplay.max = 100;
                        counterDisplay.step = 25;
                        counterDisplay.readOnly = true;

                        const incrementButton = document.createElement('button');
                        incrementButton.type = 'button';
                        incrementButton.classList.add('counter-button');
                        incrementButton.textContent = '+';

                        counterContainer.appendChild(decrementButton);
                        counterContainer.appendChild(counterDisplay);
                        counterContainer.appendChild(incrementButton);
                        listItem.appendChild(counterContainer);

                        decrementButton.addEventListener('click', () => {
                            if (counterDisplay.value != counterDisplay.min) {
                                counterDisplay.value = parseInt(counterDisplay.value) - 25;
                            }
                        });

                        incrementButton.addEventListener('click', () => {
                            if (counterDisplay.value != counterDisplay.max) {
                                counterDisplay.value = parseInt(counterDisplay.value) + 25;
                            }
                        });

                        parent.remove();
                        field9.appendChild(listItem);
                        sortList(field9);
                        return;
                    }
                }, 500);
            }
        }
    }

    field9.addEventListener('click', selectItem);
    field10.addEventListener('click', selectItem);
    field11.addEventListener('click', selectItem);
});

let beforeChange;

function refreshInput(item) {
    let preserve = item.value;

    item.innerHTML = `<option value="-1" disabled selected hidden>Add ingredient</option>`;

    const goal = poolValue + parseInt(preserve == -1 ? 0 : preserve);

    for (let i = 0; i <= goal; i += 25) {
        const option = document.createElement("option");
        option.value = i;
        option.text = i + " mg";
        item.appendChild(option);
    }

    const options = item.options;
    for (let i = 0; i < options.length; i++) {
        if (options[i].value == preserve) {
            options[i].selected = true;
            break;
        }
    }
}

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

function populateQuantity() {
    for (let i = 30; i < 1000; i += 10) {
        const option = document.createElement("option");
        option.value = i * 1000;
        option.text = i + "k";
        field3.appendChild(option);
    }
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
        option.text = data[i] + " mg";
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
        field11.appendChild(listItem);
    }
}

async function getSmallIngredients() {
    const response = await fetch(endpoints.smallIngredients);
    smallIngredients = await response.json();

    for (let i = 0; i < smallIngredients.length; i++) {
        const button = document.createElement("button");
        button.appendChild(document.createTextNode(smallIngredients[i]));
        const listItem = document.createElement("li");
        listItem.appendChild(button);
        button.classList.add("smallIngredient");
        field11.appendChild(listItem);
    }
}
