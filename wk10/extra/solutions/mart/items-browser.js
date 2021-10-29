/**
 * items-browser
 */
app.component("items-browser", {
    props: ["button_label"],
    template: `
        <div>
            <label for="categories">Categories</label>
            <select class="form-control" id="categories" 
                v-model="selected_category" @change="getItems" >
                <option
                    v-for="category in categories"
                >{{category}}</option>
            </select>

            <div v-if="items.length > 0">

                <table class="table">
                <thead class="table-dark">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Sub-Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in items">
                        <td>{{item.name}}</td>
                        <td>\${{item.price}}</td>
                        <td>
                            <input type="number" min="0" v-model.number="item.quantity" style="width:50px;" >
                        </td>
                        <td>
                            \${{(item.price * item.quantity).toFixed(2)}}
                        </td>
                    </tr>
                </tbody>
                </table>

                <button
                    class="btn btn-primary"
                    @click="doClick"
                >{{button_label}}</button>
            </div>

            <p v-else>
                No item.
            </p>
        </div>
    `,
    data() {
        return {
            selected_category: "",
            categories: [],
            items: [],
        };
    },

    emits: ["click"],

    created() {
        axios.get("server/getCategories.php").then((response) => {
            this.categories = response.data;
            this.selected_category = this.categories[0];
            this.getItems();
        });
    },
    methods: {
        getItems() {
            // this approach results in an ajax request per change
            // it may be a lot of exchanges over the network; depending on the actual user behaviour.
            // if the list is not too large,
            //  another approach is to have getAll API to preload all categories=>items.
            axios
                .get(
                    "server/getItems.php?category=" +
                        encodeURIComponent(this.selected_category)
                )
                .then((response) => {
                    this.items = response.data;
                    for (item of this.items) {
                        item.quantity = 0;
                    }
                });
        },

        doClick() {
            let itemsToAdd = [];
            for (let i = 0; i < this.items.length; i++) {
                let item = this.items[i];
                if (item.quantity > 0) {
                    let clone = Object.assign({}, item);
                    itemsToAdd.push(clone); // clone then push

                    item.quantity = 0;
                    this.items[i] = item;
                }
            }

            this.$emit("click", itemsToAdd);
        },
    },
});
