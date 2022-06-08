//constructors for player, enemy, item
//items with drop chances to enemy, coins, healing, attacks
//function to roll enemy drops
//players dying
//stages
//heal and revive area
//shop
//world map
var nearTarget=0
var myGamePiece;
//let dmgNum=[]
let items=[]
let droppedItem = []
let div = document.createElement("div");
div.setAttribute("id", "container")
document.body.insertBefore(div, document.body.childNodes[0])
let divcontainer = document.getElementById("container")
let emptySlot = -1
let money = 0

function startGame() {
    myGamePiece = new component(30, 30, "red", 160, 270);
    myGamePiece.gravity = 0.5;
    myGamePiece.type="player"
    myGamePiece.name="Raphael"
    myGamePiece.maxhp=100
    myGamePiece.hp=100
    myGamePiece.atkCD=0
    myGamePiece.item=items[0]
    myGamePiece2 = new component(30, 30, "blue", 120, 270);
    myGamePiece2.gravity = 0.5;
    myGamePiece2.type="player"
    myGamePiece2.name="Donatello"
    myGamePiece2.hp=100
    myGamePiece2.maxhp=100
    myGamePiece2.atkCD=0
    myGamePiece2.item=items[0]
    myGamePiece3 = new component(30, 30, "green", 80, 270);
    myGamePiece3.gravity = 0.5;
    myGamePiece3.type="player"
    myGamePiece3.name="Michaelangelo"
    myGamePiece3.hp=100
    myGamePiece3.maxhp=100
    myGamePiece3.atkCD=0
    myGamePiece3.item=items[0]
    myGamePiece4 = new component(30, 30, "yellow", 40, 270);
    myGamePiece4.gravity = 0.5;
    myGamePiece4.type="player"
    myGamePiece4.name="Master Splinter"
    myGamePiece4.hp=100
    myGamePiece4.maxhp=100
    myGamePiece4.atkCD=0
    myGamePiece4.item=items[0]
    myGameArea.start();
}

items[0]={name:"None",damageMin:10,damageMax:10,range:11,atkRate:100,maxSummons:0,lifeSteal:0,defence:0,type:"None", colour:'#b4b4b4'}
items[1]={name:"Test Sword",damageMin:2,damageMax:4,range:40,atkRate:50,maxSummons:0,lifeSteal:0,defence:0,type:"Sword", colour:'#a83232'}
items[2]={name:"Test Shield",damageMin:1,damageMax:1,range:20,atkRate:100,maxSummons:0,lifeSteal:0,defence:1,type:"Shield", colour:'#75a832'}
items[3]={name:"Test Bow",damageMin:1,damageMax:3,range:160,atkRate:66,maxSummons:0,lifeSteal:0,defence:0,type:"Bow", colour:'#634f1c'}
items[4]={name:"Test Staff",damageMin:0,damageMax:1,range:200,atkRate:200,maxSummons:1,lifeSteal:0,defence:0,type:"Staff", colour:'#660033'}

function addItem(player, itemID){
    switch(player){
        case 0:
            player=myGamePiece4
            break;
        case 1:
            player=myGamePiece3
            break;
        case 2:
            player=myGamePiece2
            break;
        case 3:
            player=myGamePiece
            break;
        default:
            break;
    }
    player.item=items[itemID]
}

let buttonsToMake=12
let inv = []
let pIcons = []
makeButtons(buttonsToMake);

function makeButtons(count){
    for(p=0;p<count;p++){
        if(p<4){
            pIcons[p]=document.createElement("div");
            pIcons[p].classList.add("pIcon")
            pIcons[p].setAttribute("id", `icon${p}`)
            divcontainer.insertBefore(pIcons[p], divcontainer.firstChild)
        }
        inv[p] = document.createElement("button");
        inv[p].classList.add('button')
        inv[p].setAttribute("onmousedown", `clickButton(${p})`)
        inv[p].setAttribute("id", `${p}`)
        divcontainer.appendChild(inv[p]);
    }
}

