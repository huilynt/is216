const app = Vue.createApp({
    data() {
        return {
            user: null, // keep track of logged in user
        };
    },
    methods: {
        // TODO doLoginSuccess(...)
        doLoginSuccess(userInfo) {
            console.log(userInfo)
            this.user = userInfo;
        },

        // event handler for logout button
        doLogout() {
            this.user = null;
        },
    }, // methods
});

/**
 * TODO: component "my-login"
 */
app.component("my-login", {
    template: `

        <div class='input-group mb-3'>
            <span class='input-group-text' id='inputUserID'>User ID</span>
            <input type='text' class='form-control' placeholder='apple.2020' 
                aria-label='Username' aria-describedby='inputUserID'
                v-model='userid'>
        </div>
    
        <div class='input-group mb-3'>
            <span class='input-group-text' id='inputPassword'>Password</span>
            <input type='password' class='form-control' 
                aria-label='Password' aria-describedby='inputPassword'
                v-model='pwd'>
        </div>

        <button class='btn btn-primary' @click='doLogin'>Login</button>
        <hr>

        <div class='text-danger'>
            {{ message }}
        </div>
    `,
    data() {
        return {
            userid: "",
            pwd: "",
            message: "",
        };
    },

    emits: ["login"],

    methods: {
        doLogin() {
            axios
                .post("server/authenticate.php", {
                    userid: this.userid,
                    pwd: this.pwd,
                })
                .then((response) => {
                    let obj = response.data;
                    if (obj["status"]) {
                        // login succeed
                        this.pwd = "";
                        this.$emit("login", {
                            userid: this.userid,
                            name: obj["name"],
                        });

                        this.message = "";
                    } else {
                        // login fails
                        this.message = "Invalid user ID or password";
                    }
                })
                .catch((error) => {
                    this.message =
                        "Error: Unable to authenticate. HTTP status=" +
                        error.message;
                });
        },
    },
});

const vm = app.mount("#app");
