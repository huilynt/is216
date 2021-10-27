const app = Vue.createApp({
  data() {
    return {
      user: null, // keep track of logged in user
    };
  },
  methods: {
    // TODO doLoginSuccess(...)
    doLoginSuccess(userinfo) {
      this.user = userinfo;
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
  props: [],

  emits: ["login"],

  data() {
    return {
      uid: "",
      pwd: "",
      msg: "",
    };
  },

  template: `<div>
        <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">Default</span>
            <input type="text" v-model="uid" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="apple.2020">
        </div>

        <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">Default</span>
            <input type="password" v-model="pwd" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
        </div>

        <button type="button" class="btn btn-primary" @click="doLogin">Login</button>
        <hr>
        <div v-html="msg"></div>
    </div>`,

  methods: {
    doLogin() {
      axios
        .post("./server/authenticate.php", { userid: this.uid, pwd: this.pwd })
        .then((res) => {
          if (res.data.status) {
            console.log("Login success");
            var user = { userid: res.data.userid, name: res.data.name };
            this.$emit("login", user);
          } else {
            console.log("Login fail");
            this.msg = "<p class='text-danger'>Invalid user ID or password</p>";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});

const vm = app.mount("#app");
