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
    smallIngredients: root + "smallIngredients",
    submit: root + "submit",
    sendQuote: root + "sendQuote"
}

document.onload = populateQuantity();
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
let smallIngredients;

for (let i = 0; i < 4; i++) {
    document.querySelectorAll(".form-group")[i].addEventListener("change", () => {
        if (field1.value != "" && field2.value != "" && field3.value != "" && field4.value != "") {
            section2.style.display = "block";
        } else {
            section2.style.display = "none";
        }
    });
}

document.querySelectorAll(".form-group")[0].addEventListener("change", () => {
    if (field1.value != "") {
        section3.style.display = "none";
    }
});

document.querySelectorAll(".form-group")[3].addEventListener("change", () => {
    if (field4.value != "") {
        section3.style.display = "none";
    }
});

for (let i = 4; i < 8; i++) {
    document.querySelectorAll(".form-group")[i].addEventListener("change", () => {
        if (field5.value != "" && field6.value != "" && field7.value != "" && field8.value != "") {
            section3.style.display = "block";
        } else {
            section3.style.display = "none";
        }
    });
}

field1.addEventListener("change", resetSectionsBelow);
field3.addEventListener("change", resetSectionsBelow);
field4.addEventListener("change", resetSectionsBelow);

function resetSectionsBelow() {
    updateRemainder();
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

    const boxes = field10.querySelectorAll('.xClose');
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].click();
    }

    section3.style.display = "none";
}

/**
 * New code for active ingredients
 */
async function updateRemainder() {
    const mgMass = [];
    const mcgMass = [];
    let totalMass = 0;
    let totalMicrograms = 0;
    let smallList = {};
    let activeList = {};
    const boxes = field10.querySelectorAll('.box');
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].querySelector('.counter').innerText.slice(-2) === "mg") {
            mgMass.push(boxes[i].querySelector('.counter').innerHTML.slice(0, -3));
            activeList[boxes[i].querySelector('.identifier').innerText] = boxes[i].querySelector('.counter').innerHTML.slice(0, -3);
        } else {
            mcgMass.push(boxes[i].querySelector('.counter').innerHTML.slice(0, -3));
            smallList[boxes[i].querySelector('.identifier').innerText] = boxes[i].querySelector('.counter').innerHTML.slice(0, -3);
        }
    }

    for (let i = 0; i < mgMass.length; i++) {
        totalMass += parseInt(mgMass[i]);
    }

    for (let i = 0; i < mcgMass.length; i++) {
        totalMicrograms += parseInt(mcgMass[i]);
    }

    // if (totalMicrograms > 1000) {
    //     totalMass = totalMass + (totalMicrograms / 1000);
    // }
    // totalMicrograms = totalMicrograms / 1000;
    // totalMass = totalMass + totalMicrograms;

    pool.innerText = totalMass;
    const remainder = parseInt(field1.value);
    qtyInput.max = remainder - totalMass > 0 ? remainder - totalMass : 0;

    document.querySelectorAll('.form-group')[9].style.display = boxes.length > 0 ? "block" : "none";
    document.querySelectorAll('.form-group')[10].style.display = boxes.length > 0 ? "block" : "none";

    const finalCost = new Promise(resolve => {
        resolve(submitForm(smallList, activeList));
    });
    const response = await finalCost;
    totalCost.innerHTML = response.total;
    howManyBottles.innerHTML = response.bottleQuantity;
    eachBottleCost.innerHTML = response.eachBottleCost.toFixed(2);
}

field8.addEventListener("change", () => {
    updateRemainder();
});

field9.addEventListener("input", () => {
    const selectedOption = field9.options[field9.selectedIndex];
    if (field9.value != "") {
        qtyInput.disabled = false;
        qtyInput.placeholder = `Enter ${selectedOption.getAttribute("data-type") === "activeIngredient" ? "milligrams (mg)" : "micrograms (μg)"}`;
    } else {
        qtyInput.disabled = true;
    }
});

qtyInput.addEventListener("input", () => {
    const selectedOption = field9.options[field9.selectedIndex];
    if (selectedOption.getAttribute("data-type") === "activeIngredient") {
        if (parseInt(qtyInput.value) > 0 && parseInt(qtyInput.value) <= parseInt(qtyInput.max)) {
            qtyButton.style.display = "block";
        } else {
            qtyButton.style.display = "none";
        }
    } else {
        if (parseInt(qtyInput.value) > 0) {
            qtyButton.style.display = "block";
        } else {
            qtyButton.style.display = "none";
        }
    }
});

qtyInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        event.preventDefault();
        qtyButton.click();
    }
});

