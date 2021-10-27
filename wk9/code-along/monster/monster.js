const app = Vue.createApp({
  data() {
    return {
      statusList: [
        {
          msg: "Game hasn't started",
          style: "text-dark",
        },
      ],
      listStrengths: [10, 20, 30, 40, 50, 60, 70],
      gameStarted: false,
      player: {
        health: 100,
        strength: 20,
      },
      monster: {
        health: 100,
        strength: 30,
      },
      buttonDetails: [
        {
          action: "attack",
          btnType: "btn btn-danger",
          spacing: "mx-2",
          value: "ATTACK",
        },
        {
          action: "specialAttack",
          btnType: "btn btn-warning",
          spacing: "mx-2",
          value: "SPECIAL ATTACK",
        },
        {
          action: "heal",
          btnType: "btn btn-success",
          spacing: "mx-2",
          value: "HEAL",
        },
        {
          action: "giveUp",
          btnType: "btn btn-link",
          spacing: "mx-2",
          value: "GIVE UP",
        },
      ],
    };
  },

  methods: {
    start() {
      console.log(" Game has started!");
      this.gameStarted = true;
    },

    doAction(action) {
      this[action]();
    },

    attack() {
      console.log("attack");

      var mDmg = Math.floor(Math.random() * this.player.strength);
      this.monster.health -= mDmg;

      var newStatus = {
        msg: "You caused " + mDmg + " to monster.",
        style: "text-dark",
      };
      this.statusList.push(newStatus);

      if (this.monster.health <= 0) {
        console.log("You win");

        newStatus = {
          msg: "Player win",
          style: "text-success",
        };
        this.statusList.push(newStatus);

        this.monster.health = 0;
      } else {
        var pDmg = Math.floor(Math.random() * this.monster.strength);
        this.player.health -= pDmg;

        newStatus = {
          msg: "Monster caused " + pDmg + " to player.",
          style: "text-danger",
        };
        this.statusList.push(newStatus);

        if (this.player.health <= 0) {
          console.log("Monster win");

          newStatus = {
            msg: "Monster win",
            style: "text-muted",
          };
          this.statusList.push(newStatus);
          this.player.health = 0;
        }
      }
    },

    specialAttack() {
      console.log("special attack");
    },

    heal() {
      console.log("heal");
    },

    giveUp() {
      console.log("give up");
    },
  },
});
const vm = app.mount("#app");
