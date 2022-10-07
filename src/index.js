import _ from 'lodash';
import Password from './password.js';

//Range selector element
const inputRangeLength = document.getElementById('length-selector');

//Output elements
const outputValue =  document.getElementById('range-output');
const outputDisplayedPassword = document.getElementById('displayed-password');
const outputStrength = document.getElementById('strength-level');

//Checkbox elements
const checkboxElems = [...document.querySelectorAll("input[type='checkbox']")];

//Button elements
const buttonGenerate = document.getElementById('generate-button');
const buttonCopy = document.getElementById('copy-icon');
buttonCopy.tooltip = document.getElementById("myTooltip");

//Event listener on the Generate button
buttonGenerate.addEventListener("click", userCreatesPassword);

//Event listeners on the Copy button
buttonCopy.addEventListener("click", addToClipboard);
buttonCopy.addEventListener("mouseout", initTooltip);

//Event listeners on the checkboxes
for (var checkbox of checkboxElems) {
    checkbox.addEventListener("change", setGenerateButtonActivation);
}

//Updates the displayed value and the range bar colors upon changes in value
inputRangeLength.oninput = function() {
    //Updates the displayed value
    outputValue.value = this.value;

    //The linear gradient is used to display the green color on the left side of the range bar
    var value = (this.value-this.min)/(this.max-this.min)*100
    this.style.background = 'linear-gradient(to right, #A5E9AE 0%, #A5E9AE ' + value + '%, #131118 ' + value + '%, #131118 100%)'
};

function userCreatesPassword(event){
    event.preventDefault();
    displayNewPassword(createPassword());
}

function createPassword() {
    return new Password(inputRangeLength.value,readInputParams(checkboxElems));
}

function displayNewPassword(password) {
    updateOutput(outputDisplayedPassword, password.pass);
    updateOutput(outputStrength, password.strength);
}

//Returns the list of character type set by the user
function readInputParams(checkboxes){
    var checkedCheckboxes = checkboxes.filter((checkbox)=> checkbox.checked);
    var params = checkedCheckboxes.map((checkbox)=>checkbox.value);
    return params;
}

//Generic update output function
function updateOutput(element, content) {
    element.innerHTML = content;
}

//Adds the password to clipboard
function addToClipboard(event){
    if(!areAllBoxesUnchecked(checkboxElems)){
        event.target.tooltip.innerHTML = "Copied: " + outputDisplayedPassword.innerText;
        navigator.clipboard.writeText(outputDisplayedPassword.innerText);
    }
}

//Changes the content of the tooltip
function initTooltip(event) {
    event.target.tooltip.innerHTML = "Copy to clipboard";
}

//Checks if all the checkboxes are not checked
function areAllBoxesUnchecked(checkboxes) {
    return checkboxes.every((checkbox) => !checkbox.checked)
}

//Updates CSS of Generate button in case all checkboxes were unchecked
function setGenerateButtonActivation() {
    if (areAllBoxesUnchecked(checkboxElems))
    {
        buttonGenerate.classList.add("deactivated-button");
    }
    else {
        buttonGenerate.classList.remove("deactivated-button");
    }
}

//Creates a new password and displays it
displayNewPassword(createPassword());