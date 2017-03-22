new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function () {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function () {
            var max = 10;
            var min = 3;
            var damage = this.calculateDamage(min, max);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'The Player hits the Monster for ' + damage
            });
            if (this.checkWin()) {
                return;
            }

            this.monsterAttacks(5, 12);
        },
        specialAttack: function () {
            var max = 20;
            var min = 10;
            var damage = this.calculateDamage(min, max);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'The Player hits hard the Monster for ' + damage
            });
            if (this.checkWin()) {
                return;
            }

            this.monsterAttacks(5, 12);
        },
        heal: function () {
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'The Player heals for 10'
            });
            this.monsterAttacks(5, 12);
        },
        giveUp: function () {
            this.gameIsRunning = false;
        },
        monsterAttacks: function(min, max) {
            damage = this.calculateDamage(min, max);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: 'The Monster hits the Player for ' + damage
            });
            this.checkWin();
        },
        calculateDamage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function () {
            if (this.monsterHealth <= 0) {
                if (confirm('You won! New game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('You lost! New game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
});
