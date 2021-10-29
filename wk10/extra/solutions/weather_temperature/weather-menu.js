app.component("weather-menu", {
    data: function () {
        return {
            my_href: location.href,
            menu: [
                {
                    href: "temperature.html",
                    text: "Temperature",
                },
                {
                    href: "forecast2hourly.html",
                    text: "2-hourly",
                },
                {
                    href: "forecast24.html",
                    text: "24-hour",
                },
                {
                    href: "forecast4days.html",
                    text: "4-days",
                },
            ],
        };
    },
    template: `<nav class="navbar navbar-expand-sm  navbar-dark bg-info">
                    <ul class="navbar-nav">
                        <li class="nav-item" v-for="item in menu">
                            <a :class="{ 'nav-link': true,  'disabled': my_href.endsWith(item.href)  }" 
                              :href='item.href'
                           >{{item.text}}</a>
                        </li>
                    </ul>
                
                </nav>`,
});
