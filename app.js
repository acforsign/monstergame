//write vue2 component

function randomMaker(max,min) {
    
    return Math.floor(Math.random() * (max - min)) + min;
};


const app=Vue.createApp({



data() {
    return {
        playerHealth:100,
        MonsterHealth:100,
        currentRund:0,
        
        winner:null,
    }
},

              
methods: {
    


   surrender(){

    this.winner='monster';

   },
    startNewGame(){

        this.playerHealth=100;
        this.MonsterHealth=100;
        this.currentRund=0;
        
        this.winner=null;


    },
attackToPlayer(){
    const attackValue=randomMaker(15,8);
    this.playerHealth-=attackValue;

},

attackTomonster(){
    this.currentRund++;
    const attackValue=randomMaker(12,5);
    this.MonsterHealth-=attackValue;
    this.attackToPlayer();
    

},

speciallAttack(){


    this.currentRund++;
    const attackValue=randomMaker(40,5);
    this.MonsterHealth-=attackValue;
    this.attackToPlayer();


},

healPlayer(){
    this.currentRund++;
    const healvalue=randomMaker(20,6);
if(this.playerHealth+healvalue>100){
    this.playerHealth=100;
    
}
else{
this.playerHealth+=healvalue

}
this.attackToPlayer();

}



},
computed:{


    monsterStyle(){

        if(this.MonsterHealth<0){

            return{width:'0%'};
    
            
        }

        return {width:this.MonsterHealth+'%'}
    
    },
    plaerStyle(){
    
    if(this.playerHealth<0){

        return{width:'0%'};


    }
        return {width:this.playerHealth+'%'}
    
    },
    mayUseSpecialAttack(){

        return this.currentRund %3===0;
    }
},

watch:{
playerHealth(value){
    if (value< 0 && this.MonsterHealth<=0){

        //draw
        this.winner='draw';


    }
    else if(value<=0){

//player lost 
     this.winner='monster';

    }

},

MonsterHealth(value){

if(value<= 0 && this.playerHealth<=0){

// draw
this.winner='draw';

}
else if(value<=0){

//player win  monster lost
this.winner='player';

}

}


}










})

app.mount('#game');