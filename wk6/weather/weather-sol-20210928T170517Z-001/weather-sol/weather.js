/*      
    1. Asynchronous HTTP Request
        - make HTTP requests to the endpoints (APIs) of backend server in the background
        - less data usage, faster and more interactive than Synchronous requests (HTML form submission)
    
    2. Possible types of data returned from API calls -- Text, JSON, XML (out of scope) 

    3. Axios -- a library for making Async. Requests
        Syntax: 
            // GET request
            axios.get(url, {
                params: {
                    name1 : value1,
                    name2 : value2
                }
            })
            .then(response => {
                    // process response.data object
            })
            .catch(error => {
                // process error object
            })

            // POST request
            axios.post(url, {
                name1 : value1,
                name2 : value2
            })
            .then(response => {
                // process response.data object
            })
            .catch(error => {
                // process error object
            })

    
    3. JSON 
         - JSON is similar to JS Obj but some differences 
            - in JSON, names are double-quoted; Cannot use single quotes for strings
            - in JS, names can be strings, numbers, or identifier names: { name: "John" })
            - in JSON, values must be of null, string, number, Boolean, object, array
            - in JS, values can be of the above plus methods, etc.

        - JSON Syntax: 
            {   "name" : value, 
                "name" : { "name" : value }, 
                "name" : [ value, value, ... ]
            }
        e.g.
            {   "name": "Mary",
                "age":  26,
                "spouse" : { "name" : "John", "age": 27 }
                "hobby":["swimming","badminton"],
                "isMarried":true
            }

        - How to process JSON data received from API calls,
            - first need to conver JSON data to JS object
                JSON.parse() : covert JSON to JS
                JSON.stringify() : convert JS to JSON

            - then can process the data just like how you process JS object

            - Note: when we use Axios, it internally performs JSON.parse() 
                    and assign the resulting JS object to response.data
                    Hence, response.data is already a JS object (no need converting)
           

        
    x. use of backtick `` for breaking the string into multi-lines
    x. encodeURI(url) : for treating special characters such as space, slash / that have syntactic meaning to URL
            https://www.w3schools.com/jsref/jsref_encodeURI.asp
*/ 

/*
    Task: Add Code to 
        - listen to button click event and enter key press event
        - get the city entered by the user
        - make Axios request to Weather API and get the weather info of the given city
        - display the weather description
*/
var key = "d8ad138bef71d007adaa6bc3ffd863eb"
var url = "https://api.openweathermap.org/data/2.5/weather"

var btnEle = document.getElementById("weatherBtn");
var inputEle = document.getElementById("city");
var dataEle = document.getElementById("data");
var alertEle = document.getElementById("nodata");


dataEle.style.display = "none"; // hide the data element initially

// add event listeners on input field and button

// use anonymous function to pass the event object
inputEle.addEventListener("keypress", function(event) {
    getWeatherWhenEnterKeyPress(event) });


weatherBtn.addEventListener("click", getWeather);

function getWeatherWhenEnterKeyPress(event) {
    // keycode reference: 
    // https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
    
    // access the event information
    // console.log(event);
    // you can check which key is pressed by accessing the keyCode
    // property of the event
    // console.log(event.keyCode);

    
    // console.log(cityElem)
    // keyCode 13 is the enter key
    if (event.keyCode == 13) {
        getWeather();
    }
}

function getWeather() {
    // add code here
    let city = inputEle.value;
    
    if (city != "") { 
       
        console.log(city)
        let data = "Feeling Good!"
        
        
        // get weather json data
        // use error/exception handling code in case the server doesn't return data
        axios.get(url, {
                params: {
                    q : city,
                    appid : key
                }
            })
            .then(response =>  {
                console.log(response.data)
                data = computedata(response.data);
                //document.getElementById("data").innerHTML = data;

                dataEle.style.display = "block";
                alertEle.style.display = "none";

                dataEle.innerHTML = `
                                <h1 class="display-4">` + city + `</h1>              
                                <hr class="my-4">
                                <p class="lead">` + data + `</p>`; 
                
            })
            .catch(error => {
                // console.log("got error!")
                console.log(error.message)
                dataEle.style.display = "none";
                alertEle.style.display = "block";
                alertEle.innerText = "Please enter a valid city name!";
            }); 
    }

}


function computedata(obj) {
    // note: some data are float/int type, need to use repr() or str() to convert to string type
    // weather is a property of PHP object, which is an array
    let desc = obj.weather[0].description;
    let temp = obj.main.temp;
    temp = convert(temp); // convert to celsius
    let humid = obj.main.humidity;
    let wind = obj.wind.speed;

    /* weather object
    # weather = obj['weather'][0]

    # output some object attributes
    # print("Weather: " + weather['main'] + " " + weather['description'])

    # create data according to our application requirement
    # data = "Weather: " + weather['main'] + " " + weather['description']
    */

    let data = "The weather is " +
            desc + ". The temperature is " +
            temp + " degree celsius. The humidity is " +
            humid + "%. The wind speed is " +
            wind + " meter/sec.";
    
    return data;
}

function convert(kel) {
    // conver from kelvin to celsius 
    // and round to 2 decimal places
    let cel = Math.round(kel - 273.15,2);
    return cel;
}
