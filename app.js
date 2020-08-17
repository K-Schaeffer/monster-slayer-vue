new Vue({
    el: '#app',
    data: {
        playerLife: 100,
        monsterLife: 100,
        isInMatch: false,
        logs: []
    },
    methods: {
        switchGameState(state) {
            this.isInMatch = state;
            this.playerLife = 100;
            this.monsterLife = 100;
            this.logs = [];
        },
        attack(special) {
            this.hit('monsterLife', 5, 10, special, 'Player', 'Monster', 'player');
            if (this.monsterLife > 0) {
                this.hit('playerLife', 7, 12, false, 'Monster', 'Player', 'monster');
            }
        },
        hit(property, min, max, special, source, target, style) {
            const plus = special ? 5 : 0;
            const hit = this.getRandom(min + plus, max + plus);
            this[property] = Math.max(this[property] - hit, 0);
            this.registerLog(`The ${source} attacked the ${target} dealing ${hit} points of damage`, style);
        },
        heal(min, max) {
            const heal = this.getRandom(min, max);
            this.playerLife = Math.min(this.playerLife + heal, 100);
            this.registerLog(`The Player healed ${heal} points of life`, 'player');
        },
        healAndHurt() {
            this.heal(10, 15);
            this.hit('playerLife', 7, 12, false, 'Monster', 'Player', 'monster');
        },
        getRandom(min, max) {
            const value = Math.random() * (max - min) + min;
            return Math.round(value);
        },
        registerLog(text, cls) {
            this.logs.unshift({ text, cls }); // Opposite of push
        }
    },
    computed: {
        hasResult() {
            return this.playerLife == 0 || this.monsterLife == 0;
        }
    },
    watch: {
        hasResult(value) {
            if (value) this.isInMatch = false;
        }
    }
})