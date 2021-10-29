const app = Vue.createApp({
    data() {
        return {
            // list1: ["1a", "1b", "1c", "1d", "1e", "1f"],
            // list2: ["2a", "2b", "2c"],

            fruits1: [
                "apple",
                "orange",
                "pear",
                "papaya",
                "rambutan",
                "durian",
            ],
            fruits2: ["starfruit", "jackfruit"],

            personList1: [
                "Alfred",
                "Betty",
                "Cathy",
                "Desmond",
                "Ellen",
                "Fred",
                "George",
                "Hans",
            ],
            personList2: [
                "Irene",
                "Julie",
                "Katty",
                "Leonard",
                "Margaret",
                "Norman",
            ],
        };
    }, // data
});

app.component("two-lists", {
    props: [
        "size",
        "width",
        "left-title",
        "left-list",
        "right-title",
        "right-list",
    ],
    data() {
        return {
            leftSelected: [],
            rightSelected: [],
        };
    },
    template: `<span>            
            <table :style='{"width":width}' >
                <tr>
                    <td style='width: 40%' >
                        <strong>{{leftTitle}}</strong>
                        <select :size='size' style='width: 100%' multiple v-model='leftSelected'>
                            <option v-for="item in leftList"> {{item}} </option>
                        </select>
                    </td>
                    <td style='vertical-align: middle; text-align: center; width: 20%'>
                        <button  @click='leftToRight()'> &gt;&gt; </button><br>
                        <button  @click='rightToLeft()'> &lt;&lt; </button><br>
                    </td>
                    <td style='width: 40%' >
                        <strong>{{rightTitle}}</strong>
                        <select :size='size' style='width: 100%' multiple v-model='rightSelected'>
                            <option v-for="item in rightList"> {{item}} </option>
                        </select>
                    </td>
                </tr>
            </table>
        </span>`,
    methods: {
        leftToRight() {
            for (item of this.leftSelected) {
                let i = this.leftList.indexOf(item);
                this.leftList.splice(i, 1);

                this.rightList.push(item);
            }

            // clear
            this.leftSelected.splice(0, this.leftSelected.length);
        }, // leftToRight

        rightToLeft() {
            for (item of this.rightSelected) {
                let i = this.rightList.indexOf(item);
                this.rightList.splice(i, 1);

                this.leftList.push(item);
            }

            // clear
            this.rightSelected.splice(0, this.rightSelected.length);
        }, // rightToLeft
    }, // methods
});

const vm = app.mount("#app");