for(n=0;n<buttonsToMake;n++){
    inv[n]={
        invSlot:n,
        storedItem:0,
    }
}

for(n=0;n<buttonsToMake;n++){
document.getElementById(n).addEventListener("mouseover", makeButtonLight);
function makeButtonLight(){
    if(this.style.background==="rgb(180, 180, 180)" || this.style.background===""){
    this.style.background='#d2d2d2'
    }
}
document.getElementById(n).addEventListener("mouseout", makeButtonDark);
function makeButtonDark(){
    if(this.style.background==="rgb(210, 210, 210)"||this.style.background===""){
    this.style.background='#b4b4b4'
    }
}
}

//inventory stuff area
let lastslot= -1
let tmpObj

// if(inv.findIndex(thing => thing.storedItem===4)>-1){ //change this to for, add colour to item
// document.getElementById(inv.findIndex(thing => thing.storedItem===4)).style.background='#660033'
// }

for(e=0;e<inv.length;e++){
    document.getElementById(e).style.background=items[inv[e].storedItem].colour
}


function clickButton(num){
    
    if(lastslot>-1){
    tmpObj=inv[num].storedItem
    inv[num].storedItem=inv[lastslot].storedItem
    inv[lastslot].storedItem=tmpObj
    tmpObj=null
    console.log(inv[num])
    if(lastslot<4){
        addItem(lastslot, inv[lastslot].storedItem)
    }
    lastslot=-1
    for(x=0;x<inv.length;x++){
        document.getElementById(x).style.background='#b4b4b4'
        document.getElementById(x).style.borderColor='#8a8a8a'
    } 
    }else{
    lastslot = num
    document.getElementById(lastslot).style.borderColor='#7a7bb7'
    }
    if(num<4){
        addItem(num, inv[num].storedItem)
    }
    for(e=0;e<inv.length;e++){
        document.getElementById(e).style.background=items[inv[e].storedItem].colour
    }
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 960;
        this.canvas.height = 540;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function randomDmg(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }


function component(width, height, color, x, y) {//draw new boxes
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        if(this.type==="enemy"){
            ctx.fillStyle = "red";
            ctx.fillRect(this.x, this.y-15, 20, 4);
            ctx.fillStyle = "green";
            ctx.fillRect(this.x, this.y-15, (this.hp/this.maxhp)*20, 4);
        }
        if(this.type==="player"){
            ctx.fillStyle = "red";
            ctx.fillRect(this.x, this.y-15, 30, 4);
            ctx.fillStyle = "green";
            ctx.fillRect(this.x, this.y-15, (this.hp/this.maxhp)*30, 4);
        }
    }
    this.newPos = function() {//find new positions
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;

        if(this.type==="player"){
            for(b=0;b<droppedItem.length;b++){
                if(Math.abs(droppedItem[b].x - this.x) < 50 &&
                (Math.abs(droppedItem[b].y - this.y) < 50)){

                    emptySlot=inv.findIndex(element => element.storedItem===0 && element.invSlot>3)

                    if(droppedItem[b].data.type==="coin"){
                        money=money+droppedItem[b].data.value
                        droppedItem.splice(b, 1)
                    }else if(droppedItem[b].data.type==="health"){
                        this.hp=this.hp+droppedItem[b].data.value
                        if(this.hp>this.maxhp){
                            this.hp=this.maxhp
                        }
                        droppedItem.splice(b, 1)
                    }else if(droppedItem[b].data.type==="item"){
                        if(emptySlot!==-1){
                            inv[emptySlot].storedItem=droppedItem[b].data.value
                            droppedItem.splice(b, 1)
                            for(e=0;e<inv.length;e++){
                                document.getElementById(e).style.background=items[inv[e].storedItem].colour
                            }


                        }
                    }
                }
            }
        }

        this.hitBottom();
        this.hitLeft();
        this.hitRight();
    }

//let h=0;

    this.hitBottom = function() {//floor bounce
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed=0
            this.speedX=this.speedX-this.speedX*0.3
            this.speedY=this.speedY-this.speedY*0.3
            if(this.type==="player"){
            nearTarget = closestEnemy(enemy, this.x)//logic to do only while on floor
            if(enemy.length!==0){
                if (Math.abs(enemy[nearTarget].x - this.x) < this.item.range &&
                   (Math.abs(enemy[nearTarget].y - this.y) < this.item.range)) {
                    
                if(this.atkCD<=0){
                    // if(this.item.pierce!==0){
                    //     for(m=0;m<this.item.pierce;m++){
                    //         if  (Math.abs(enemy[m].x - this.x) < this.range&&
                    //             (Math.abs(enemy[m].y - this.y) < this.range)) {
                    //             enemy[m].hp=enemy[m].hp-1
                    //         }
                    //     }
                    // } else {
                    enemy[nearTarget].hp=enemy[nearTarget].hp-randomDmg(this.item.damageMin, this.item.damageMax)
                    // }
                    // dmgNum[h]=new component(5, 20, "blue", this.x, this.y);
                    // dmgNum[h].gravity = -0.5;
                    // dmgNum[h].lifetime = 100;
                    // h++
                    this.atkCD=this.item.atkRate
                }else{
                    this.atkCD=this.atkCD-1
                }

                if(enemy[nearTarget].hp<=0){//enemy drops to 0 hp
                    
                    if(Object.keys(enemy[nearTarget].drops).length>0){ //enemy dropping items

                        lootRoll=Math.random()*100
                        if(enemy[nearTarget].drops.coinChance!==0){
                            if(lootRoll<enemy[nearTarget].drops.coinChance){
                                console.log("dropped coin")
                                droppedItem[droppedItem.length] = new component(15, 15, "gold", enemy[nearTarget].x, enemy[nearTarget].y);
                                droppedItem[droppedItem.length-1].data={
                                    type:"coin",
                                    value:enemy[nearTarget].drops.coin
                                }
                                droppedItem[droppedItem.length-1].gravity = 0.5;
                                droppedItem[droppedItem.length-1].speedX=(Math.random()*6)-3
                                droppedItem[droppedItem.length-1].speedY=-Math.random()*9
                            }
                        }
                        lootRoll=Math.random()*100
                        if(enemy[nearTarget].drops.healChance!==0){
                            if(lootRoll<enemy[nearTarget].drops.healChance){
                                console.log("dropped hp")
                                droppedItem[droppedItem.length] = new component(15, 15, "#ff756b", enemy[nearTarget].x, enemy[nearTarget].y);
                                droppedItem[droppedItem.length-1].data={
                                    type:"health",
                                    value:enemy[nearTarget].drops.healPotion
                                }
                                droppedItem[droppedItem.length-1].gravity = 0.5;
                                droppedItem[droppedItem.length-1].speedX=(Math.random()*3)-1.5
                                droppedItem[droppedItem.length-1].speedY=-Math.random()*9
                            }
                        }
                        lootRoll=Math.random()*100
                        if(enemy[nearTarget].drops.itemID1Chance!==0){
                            if(lootRoll<enemy[nearTarget].drops.itemID1Chance){
                                console.log("dropped item 1")
                                droppedItem[droppedItem.length] = new component(15, 15, items[enemy[nearTarget].drops.itemID1].colour, enemy[nearTarget].x, enemy[nearTarget].y);
                                droppedItem[droppedItem.length-1].data={
                                    type:"item",
                                    value:enemy[nearTarget].drops.itemID1
                                }
                                droppedItem[droppedItem.length-1].gravity = 0.5;
                                droppedItem[droppedItem.length-1].speedX=(Math.random()*6)-3
                                droppedItem[droppedItem.length-1].speedY=-Math.random()*9
                            }
                        }
                        lootRoll=Math.random()*100
                        if(enemy[nearTarget].drops.itemID2Chance!==0){
                            if(lootRoll<enemy[nearTarget].drops.itemID2Chance){
                                console.log("dropped item 2")
                                droppedItem[droppedItem.length] = new component(15, 15, items[enemy[nearTarget].drops.itemID2].colour, enemy[nearTarget].x, enemy[nearTarget].y);
                                droppedItem[droppedItem.length-1].data={
                                    type:"item",
                                    value:enemy[nearTarget].drops.itemID2
                                }
                                droppedItem[droppedItem.length-1].gravity = 0.5;
                                droppedItem[droppedItem.length-1].speedX=(Math.random()*6)-3
                                droppedItem[droppedItem.length-1].speedY=-Math.random()*9
                            }
                        }
                        lootRoll=Math.random()*100
                        if(enemy[nearTarget].drops.itemID3Chance!==0){
                            if(lootRoll<enemy[nearTarget].drops.itemID3Chance){
                                console.log("dropped item 3")
                                droppedItem[droppedItem.length] = new component(15, 15, items[enemy[nearTarget].drops.itemID3].colour, enemy[nearTarget].x, enemy[nearTarget].y);
                                droppedItem[droppedItem.length-1].data={
                                    type:"item",
                                    value:enemy[nearTarget].drops.itemID3
                                }
                                droppedItem[droppedItem.length-1].gravity = 0.5;
                                droppedItem[droppedItem.length-1].speedX=(Math.random()*6)-3
                                droppedItem[droppedItem.length-1].speedY=-Math.random()*9
                            }
                        }
                        lootRoll=Math.random()*100
                        if(enemy[nearTarget].drops.itemID4Chance!==0){
                            if(lootRoll<enemy[nearTarget].drops.itemID4Chance){
                                console.log("dropped item 4")
                                droppedItem[droppedItem.length] = new component(15, 15, items[enemy[nearTarget].drops.itemID4].colour, enemy[nearTarget].x, enemy[nearTarget].y);
                                droppedItem[droppedItem.length-1].data={
                                    type:"item",
                                    value:enemy[nearTarget].drops.itemID4
                                }
                                droppedItem[droppedItem.length-1].gravity = 0.5;
                                droppedItem[droppedItem.length-1].speedX=(Math.random()*6)-3
                                droppedItem[droppedItem.length-1].speedY=-Math.random()*9
                            }
                        }

                    enemy.splice(nearTarget,1)
                    i=enemy.length 
                    }
                }
            }else{
            if(enemy.length!==0){//if not in range move towards
                if (Math.abs(enemy[nearTarget].x - this.x) < this.item.range+350&&
                   (Math.abs(enemy[nearTarget].y - this.y) < this.item.range+350)){
                if(enemy[nearTarget].x<this.x){
                    this.speedX=this.speedX-Math.random()
                    this.speedY=this.speedY-Math.random()*2
                }else{
                    this.speedX=this.speedX+Math.random()
                    this.speedY=this.speedY-Math.random()*2
                }
            }
            }
        }
    }
}
            }
    }
    this.hitLeft = function() {//bounce off left wall
        var rockleft = 0;
        if (this.x < rockleft) {
            this.x = rockleft;
            this.speedX=this.speedX-this.speedX*1.5
            }
    }
    this.hitRight = function() {//bounce off right wall
        var rockRight = 930;
        if (this.x > rockRight) {
            this.x = rockRight;
            this.speedX=this.speedX-this.speedX*1.5
            }
    }
}

