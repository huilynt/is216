/*

 Name: 
 Email: 

*/

// Part A
function get_level() {
    
    // YOUR CODE GOES HERE
    let level = 0;
    let path = document.getElementById('path').value;
    for (const p of path) {
        console.log(p)
        if (p === 'D') {
            level--
        } else if (p === 'U') {
            level++
        }
    }
    console.log(level)
    return level
}


// Part B
function count_valleys() {
    
    // YOUR CODE GOES HERE

}


// Part C
function count_mountains() {
    
    // YOUR CODE GOES HERE

}



// Part D
// Feel free to add additional functions




// Part E
function print_path() {
    
    let output = ``

    // YOUR CODE GOES HERE

    return output

}