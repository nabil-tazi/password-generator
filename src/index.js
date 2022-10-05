import _ from 'lodash';
import Password from './password.js';

const inputRangeLength = document.getElementById('length-selector');
const outputValue =  document.getElementById('range-output');
const outputDisplayedPassword = document.getElementById('displayed-password');

//Checkbox elements
const inputCheckboxUppercase = document.getElementById('include-uppercase');
const inputCheckboxLowercase = document.getElementById('include-lowercase');
const inputCheckboxNumbers = document.getElementById('include-numbers');
const inputCheckboxSymbols = document.getElementById('include-symbols');

//Button elements
const buttonGenerate = document.getElementById('generate-button');
const buttonCopy = document.getElementById('copy-icon');

//Updates the displayed value and the range bar colors upon changes in value
inputRangeLength.oninput = function() {
    //Updates the displayed value
    outputValue.value = this.value;

    //The linear gradient is used to display the green color on the left side of the range bar
    var value = (this.value-this.min)/(this.max-this.min)*100
    this.style.background = 'linear-gradient(to right, #A5E9AE 0%, #A5E9AE ' + value + '%, #131118 ' + value + '%, #131118 100%)'
};

function createPassword(event){
    event.preventDefault();
    var password = new Password(inputRangeLength.value,readInputParams());
    updateOutput(password.pass);
    return 0;
}

function readInputParams(){
    var params = [];
    if (inputCheckboxUppercase.checked) {params.push("uppercase");}
    if (inputCheckboxLowercase.checked) {params.push("lowercase");}
    if (inputCheckboxSymbols.checked) {params.push("symbols");}
    if (inputCheckboxNumbers.checked) {params.push("numbers");}
    return params;
}

function updateOutput(content) {
    outputDisplayedPassword.innerHTML = content;
}

function addToClipboard(){
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copied: " + outputDisplayedPassword.innerText;

    navigator.clipboard.writeText(outputDisplayedPassword.innerText);
}

function outFunc() {
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copy to clipboard";
}

function checkParamsValidity() {
    console.log("???");
    if (!inputCheckboxUppercase.checked 
        && !inputCheckboxLowercase.checked 
        && !inputCheckboxSymbols.checked 
        && !inputCheckboxNumbers.checked) 
    {
        buttonGenerate.disabled = true;
        console.log("disable");
    }
}


buttonGenerate.addEventListener("click", createPassword);
buttonCopy.addEventListener("click", addToClipboard);
buttonCopy.addEventListener("mouseout", outFunc);

inputCheckboxLowercase.addEventListener("change", checkParamsValidity);
inputCheckboxUppercase.addEventListener("change", checkParamsValidity);
inputCheckboxSymbols.addEventListener("change", checkParamsValidity);
inputCheckboxNumbers.addEventListener("change", checkParamsValidity);