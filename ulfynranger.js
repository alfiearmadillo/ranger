var enemypos;
var myGamePiece;

function startGame() {
    myGamePiece = new component(30, 30, "red", 160, 270);
    myGamePiece.gravity = 0.5;
    myGamePiece.type="player"
    myGamePiece.range=30
    myGamePiece2 = new component(30, 30, "blue", 120, 270);
    myGamePiece2.gravity = 0.5;
    myGamePiece2.type="player"
    myGamePiece2.range=30
    myGamePiece3 = new component(30, 30, "green", 80, 270);
    myGamePiece3.gravity = 0.5;
    myGamePiece3.type="player"
    myGamePiece3.range=30
    myGamePiece4 = new component(30, 30, "yellow", 40, 270);
    myGamePiece4.gravity = 0.5;
    myGamePiece4.type="player"
    myGamePiece4.range=30
    myGameArea.start();
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

function component(width, height, color, x, y) {
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
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
        this.hitLeft();
        this.hitRight();
    }
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed=0
            this.speedX=this.speedX-this.speedX*0.3
            this.speedY=this.speedY-this.speedY*0.3
            enemypos = closestEnemy(enemy, this.x)
            if(enemy.length!==0 && this.type==="player" && enemypos.Dist>this.range){
                if(enemypos.x<this.x){
                    this.speedX=this.speedX-1
                    this.speedY=this.speedY-1
                }else{
                    this.speedX=this.speedX+1
                    this.speedY=this.speedY-1
                }
            }
            }
    }
    this.hitLeft = function() {
        var rockleft = 0;
        if (this.x < rockleft) {
            this.x = rockleft;
            this.speedX=this.speedX-this.speedX*1.5
            }
    }
    this.hitRight = function() {
        var rockRight = 930;
        if (this.x > rockRight) {
            this.x = rockRight;
            this.speedX=this.speedX-this.speedX*1.5
            }
    }
}

function closestEnemy(enemy, playerpos){
    var closest={
        x : 99999,
        Dist : 99999
    }
    for (let k = 0; k < enemy.length ; k++) {

        if(Math.abs(enemy[k].x-playerpos)<closest.Dist){
            closest.Dist=Math.abs(enemy[k].x-playerpos)
            closest.x = enemy[k].x
        } 
        if(Math.abs(enemy[k].x+playerpos)<closest.Dist){
            closest.Dist=Math.abs(enemy[k].x+playerpos)
            closest.x = enemy[k].x
        }
            
        // if (closest === playerpos) {
        //     closest = enemy[k].x;
        // } else if (enemy[k].x > playerpos && enemy[k].x <= Math.abs(closest)) {
        //     closest = enemy[k].x;
        // } else if (enemy[k].x < playerpos && - enemy[k].x < Math.abs(closest)) {
        //     closest = enemy[k].x;
        // }
    }
    return closest;
}

var move = 0
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
        }
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
        }
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
        }
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
        } 
    }
    document.onmouseup = async function(){
        document.onmousemove = function() {
        }
    }
}

document.addEventListener('keydown', logKey);
let i = 0
let enemy=[]
function logKey(e) {
  if(e.code==="KeyA"){
    enemy[i] = new component(20, 20, "purple", 480, 270);
    enemy[i].gravity = 0.5;
    i++
  }
  if(e.code==="KeyS"){
    enemy[i] = new component(20, 20, "purple", 680, 270);
    enemy[i].gravity = 0.5;
    i++
  }
}