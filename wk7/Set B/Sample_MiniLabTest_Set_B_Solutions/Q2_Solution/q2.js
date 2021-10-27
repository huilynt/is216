function calculate(element) {
    console.log("===== [START] calculate() =====")

    // console.log(element)
    let value = element.innerText
    console.log(value)
    

    let operator_array = [ "+", "-", "/", "*", "." ]

    if( value == "AC" ) {
        document.getElementById("message").innerText = ""
        document.getElementById("current-equation").innerText = ""
    }
    else if( value == "DEL" ) {
        let current_operand = document.getElementById("current-equation").innerText
        if( current_operand != '' ) {
            let new_current_operand = current_operand.slice(0, -1)
            document.getElementById("current-equation").innerText = new_current_operand
        }
    }
    else if( value == "=" ) {
        console.log("Do calculation!")
        process_calculation(document.getElementById("current-equation").innerText)
    }
    else if( operator_array.includes(value) ) {
        // Adding this operator is not allowed if:

        // 1) current_operand string is empty
        //      set previoius-operand to "Invalid Input"
        //      clear current-equation
        let current_operand = document.getElementById("current-equation").innerText
        if( current_operand == '' ) {
            document.getElementById("message").innerText = "Invalid Input"
            document.getElementById("current-equation").innerText = ""
        }
        else {
            // 2) current_operand string's last character is "."
            // 3) current_operand string's last character is an operator
            //      In both cases, replace the last character with value
            let current_operand = document.getElementById("current-equation").innerText
            let last_char = current_operand.slice(-1)

            if( operator_array.includes(last_char) ) {
                let new_current_operand = current_operand.slice(0, -1) + value
                document.getElementById("current-equation").innerText = new_current_operand
            }
            else {
                document.getElementById("current-equation").innerText = current_operand + value
            }
        }
    }
    else {
        let current_operand = document.getElementById("current-equation").innerText
        document.getElementById("current-equation").innerText = current_operand + value
    }


    console.log("===== [END] calculate() =====")
}


function process_calculation(equation) {

    console.log("===== [START] process_calculation() =====")
    // console.log(equation)

    if( equation == '' ) {
        document.getElementById("message").innerText = "Nothing to calculate"
        return
    }

    let last_char = equation.slice(-1)

    let operator_array = [ "+", "-", "/", "*", "." ]

    if( operator_array.includes(last_char) ) {
        // return "Invalid Input"
        document.getElementById("message").innerText = "Invalid Input"
        return
    }

    
    document.getElementById("message").innerText = "Calculation result is here"
    document.getElementById("current-equation").innerText = eval(equation)
    console.log("===== [END] process_calculation() =====")
    return "Good!"
}

