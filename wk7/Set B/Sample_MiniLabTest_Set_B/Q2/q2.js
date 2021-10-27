// YOU MAY ADD MORE CODE BELOW
// HINT: You might want to start with a function that is
// invoked when any key is pressed in the calculator grid.

var keys = document.getElementsByClassName("key");
for (const key of keys) {
  key.addEventListener("click", clickKey);
}
var msg = document.getElementById("message");
var curEqn = document.getElementById("current-equation");
curEqn.innerText = "";

var userEqn = [];
var operations = ["/", "*", "+", "-", "."];

// A sample function
// Please name your function in a meaningful way
// From the function name, it must be clear what business logic this function performs.
// Make sure to console.log() and verify parameters, values, etc.
function clickKey(e) {
  let keyText = e.target.innerText;
  console.log("clickKey(e) keyText", keyText);

  if (keyText === "AC") {
    keyAC(keyText);
  } else if (keyText === "DEL") {
    keyDel(keyText);
  } else if (operations.includes(keyText)) {
    keyOperations(keyText);
  } else if (keyText === "=") {
    keyEqual(keyText);
  } else {
    keyNumber(keyText);
  }

  console.log("clickKey(e) userEqn", userEqn);

  if (keyText !== "=" && keyText !== "AC") {
    curEqn.innerText = userEqn.join("");
  }
}

function keyAC(keyText) {
  msg.innerText = "";
  curEqn.innerText = "";
  userEqn = [];
}

function keyDel(keyText) {
  if (userEqn.length > 0) {
    userEqn.pop();
  }
}

function keyOperations(keyText) {
  if (userEqn.length === 0) {
    msg.innerText = "Invalid Input";
  } else {
      console.log(userEqn[userEqn.length-1])
    if (operations.includes(userEqn[userEqn.length-1])) {
      userEqn[userEqn.length-1] = keyText;
    } else {
      userEqn.push(keyText);
    }
  }
}

function keyEqual(keyText) {
  if (userEqn.length === 0) {
    msg.innerText = "Nothing to calculate";
  } else {
    msg.innerText = "Calculation result is here";
    curEqn.innerText = eval(userEqn.join(""));
  }
}

function keyNumber(keyText) {
  userEqn.push(keyText);
}
