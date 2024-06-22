const {host, hostname, href, origin, pathname, port, protocol, search} = window.location;
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

// Endpoints
const bottleSizesEndpoint = "/bottleSizes";
const weightUnitsEndpoint = "/weightUnits";
const capTypesEndpoint = "/capTypes";

document.onload = getWeightUnits();
document.onload = getCapTypes();
document.onload = getBottleSizes();

const capsPerBottle = [30, 60, 90, 120];

let currentCapsPerBottle;
let mgPerCapsule;

// auto calculate number of bottles
function numberOfBottles() {
    return Math.ceil(quantity / currentCapsPerBottle);
}

async function getWeightUnits() {
    const response = await fetch("/weightUnits");
    const data = await response.json();

    for (let i = 0; i < data.length; i++) {
        const option = document.createElement("option");
        option.value = data[i];
        option.text = data[i] + "g";
        field1.appendChild(option);
    }
}

async function getCapTypes() {
    const response = await fetch(capTypesEndpoint);
    const data = await response.json();

    for (let i = 0; i < data.length; i++) {
        const option = document.createElement("option");
        option.value = data[i];
        option.text = data[i];
        field2.appendChild(option);
    }
}

async function getBottleSizes() {
    const response = await fetch(bottleSizesEndpoint);
    const data = await response.json();

    console.log(data);

    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            const option = document.createElement("option");
            option.value = data[key];
            option.text = key;
            field4.appendChild(option);
        }
    }

    // for (let i = 0; i < data.length; i++) {
    //     const option = document.createElement("option");
    //     option.value = data[i].value;
    //     option.text = data[i].key;
    //     field4.appendChild(option);
    // }
}