function closestEnemy(enemy, playerpos){//finding closesnt enemy to given coordinate
    var closest={
        x : 99999,
        Dist : 99999
    }
    var indexLoop = 0
    for (let k = 0; k < enemy.length ; k++) {

        if(Math.abs(enemy[k].x-playerpos)<closest.Dist){
            closest.Dist=Math.abs(enemy[k].x-playerpos)
            closest.x = enemy[k].x
            indexLoop=k
        } 
        if(Math.abs(playerpos-enemy[k].x)<closest.Dist){
            closest.Dist=Math.abs(playerpos-enemy[k].x)
            closest.x = enemy[k].x
            indexLoop=k
        }
    }
    return indexLoop;
}

var move = 0//updating all entities each frame
function updateGameArea() {
    myGameArea.clear();
    myGameArea.frameNo += 1;
    myGamePiece.newPos();
    myGamePiece.update();
    myGamePiece2.newPos();
    myGamePiece2.update();
    myGamePiece3.newPos();
    myGamePiece3.update();
    myGamePiece4.newPos();
    myGamePiece4.update();
    for(r=0;r<droppedItem.length;r++){
    droppedItem[r].newPos()
    droppedItem[r].update()
    }
    // for(j=0;j<dmgNum.length;j++){
    // dmgNum[j].lifetime=dmgNum[j].lifetime-1
    // dmgNum[j].update()
    // dmgNum[j].newPos()
    // if(dmgNum[j].lifetime<=0){
    //     dmgNum.splice(0,1)
    // }
    // }

    for(j=0;j<enemy.length;j++){
        move = Math.floor(Math.random() * 100);
        if(move===4 ){
            enemy[j].x=enemy[j].x+1
        }
        if(move===5 || move === 17){
            enemy[j].x=enemy[j].x-1
        }
        
        enemy[j].update()
        enemy[j].newPos()
    }

}

