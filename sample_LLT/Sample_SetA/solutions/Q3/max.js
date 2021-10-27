/*
    
Name:   KIM Jong Un
Email:  kim.jongun.2020

*/

function get_max(url1, url2, ele_id) {
    /*
    Assume list1 and list2 are the lists obtained from url1 and url2
    the output to be displayed in HTML element with id ele_id
        url1 + " : " + JSON.stringify(list1) + "<br>" +
        url2 + " : " + JSON.stringify(list2) + "<br>" +
        "max : " + max
    
    For failed AJAX calls, assuming url1 fails
        url1 + "<br>" + error;
    */

    let ele = document.getElementById(ele_id);

    // ajax call to url1
    axios
        .get(url1)  // -> note: get is a method ( ) not { }
        .then((response) => {   // note: don't forget { }
            let list1 = response.data;

            /*  note:
                because Ajax call is Asynchronous 
                making two Ajax calls independently is not a good idea
                because second call will not wait for first call to complete.

                So need to make sure both lists are available, cascade the two Ajax calls
                and handle the two lists inside then() block
                because then() block is executed after the response is obtained.
            */
            // ajax call to url2
            axios
                .get(url2)
                .then((response) => {
                    let list2 = response.data;

                    
                    let max = null;
                    for (item of list1) {
                        if (
                            typeof item === "number" && // is a number
                            (max === null || max < item)
                        ) {
                            max = item;
                        }
                    }
                    for (item of list2) {
                        if (
                            typeof item === "number" && // is a number
                            (max === null || max < item)
                        ) {
                            max = item;
                        }
                    }

                    
                    if (max === null) max = "No number";

                    // output
                    // note: JSON.stringify converts a JS object into JSON-like string
                    // list1 and list2 are JS objects (response.data)
                    ele.innerHTML =
                        url1 +
                        " : " +
                        JSON.stringify(list1) +
                        "<br>" +
                        url2 +
                        " : " +
                        JSON.stringify(list2) +
                        "<br>" +
                        "Max : " +
                        max;
                })
                .catch((error) => {
                    ele.innerHTML = url2 + "<br>" + error;
                });
        })
        .catch((error) => {
            ele.innerHTML = url1 + "<br>" + error;
        });
}
