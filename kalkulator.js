//global scope variables
var add = false;
var sub = false;
var multi = false;
var divide = false;
var point = false;
var end = false;
var operators = [add, sub, multi, divide]; //for checking if any of those is true
var button_value;
var disp = "";
var displayer; //empty nie mozna zczytac document.getElementById poniewaz jeszcze DOMContent nie zostal zaladowany 
var classNumeric = document.getElementsByClassName("numeric");
var classOperator = document.getElementsByClassName("operator");
var el_1 = "";
var el_2 = "";

//event listeners pack
document.addEventListener("DOMContentLoaded", loadNumerics);
document.addEventListener("DOMContentLoaded", loadOperators);
document.addEventListener("DOMContentLoaded", function(event) {
    displayer = document.getElementById("main-screen");
    document.getElementById("equal").addEventListener("click", doMath);
    document.getElementById("double").addEventListener("click", recoButton);
    document.getElementById("double").addEventListener("click", checkIfFloat);
    document.getElementById("clearAll").addEventListener("click", clearEvery);
    document.getElementById("clearAll").addEventListener("click", clearDisplay);
});

//will load all elements by class name
function loadNumerics() {
    for(let i=0; i<=classNumeric.length; i++) {
        classNumeric[i].addEventListener("click", repeater);
        classNumeric[i].addEventListener("click", recoButton);
        classNumeric[i].addEventListener("click", putNumber) ;
        classNumeric[i].addEventListener("click", display); 
    }
    //for ES6 support this can be used instead of loop above
    /*Array.for(classNumeric).forEach(function(element) klamra
        element.addEventListener("click", recoButton)
        element.addEventListener("click", display)
        klamra
    */
}

//load all functions for all class=operator buttons +,-,*,/
function loadOperators() {
    for(let i=0; i<=classOperator.length; i++) {
        classOperator[i].addEventListener("click", repeaterDenine);
        classOperator[i].addEventListener("click", furtherMath);
        classOperator[i].addEventListener("click", recoButton);
        classOperator[i].addEventListener("click", display);   
        classOperator[i].addEventListener("click", findOperation);  
    }
}

//recognize value from button
function recoButton() {
    button_value = this.getAttribute("data-key");
    button_value.toString();
    return button_value;
}

//if . is input without any number befroe make it 0.value
/*function leesThanOne() {
	if(el === "") {
		el = 0;
		return el;
	}
	else {
		return;
	}
}*/

//due to its unique nature . has its own function set triggered once then ignored if was press already - to avoid spamming of . . . . by user
function checkIfFloat() {
	if(point === false) {
		repeater();
		//lessThanOne();
		putNumber();
		display();
		point = true;
		return;
	}
	else {
		return;
	}
}

//display all things on the calculator screen
function display() {
    disp = disp + button_value;
    displayer.innerHTML = disp;
    return;
}

//input 1t or 2nd argument 
function putNumber() {
    if(add === false && sub === false && multi === false && divide === false) {
        button_value = button_value.toString();
        el_1 = el_1.toString();
        el_1 = el_1 + button_value;
    }
    else if(add === true || sub === true || multi === true || divide === true) {
        button_value = button_value.toString();
        el_2 = el_2.toString();
        el_2 = el_2 + button_value;
    }
}

//find witch operation should be taken
function findOperation() {
    if(button_value == "+") {
        add = true;
        sub = false;
        multi = false;
        divide = false;
    }
    else if(button_value == "-") {
        add = false;
        sub = true;
        multi = false;
        divide = false;
    }
    else if(button_value == "*") {
        add = false;
        sub = false;
        multi = true;
        divide = false;
    }
    else if(button_value == "/") {
        add = false;
        sub = false;
        multi = false;
        divide = true;
    }
    else { //error
        alert("Ooops! Something went wrong.");//error handler
    }
	point = false;
}

//after pressing equal sign = do math according to recognized operation in fuction above
function doMath() {
    el_1 = parseFloat(el_1);
    el_2 = parseFloat(el_2);

    if(add == true) {
        disp = el_1 + el_2;
        displayer.innerHTML = disp;
    }
    else if(sub == true) {
        disp = el_1 - el_2;
        displayer.innerHTML = disp;
    }
    else if(multi == true) {
        disp = el_1 * el_2;
        displayer.innerHTML = disp;
    }
    else if(divide == true) {
        disp = el_1 / el_2;
        displayer.innerHTML = disp;
    }

    end = true;
    clearEvery();
    return;
}

//celar every varaible
function clearEvery() {
    add = false;
    sub = false;
    multi = false;
    divide = false;
    point = false;
    button_value;
    el_1 = "";
    el_2 = "";  
}

//celar calculator screen
function clearDisplay() {
    disp = "";
    displayer.innerHTML = disp;
}

//repeater - if another num is clicked after result of previous operation it means user want to start new operation
function repeater() {
    if(end === true) {
        clearDisplay();
        end = false;
    }
    else {
        return;
    }
}

//if user after displaying operation result clicks operator again it means that he or she want to make further operation on the previous result - so memory and displayer shouldn't be cleared out
function repeaterDenine() {
    if(end === true) {
        end = false;
    }
    else {
        return;
    }
}

//variables are clear out during doMath at the end - o make possible for user input new values - furtherMath will input previous operation result as el_1 to make possible for user make new operations of previous operation result
function furtherMath() {
    if(el_1 == "") {
        el_1 = disp;
    }
    else {
        return;
    }
}