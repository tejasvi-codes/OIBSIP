// ===============================
// GET ELEMENTS
// ===============================

const temperatureInput = document.getElementById("temperature");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");

const convertBtn = document.getElementById("convertBtn");
const clearBtn = document.getElementById("clearBtn");
const swapBtn = document.getElementById("swapBtn");
const copyBtn = document.getElementById("copyBtn");
const themeBtn = document.getElementById("themeBtn");

const result = document.getElementById("result");
const status = document.getElementById("status");
const history = document.getElementById("history");

const quickButtons = document.querySelectorAll(".quick-btn");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");


// ===============================
// RECENT CONVERSIONS
// ===============================

let conversions = [];


// ===============================
// CONVERT TEMPERATURE
// ===============================

convertBtn.addEventListener("click", convertTemperature);

function convertTemperature() {

    const temperature = parseFloat(temperatureInput.value);

    if (isNaN(temperature)) {
        result.textContent = "Please enter a valid temperature.";
        status.textContent = "";
        return;
    }

    const from = fromUnit.value;
    const to = toUnit.value;

    let celsius;

    // Convert input to Celsius
    if (from === "C") {
        celsius = temperature;
    }
    else if (from === "F") {
        celsius = (temperature - 32) * 5 / 9;
    }
    else if (from === "K") {
        celsius = temperature - 273.15;
    }

    // Convert Celsius to selected unit
    let converted;

    if (to === "C") {
        converted = celsius;
    }
    else if (to === "F") {
        converted = (celsius * 9 / 5) + 32;
    }
    else if (to === "K") {
        converted = celsius + 273.15;
    }

    // Prevent invalid Kelvin temperature
    if (converted < 0 && to === "K") {
        result.textContent = "Temperature cannot be below 0 K.";
        status.textContent = "";
        return;
    }

    // Unit symbols
    const symbols = {
        C: "°C",
        F: "°F",
        K: "K"
    };

    const finalValue = converted.toFixed(2);

    // Display result
    result.textContent =
        `${temperature} ${symbols[from]} = ${finalValue} ${symbols[to]}`;

    // Display temperature status
    showTemperatureStatus(celsius);

    // Add conversion to history
    addToHistory(
        `${temperature} ${symbols[from]} → ${finalValue} ${symbols[to]}`
    );
}


// ===============================
// TEMPERATURE STATUS
// ===============================

function showTemperatureStatus(celsius) {

    if (celsius < 10) {
        status.textContent = "❄️ Cold temperature";
    }
    else if (celsius < 30) {
        status.textContent = "😊 Comfortable temperature";
    }
    else {
        status.textContent = "🔥 Hot temperature";
    }
}


// ===============================
// ADD TO HISTORY
// ===============================

function addToHistory(conversion) {

    conversions.unshift(conversion);

    // Keep only latest 5 conversions
    if (conversions.length > 5) {
        conversions.pop();
    }

    history.innerHTML = "";

    conversions.forEach(function(item) {

        const div = document.createElement("div");

        div.className = "history-item";

        div.textContent = item;

        history.appendChild(div);

    });
}


// ===============================
// SWAP UNITS
// ===============================

swapBtn.addEventListener("click", function() {

    const currentFrom = fromUnit.value;
    const currentTo = toUnit.value;

    fromUnit.value = currentTo;
    toUnit.value = currentFrom;

});


// ===============================
// CLEAR BUTTON
// ===============================

clearBtn.addEventListener("click", function() {

    temperatureInput.value = "";

    result.textContent = "Result will appear here";

    status.textContent = "";

    fromUnit.value = "C";
    toUnit.value = "F";

});


// ===============================
// QUICK TEMPERATURE BUTTONS
// ===============================

quickButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const temperature =
            button.getAttribute("data-temp");

        temperatureInput.value = temperature;

        fromUnit.value = "C";

        toUnit.value = "F";

        convertTemperature();

    });

});


// ===============================
// COPY RESULT
// ===============================

copyBtn.addEventListener("click", function() {

    const text = result.textContent;

    if (
        text === "Result will appear here" ||
        text === "Please enter a valid temperature."
    ) {
        return;
    }

    navigator.clipboard.writeText(text);

    copyBtn.textContent = "✅ Copied!";

    setTimeout(function() {

        copyBtn.textContent = "📋 Copy Result";

    }, 1500);

});


// ===============================
// DARK / LIGHT MODE
// ===============================

themeBtn.addEventListener("click", function() {

    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {

        themeBtn.textContent = "☀️ Light Mode";

    }
    else {

        themeBtn.textContent = "🌙 Dark Mode";

    }

});


// ===============================
// ENTER KEY TO CONVERT
// ===============================

temperatureInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        convertTemperature();

    }
    // ===============================
// CLEAR HISTORY
// ===============================

clearHistoryBtn.addEventListener("click", function() {

    conversions = [];

    history.innerHTML = "";

});
    

});