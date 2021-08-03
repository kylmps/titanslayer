function getRandomValue(min,max){
    return Math.floor(Math.random() * (max-min)) + min;
}

const app = Vue.createApp({
    data(){
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: [],
            image: '',
        };
    },
    methods: {
        startGame(){
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.winner = null;
            this.logMessages = [];
            this.image = '';
        },
        attackMonster(){
            this.currentRound++;
            const attackValue = getRandomValue(5,12);
            this.monsterHealth -= attackValue;
            this.addLogMessage('player', 'attack', attackValue);
            this.attackPlayer();
            this.image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmzjx1wd2l8JXpnEt7Qop0xoPdMmNE7ah4bw&usqp=CAU';
        },
        attackPlayer(){
            const attackValue = getRandomValue(8,15);
            this.playerHealth -= attackValue;
            this.addLogMessage('monster', 'attack', attackValue);
        },
        specialAttackMonster(){
            this.currentRound++;
            const attackValue = getRandomValue(10,25);
            this.monsterHealth -= attackValue;
            this.addLogMessage('player', 'sp.attack', attackValue);
            this.attackPlayer();
            this.image = 'https://itakon.it/wp-content/uploads/2020/11/AOTseason4-1-450x257.jpg';
        },
        healPlayer(){
            this.currentRound++;
            const healValue = getRandomValue(8,20);
            if (this.playerHealth + healValue > 100){
                this.playerHealth = 100;
            }else{
            this.playerHealth += healValue;
            }
            this.addLogMessage('player', 'heal', healValue);
            this.attackPlayer();
            this.image = 'https://static.wikia.nocookie.net/9097767b-b34e-4926-bb38-7421fbc1c7c4';
        },
        surrender(){
            this.winner = 'monster';
            this.image = 'https://qph.fs.quoracdn.net/main-qimg-a8731f096a150134ebbb3a076f785bc6';
        },
        addLogMessage(who, what, value){
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            });
        }
    },
    computed: {
        monsterBarStyles(){
            if (this.monsterHealth < 0){
                return { width: '0%'};
            }
            return { width: this.monsterHealth + '%'};
        },
        playerBarStyles(){
            if (this.playerHealth < 0){
                return { width: '0%'};
            }
            return { width: this.playerHealth + '%'};
        },
        mayUseSpecialAttack(){
            return this.currentRound % 3 !== 0;
        }
    },
    watch: {
        playerHealth(value){
            if(value <= 0 && this.monsterHealth <=0){
                // draw
                this.winner = 'draw';
                this.image = 'https://media.distractify.com/brand-img/IGaar-cjZ/0x0/mikasa-ackerman-1618602719019.png';
            } else if (value <=0){
                // lost
                this.winner = 'monster';
                this.image = 'https://qph.fs.quoracdn.net/main-qimg-a8731f096a150134ebbb3a076f785bc6';
            }
        },
        monsterHealth(value){
            if(value <= 0 && this.playerHealth <=0){
                // draw
                this.winner = 'draw';
                this.image = 'https://media.distractify.com/brand-img/IGaar-cjZ/0x0/mikasa-ackerman-1618602719019.png';
            }else if(value <=0){
                // player win
                this.winner = 'player';
                this.image = 'https://animesoldier.com/wp-content/uploads/2019/12/AOT-S3-Levi-BeastTitan.jpg';
            }
        }
    }
})

app.mount('#game');