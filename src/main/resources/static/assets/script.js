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

field1.addEventListener("change", resetSection2);
field4.addEventListener("change", resetSection2);

function resetSection2() {
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
        const item = field9.children[i];
        item.click();
    }
}

/**
 * Active ingredients
 */
const label = document.querySelector('label[for="field9"]');
label.style.display = 'none';

const observer = new MutationObserver(function () {
    if (field9.querySelectorAll('li').length > 0) {
        label.style.display = 'block';
        // const span = document.createElement('span');
        // span.id = 'sourceValue';
        // span.innerText = "whatever";
        // label.insertAdjacentElement('afterend', span);
        label.innerHTML = `Composition (${field1.value}g)`;
    } else {
        label.style.display = 'none';
    }
});

observer.observe(field9, { childList: true });

document.addEventListener('DOMContentLoaded', () => {
    // Function to handle item selection
    function selectItem(event) {
        const item = event.target;
        if (item.classList.contains('activeIngredient')) {
            item.classList.toggle('selected');
        }

        const temp = item.innerHTML;

        if (item.classList.contains('activeIngredient') && item.classList.contains('selected')) {
            const parent = item.parentElement;
            parent.innerHTML = `<div style="width: 35px; height: 35px; margin: auto"><svg width="100%" height="100%" viewBox="0 0 100 100"><circle class="circle" cx="50" cy="50" r="30" fill="none" stroke="#FFFFFF" stroke-width="5"/></svg></div>`;
            parent.style.backgroundColor = '#007BFF';
            setTimeout(() => {
                if (parent.parentElement.id === 'field9') {
                    moveItemsDown(temp, item);
                    parent.remove();
                    return;
                }

                if (parent.parentElement.id === 'field10') {
                    moveItemsUp(temp, item);
                    parent.remove();
                    return;
                }
            }, 500);
        }
    }

    // Function to move selected items to the right
    function moveItemsUp(temp, selectedItem) {
        selectedItem.classList.remove('selected');
        selectedItem.innerHTML = temp;
        field9.appendChild(selectedItem);
        sortList(field9);
    }

    // Function to move selected items to the left
    function moveItemsDown(temp, selectedItem) {
        selectedItem.classList.remove('selected');
        selectedItem.innerHTML = temp;
        field10.appendChild(selectedItem);
        sortList(field10);
    }

    field10.addEventListener('click', selectItem);
    field9.addEventListener('click', selectItem);
});

function sortList(list) {
    const items = list.querySelectorAll('.activeIngredient');
    const sortedItems = Array.from(items).sort((a, b) => a.innerText.localeCompare(b.innerText));
    list.innerHTML = '';
    for (let i = 0; i < sortedItems.length; i++) {
        const listItem = document.createElement("li");
        listItem.appendChild(sortedItems[i]);
        list.appendChild(listItem);
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
        option.text = data[i] + "g";
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
        sortList(field10);
    }
}
