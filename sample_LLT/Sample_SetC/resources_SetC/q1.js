/*

 Name: 
 Email: 

*/

let main = Vue.createApp({

    data() {
        return {

            // DO NOT MODIFY/EDIT THIS DATA PROPERTY
            available_celebs: {
                "G-Dragon": "bb_gd.jpg",
                "Taeyang": "bb_taeyang.jpg",
                "TOP": "bb_top.jpg"
            },

            // DO NOT MODIFY/EDIT THIS DATA PROPERTY
            available_activities: [
                {
                    "name": "Chat",
                    "price": "10.50"
                },
                {
                    "name": "Hug",
                    "price": "30.25"
                },
                {
                    "name": "Kiss",
                    "price": "60.99"
                }
            ],

            // DO NOT MODIFY THIS MANUALLY IN THIS FILE
            selected_celeb: null,

            // DO NOT MODIFY THIS MANUALLY IN THIS FILE
            selected_activities: []

        }
    },

    computed: {

        total_bill() {
            if (!this.selected_celeb || this.selected_activities.length === 0) {
                return null
            }


            let imgsrc = this.available_celebs[this.selected_celeb]

            let str = `
            <table border="1">
                <tr>
                    <th colspan="2">Your Fan Request</th>
                </tr>
                <tr>
                    <td>
                        <img src="${imgsrc}">
                    </td>
                    <td>${this.selected_celeb}</td>
                </tr>
            `

            var total = 0;
            for (act of this.selected_activities) {
                total += Number(act.price)
                str += `
                <tr>
                    <td>${act.name}</td>
                    <td>${act.price}</td>
                </tr>
                `
            }

            str += `
            <tr>
                <td>Total</td>
                <td>${Number(total).toFixed(2)}</td>
            </tr>
            `
            
            str += "</table>"

            return str
            
        }

    }

})

main.mount("#main")