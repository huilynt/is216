const app = Vue.createApp({
    data() {
        return {
            gameStarted: false,
            buttonSpecialAttack: null,
            buttonDetails: [
                {
                    action: "attack",
                    btnType: "btn-danger",
                    value: "ATTACK",
                    show: true,
                },
                {
                    action: "specialAttack",
                    btnType: "btn-warning",
                    value: "SPECIAL ATTACK",
                    show: true,
                },
                {
                    action: "heal",
                    btnType: "btn-success",
                    value: "HEAL",
                    show: true,
                },
                {
                    action: "giveUp",
                    btnType: "btn-link",
                    value: "GIVE UP",
                    show: true,
                },
            ],
            myHealth: 100,
            monsterHealth: 100,
            statusList: [
                {
                    class: "text-dark",
                    text: "Game hasn't started.",
                },
            ],
            range: [10, 20, 30, 40, 50],
            MONSTER_MAX_ATTACK: 30,
            PLAYER_MAX_ATTACK: 20,
            MAX_HEAL: 30,
            specialAttackCoolDown: 0,
        };
    },

    created() {
        for (details of this.buttonDetails) {
            if (details.action == "specialAttack") {
                this.buttonSpecialAttack = details;
                return;
            }
        }
    },

    computed: {
        reversestatusList() {
            return this.statusList.slice(0).reverse();
        },
    },
    methods: {
        doAction(action) {
            this[action]();
        },

        start() {
            // console.log("do start");
            this.gameStarted = true;
            this.myHealth = 100;
            this.monsterHealth = 100;

            this.specialAttackCoolDown = 0;
            this.buttonSpecialAttack.show = true;

            this.statusList = [
                {
                    class: "text-dark",
                    text: "Game has started",
                },
            ];
        },

        doMonster() {
            if (this.monsterHealth > 50 || Math.random() < 0.5) {
                // attack
                var myDmg = Math.floor(Math.random() * this.MONSTER_MAX_ATTACK);
                this.myHealth -= myDmg;
                this.statusList.push({
                    class: "text-danger",
                    text:
                        "Monster attacked and you suffered " +
                        myDmg +
                        " points",
                });

                if (this.myHealth < 0) {
                    this.myHealth = 0;
                    this.statusList.push({
                        class: "text-muted",
                        text: "You lose. Game ends.",
                    });
                    this.gameStarted = false;
                }
                return;
            }

            // heal
            var heal = Math.floor(Math.random() * this.MAX_HEAL);
            this.monsterHealth += heal;
            if (this.monsterHealth > 100) this.monsterHealth = 100;
            this.statusList.push({
                class: "text-warning",
                text: "Monster heals itself with " + heal + " points.",
            });
        },

        doAttack(special) {
            // console.log("do attack");
            var maxMultiplier = 1;
            if (special) maxMultiplier = 2;
            var monsterDmg = Math.floor(
                Math.random() * maxMultiplier * this.PLAYER_MAX_ATTACK
            );
            this.monsterHealth -= monsterDmg;

            var specialTxt = "";
            if (special) specialTxt = "(special)";

            this.statusList.push({
                class: "text-dark",
                text:
                    "You attacked " +
                    specialTxt +
                    " and monster suffered " +
                    monsterDmg +
                    " points.",
            });

            if (this.monsterHealth < 0) {
                this.monsterHealth = 0;
                this.statusList.push({
                    class: "text-success",
                    text: "You win. Game ends.",
                });
                this.gameStarted = false;
            }
        },

        decrementCooldown() {
            if (this.specialAttackCoolDown == 0) return;

            // cool down greater than zero
            this.specialAttackCoolDown--;
            if (this.specialAttackCoolDown == 0) {
                this.buttonSpecialAttack.show = true;
            }
        },

        attack() {
            this.doAttack(false);
            if (this.monsterHealth > 0) this.doMonster();
            this.decrementCooldown();
        },

        specialAttack() {
            this.doAttack(true);
            if (this.monsterHealth > 0) this.doMonster();

            this.specialAttackCoolDown = 2;
            this.buttonSpecialAttack.show = false;
        },

        heal() {
            // console.log("do heal");
            var heal = Math.floor(Math.random() * this.MAX_HEAL);
            this.myHealth += heal;
            if (this.myHealth > 100) this.myHealth = 100;

            this.statusList.push({
                class: "text-primary",
                text: "You heal yourself with " + heal + " points.",
            });

            this.doMonster();
            this.decrementCooldown();
        },

        giveUp() {
            // console.log("do giveUp");
            this.gameStarted = false;
            this.statusList.push({
                class: "text-dark",
                text: "You ran away. Game ends.",
            });
        },
    },
});
const vm = app.mount("#app");