qtyButton.addEventListener("click", event => {
    event.preventDefault();
    const selectedOption = field9.options[field9.selectedIndex];
    if (selectedOption.getAttribute("data-type") === "activeIngredient") {
        if (parseInt(qtyInput.value) > 0 && parseInt(qtyInput.value) <= parseInt(qtyInput.max)) {
    
            const listItem = document.createElement("li");
            listItem.innerHTML = `<label class="counter">${qtyInput.value}${selectedOption.getAttribute("data-type") === "activeIngredient" ? " mg" : " μg"}</label><span class="identifier">${field9.value}</span><button class="xClose" onclick="removeBox(this, event)">X</button>`;
            listItem.classList.add("box");
            listItem.setAttribute("data-type", selectedOption.getAttribute("data-type"));
            field10.appendChild(listItem);
    
            const indexToRemove = field9.selectedIndex;
            if (indexToRemove >= 0 && indexToRemove < field9.options.length) {
                field9.remove(indexToRemove);
            }
        }
    } else {
        if (parseInt(qtyInput.value) > 0) {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<label class="counter">${qtyInput.value}${selectedOption.getAttribute("data-type") === "activeIngredient" ? " mg" : " μg"}</label><span class="identifier">${field9.value}</span><button class="xClose" onclick="removeBox(this, event)">X</button>`;
            listItem.classList.add("box");
            listItem.setAttribute("data-type", selectedOption.getAttribute("data-type"));
            field10.appendChild(listItem);
    
            const indexToRemove = field9.selectedIndex;
            if (indexToRemove >= 0 && indexToRemove < field9.options.length) {
                field9.remove(indexToRemove);
            }
        }
    }

    updateRemainder();
    resetSelect();
});

function removeBox(button, event) {
    event.preventDefault();
    const optionValue = button.previousElementSibling;
    const option = document.createElement("option");
    option.value = optionValue.textContent;
    option.text = optionValue.textContent;
    option.setAttribute("data-type", button.parentElement.getAttribute("data-type"));
    field9.appendChild(option);
    sortOptions(field9);
    button.parentElement.remove();
    resetSelect();
    updateRemainder();
}

function resetSelect() {
    field9.value = "";
    qtyInput.value = "";
    qtyInput.disabled = true;
    qtyInput.placeholder = "";
    qtyButton.style.display = "none";
}

function sortOptions(select) {
    select.removeChild(select.firstElementChild);
    const sortedOptions = Array.from(select.options).sort((a, b) => a.text.localeCompare(b.text));
    select.innerHTML = `<option value="" disabled selected hidden>Select ingredient</option>`;
    sortedOptions.forEach(option => select.appendChild(option));
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
    const response1 = await fetch(endpoints.activeIngredients);
    activeIngredients = await response1.json();

    for (let i = 0; i < activeIngredients.length; i++) {
        const option = document.createElement("option");
        option.value = activeIngredients[i];
        option.text = activeIngredients[i];
        option.setAttribute("data-type", "activeIngredient");
        field9.appendChild(option);
    }

    const response2 = await fetch(endpoints.smallIngredients);
    smallIngredients = await response2.json();

    for (let i = 0; i < smallIngredients.length; i++) {
        const option = document.createElement("option");
        option.value = smallIngredients[i];
        option.text = smallIngredients[i];
        option.setAttribute("data-type", "smallIngredient");
        field9.appendChild(option);
    }

    sortOptions(field9);
    field9.selectedIndex = 0;
}

sendButton.addEventListener('click', event => {
    event.preventDefault();
    // event.target.disabled = true;
    let smallList = {};
    let activeList = {};

    sendQuote(smallList, activeList);
    alert("You will receive a quote via email.");
});

async function submitForm(smallList, activeList) {
    const response = await fetch(endpoints.submit, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "mass": field1.value,
            "capsuleType": field2.value,
            "quantity": field3.value,
            "bottleSize": field4.value,
            "bottleColor": field5.value,
            "bottleCapType": field6.value,
            "bottleCapColor": field7.value,
            "pillsPerBottle": field8.value,
            "smallIngredients": smallList,
            "activeIngredients": activeList
        })
    });

    const data = await response.json();
    console.log(data);
    return data;
}

async function sendQuote(smallList, activeList) {
    const formData = new FormData()
    formData.append('recipient', 'andruy@gmail.com')
    const queryString = new URLSearchParams(formData).toString()

    const response = await fetch(endpoints.sendQuote + `?${queryString}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "mass": field1.value,
            "capsuleType": field2.value,
            "quantity": field3.value,
            "bottleSize": field4.value,
            "bottleColor": field5.value,
            "bottleCapType": field6.value,
            "bottleCapColor": field7.value,
            "pillsPerBottle": field8.value,
            "smallIngredients": smallList,
            "activeIngredients": activeList
        })
    });

    const data = await response.json();
    console.log(data);
    return data;
}
