// Add Code here
var inputs = document.getElementsByTagName("input");
var input1 = inputs[0];
var input2 = inputs[1];
input1.addEventListener("input", getName);
input2.addEventListener("input", getName);


function getName() {
    // Add Code here
    var fName = input1.value;
    var lName = input2.value;

    var name = document.getElementById("name")
    name.innerHTML = "You entered: " + fName + " " + lName;
}