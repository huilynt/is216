const app = Vue.createApp({
    data() {
        return {
            cities: ["Singapore", "London", "Beijing", "Washington"],
        };
    },
});

app.component("weather-comp", {
    props: ["city"],
    template: "<span><strong>{{city}}</strong> {{message}}</span>",
    data() {
        return {
            message: "Unknown",
        };
    }, // data
    created() {
        console.log("getWeather; city:" + this.city);
        let myapikey = "34bbb17440f2255e55a553dc408c5dd6";
        let url =
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            this.city +
            "&APPID=" +
            myapikey;

        // get weather json data
        // use error/exception handling code in case the server doesn't return data
        axios
            .get(url)
            .then((response) => {
                let obj = response.data;

                // note: some data are float/int type, need to use repr() or str() to convert to string type
                // weather is a property of PHP object, which is an array
                let desc = obj.weather[0].description;
                desc = desc[0].toUpperCase() + desc.slice(1);
                let temp = obj.main.temp;
                temp = this.convert(temp); // convert to celsius
                let humid = obj.main.humidity;
                let wind = obj.wind.speed;

                this.message =
                    desc +
                    ", " +
                    temp +
                    " °C, " +
                    humid +
                    "% humidity, " +
                    " wind " +
                    wind +
                    "m/s.";
            }) // then
            .catch((error) => {
                this.message = "HTTP Error " + error.message;
            }); // catch
    }, // created
    methods: {
        convert(kel) {
            // conver from kelvin to celsius
            // and round to 2 decimal places
            let cel = Math.round(kel - 273.15, 2);
            return cel;
        }, // convert
    }, // methods
}); // Vue.component 'weather-comp',


const vm = app.mount("#app");