var pointerX = -1;
    var pointerY = -1;
    var blockToMouseX
    var blockToMouseY
    

drag()
function drag(){
    document.onmousedown = function(event){
        pointerX = event.pageX-15-(window.innerWidth-960)/2;
        pointerY = event.pageY-15-(window.innerHeight-540)/2;
        blockToMouseX = Math.abs(myGamePiece.x+15-pointerX)
        blockToMouseY = Math.abs(myGamePiece.y+15-pointerY)
        block2ToMouseX = Math.abs(myGamePiece2.x+15-pointerX)
        block2ToMouseY = Math.abs(myGamePiece2.y+15-pointerY)
        block3ToMouseX = Math.abs(myGamePiece3.x+15-pointerX)
        block3ToMouseY = Math.abs(myGamePiece3.y+15-pointerY)
        block4ToMouseX = Math.abs(myGamePiece4.x+15-pointerX)
        block4ToMouseY = Math.abs(myGamePiece4.y+15-pointerY)
        if(blockToMouseX<30 && blockToMouseY<30){
        document.onmousemove = function(event) {
            pointerX = event.pageX-15-(window.innerWidth-960)/2;
        pointerY = event.pageY-15-(window.innerHeight-540)/2;
            blockToMouseX = Math.abs(myGamePiece.x-pointerX)
            blockToMouseY = Math.abs(myGamePiece.y-pointerY)
            if(myGamePiece.x<pointerX){
                myGamePiece.speedX = blockToMouseX/8
            };
            if(myGamePiece.x>pointerX){
                myGamePiece.speedX = -blockToMouseX/8
            };
            if(myGamePiece.y<pointerY){
                myGamePiece.speedY = blockToMouseY/8
            };
            if(myGamePiece.y>pointerY){
                myGamePiece.speedY = -blockToMouseY/8
            };
            
            myGamePiece.gravitySpeed = 0
            }
        }//dragging p1
        if(block2ToMouseX<30 && block2ToMouseY<30){
            document.onmousemove = function(event) {
                pointerX = event.pageX-15-(window.innerWidth-960)/2;
        pointerY = event.pageY-15-(window.innerHeight-540)/2;
                block2ToMouseX = Math.abs(myGamePiece2.x-pointerX)
                block2ToMouseY = Math.abs(myGamePiece2.y-pointerY)
                if(myGamePiece2.x<pointerX){
                    myGamePiece2.speedX = block2ToMouseX/8
                };
                if(myGamePiece2.x>pointerX){
                    myGamePiece2.speedX = -block2ToMouseX/8
                };
                if(myGamePiece2.y<pointerY){
                    myGamePiece2.speedY = block2ToMouseY/8
                };
                if(myGamePiece2.y>pointerY){
                    myGamePiece2.speedY = -block2ToMouseY/8
                };
                
                myGamePiece2.gravitySpeed = 0
                }
        }//dragging p2
        if(block3ToMouseX<30 && block3ToMouseY<30){
            document.onmousemove = function(event) {
                pointerX = event.pageX-15-(window.innerWidth-960)/2;
        pointerY = event.pageY-15-(window.innerHeight-540)/2;
                block3ToMouseX = Math.abs(myGamePiece3.x-pointerX)
                block3ToMouseY = Math.abs(myGamePiece3.y-pointerY)
                if(myGamePiece3.x<pointerX){
                    myGamePiece3.speedX = block3ToMouseX/8
                };
                if(myGamePiece3.x>pointerX){
                    myGamePiece3.speedX = -block3ToMouseX/8
                };
                if(myGamePiece3.y<pointerY){
                    myGamePiece3.speedY = block3ToMouseY/8
                };
                if(myGamePiece3.y>pointerY){
                    myGamePiece3.speedY = -block3ToMouseY/8
                };
                
                myGamePiece3.gravitySpeed = 0
                }
        }//dragging p3
        if(block4ToMouseX<30 && block4ToMouseY<30){
            document.onmousemove = function(event) {
                pointerX = event.pageX-15-(window.innerWidth-960)/2;
        pointerY = event.pageY-15-(window.innerHeight-540)/2;
                block4ToMouseX = Math.abs(myGamePiece4.x-pointerX)
                block4ToMouseY = Math.abs(myGamePiece4.y-pointerY)
                if(myGamePiece4.x<pointerX){
                    myGamePiece4.speedX = block4ToMouseX/8
                };
                if(myGamePiece4.x>pointerX){
                    myGamePiece4.speedX = -block4ToMouseX/8
                };
                if(myGamePiece4.y<pointerY){
                    myGamePiece4.speedY = block4ToMouseY/8
                };
                if(myGamePiece4.y>pointerY){
                    myGamePiece4.speedY = -block4ToMouseY/8
                };
                
                myGamePiece4.gravitySpeed = 0
                }
        }//dragging p4
    }
    document.onmouseup = async function(){
        document.onmousemove = function() {
        }
    }
}


