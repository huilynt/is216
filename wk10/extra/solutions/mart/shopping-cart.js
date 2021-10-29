/**
 * shopping-cart
 */
app.component("shopping-cart", {
    props: ["button_label", "cart_items"],
    template: `
        <div>
            <h3>Cart</h3>
            <table class='table table-dark'>
            <thead>
                <tr>
                    <th scope='col'>Name</th>
                    <th scope='col'>Price</th>
                    <th scope='col'>Qty</th>
                    <th scope='col'>Sub-Total</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for='cartItem in cart_items'>
                    <td>{{cartItem.name}}</td>
                    <td>\${{cartItem.price}}</td>
                    <td>{{cartItem.quantity}}</td>
                    <td>{{(cartItem.price * cartItem.quantity).toFixed(2)}}</td>
                </tr>
            </tbody>
            </table>
            <p class='text-info'>
                Total \${{cartTotalPrice.toFixed(2)}}
            </p>
            <button 
                v-if='cart_items.length > 0'
                class='btn btn-primary'
                @click='doClick'
            >{{button_label}}</button>
        </div>
    `,

    emits: ["click"],

    computed: {
        cartTotalPrice() {
            let total = 0;
            for (cartItem of this.cart_items) {
                total += cartItem.price * cartItem.quantity;
            }
            return total;
        },
    },

    methods: {
        doClick() {
            this.$emit("click");
        },
    },
});
