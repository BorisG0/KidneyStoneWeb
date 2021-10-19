var handCardSize = 140;
var handCardSizeY = handCardSize * Math.sqrt(2);
var handCardGap = 5;
var creatureSize = 110;
var creatureSizeY = creatureSize * Math.sqrt(2);
var creatureGap = 10;
var player1, player2;
var canvas, ctx;
var selectedHandCard = -1;


function startGame(){
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;


    var imgLogo = document.getElementById("KidneyStoneLogoImage");
    var logoSizeX = 1536/2;
    var logoSizeY = 724/2;
    ctx.drawImage(imgLogo, (canvas.width / 2) - (logoSizeX / 2), 10, logoSizeX, logoSizeY);
    
    ctx.font = '50px serif';

    //drawCard(goblinCard,10,10,130);

    player1 = new Player("kek");
    player2 = new Player("lol");

    //ctx.fillText(player1.hand[0].name, 100, 100)
    //drawCard(player1.hand[0], 0, 500, 130);
    repaint();
    
}


function repaint(){
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    drawActiveHand(player1.hand);
    drawPassiveHand(player2.hand);
    drawActiveCreatures(player1.creatures);
    drawPassiveCreatures(player2.creatures);
    if(selectedHandCard != -1) drawHandCardSelection();
}

function drawHandCardSelection(){
    ctx.drawImage(document.getElementById("SelectedImage"), handCardGap + selectedHandCard * (handCardSize + handCardGap), canvas.height - handCardSizeY - handCardGap, handCardSize, handCardSizeY);
}


function drawActiveHand(hand){

    for(let i = 0; i < hand.length; i++){
        drawCard(hand[i], (handCardSize + handCardGap ) * i + handCardGap, canvas.height - handCardSizeY - handCardGap, handCardSize);
    }
}

function drawPassiveHand(hand){

    for(let i = 0; i < hand.length; i++){
        //drawCard(hand[i], (handCardSize + handCardGap ) * i + handCardGap, canvas.height - handCardSize * Math.sqrt(2) - handCardGap, handCardSize);
        ctx.drawImage(document.getElementById("BackSideImage"), (handCardSize + handCardGap ) * i + handCardGap, handCardGap, handCardSize, handCardSizeY);
    }
}

function drawActiveCreatures(creatures){

    for(let i = 0; i < creatures.length; i++){
        drawCard(creatures[i], (creatureSize + creatureGap ) * i + creatureGap, canvas.height - handCardSizeY - handCardGap - creatureSizeY - creatureGap, creatureSize);
    }
}

function drawPassiveCreatures(creatures){

    for(let i = 0; i < creatures.length; i++){
        drawCard(creatures[i], (creatureSize + creatureGap ) * i + creatureGap, handCardSizeY + handCardGap + creatureGap, creatureSize);
    }
}

function drawCard(card, x, y, size){
    ctx.drawImage(card.image, x, y, size, size * Math.sqrt(2));
}

function drawCreature(creature, x, y, size){
    ctx.drawImage(creature.image, x, y, size, size * Math.sqrt(2));
}

function mouseClicked(event){
    var x = event.clientX;     // Get the horizontal coordinate
    var y = event.clientY;     // Get the vertical coordinate

    //ctx.drawImage(document.getElementById("CardGoblinImage"), x, y, 200, 200 * Math.sqrt(2));

    if(y >= (canvas.height - handCardSize * Math.sqrt(2) - handCardGap)){
        selectedHandCard = Math.trunc(x / (handCardSize + handCardGap));
        
    }
    repaint();
}

class Card{
    constructor(name, image, cost){
        this.name = name;
        this.image = image;
        this.cost = cost;

    }
}

class Creature{
    constructor(name, image, attack, defense){
        this.name = name;
        this.image = image;
        this.attack = attack;
        this.defense = defense;
    }
}

class CardGoblin extends Card{
    constructor(){
        super("CardGoblin", document.getElementById("CardGoblinImage"), 2);
    }
}

class CreatureGoblin extends Creature{
    constructor(){
        super("Goblin", document.getElementById("CreatureGoblinImage"), 1, 2);
    }
}

class Player{
    constructor(name){
        this.name = name;
        this.hand = [];
        this.hand.push(new CardGoblin());
        this.hand.push(new CardGoblin());
        this.hand.push(new CardGoblin());

        this.creatures = [];
        this.creatures.push(new CreatureGoblin());
        this.creatures.push(new CreatureGoblin());
    }

}