document.addEventListener('keydown', logKey);//enemy spawning
let i = 0
let enemy=[]
function logKey(e) {
  if(e.code==="KeyA"){
    enemy[i] = new component(20, 20, "purple", 480, 270);
    enemy[i].gravity = 0.5;
    enemy[i].hp=10
    enemy[i].maxhp=enemy[i].hp
    enemy[i].type="enemy"
    enemy[i].item=items[0]
    enemy[i].drops={
        coin:1,
        coinChance:20,
        healPotion:10,
        healChance:10,
        itemID1:1,
        itemID1Chance:10,
        itemID2:2,
        itemID2Chance:10,
        itemID3:3,
        itemID3Chance:10,
        itemID4:4,
        itemID4Chance:10
    }
    i++
  }
  if(e.code==="KeyS"){
    enemy[i] = new component(20, 20, "purple", 680, 270);
    enemy[i].gravity = 0.5;
    enemy[i].hp=100
    enemy[i].maxhp=enemy[i].hp
    enemy[i].type="enemy"
    enemy[i].item=items[0]
    enemy[i].drops={
        coin:1,
        coinChance:20,
        healPotion:10,
        healChance:10,
        itemID1:1,
        itemID1Chance:10,
        itemID2:2,
        itemID2Chance:10,
        itemID3:3,
        itemID3Chance:10,
        itemID4:4,
        itemID4Chance:10
    }
    i++
  }
}

// document.addEventListener("click", wipeInvActives);
// function wipeInvActives(){
//     test = inv.findIndex(element => element.storedItem=2)
//     document.getElementById(test).style.background='#660033'

// for(x=0;x<inv.length;x++){
//     inv[x].active=0
// }
// }