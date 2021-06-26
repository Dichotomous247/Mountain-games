function loadGame() {
    let canvas = document.getElementById("gameCanvas")
    let context = canvas.getContext("2d")

    //defining the players and bullets
    let player = {
        height: 32,
        width: 32,
        isJumping: false,
        jumps:0,
        x:0,
        y:0,
        velocityX:0,
        velocityY:0,
        lives:3
    }

    let player2 = {
        height: 32,
        width: 32,
        isJumping: false,
        jumps:0,
        x:1220-32,
        y:0,
        velocityX:0,
        velocityY:0,
        lives:3
    }

    let bullet = {
        x:player.x,
        y:player.y,
        velocityX:0,
        isFiring: false
    }

    let bullet2 = {
        x:player2.x,
        y:player2.y,
        velocityX:0,
        isFiring: false
    }

    let bulletFired = false;
    let bulletFired2 = false;

    //controller logic
    let controller = {
        left:false,
        right:false,
        up:false,
        down:false,
        listener: function (event){
            let keyState
            if(event.type === "keydown"){
                keyState = true
            }else{
                keyState = false
            }
            // left arrow detect
            if(event.keyCode === 65) {
                controller.left = keyState
            }else if (event.keyCode === 87){
                controller.up = keyState
            }else if(event.keyCode === 68){
                controller.right = keyState
            }else if(event.keyCode === 83){
                controller.down = keyState
            }else if(event.keyCode === 70 && !bullet.isFiring){
                bulletFired=true
                bullet.x=player.x
                bullet.y=player.y
                bullet.isFiring=true
            }
        }
    }

    let controller2 = {
        left:false,
        right:false,
        up:false,
        down:false,
        listener: function (event){
            let keyState
            if(event.type === "keydown"){
                keyState = true
            }else{
                keyState = false
            }
            // left arrow detect
            if(event.keyCode === 37) {
                controller2.left = keyState

            }else if (event.keyCode === 38){
                controller2.up = keyState
            }else if(event.keyCode === 39){
                controller2.right = keyState
            }else if(event.keyCode === 40){
            controller2.down = keyState
            }else if(event.keyCode === 191 && !bullet2.isFiring){
                bulletFired2=true
                bullet2.x=player2.x
                bullet2.y=player2.y
                bullet2.isFiring=true
            }
        }
    }
  
    function loop(){
        if(controller.up&&!player.isJumping&&(player.y===338+200||player.y===202+200||player.y===72+200)){
            player.isJumping=true
            player.velocityY-=35
            console.log(player.y)
        }
 

        if(controller.left){
            player.velocityX-=0.8
        }

        if(controller.right){
            player.velocityX+=0.8
        }
  
        // move player down to bottom
        player.velocityY+=1.5
        player.x+=player.velocityX
        player.y+=player.velocityY
        player.velocityX*=0.9
        player.velocityY*=0.9

        if(controller2.up&&!player2.isJumping&&((player2.y<214+200&&(player2.x>244-player2.width&&player2.x<976))||player2.y===338+200)){
            player2.isJumping=true
            player2.velocityY-=35
        }

        if(controller2.left){
            player2.velocityX-=0.8
        }

        if(controller2.right){
            player2.velocityX+=0.8
        }
 
        player2.velocityY+=1.5
        player2.x+=player2.velocityX
        player2.y+=player2.velocityY
        player2.velocityX*=0.9
        player2.velocityY*=0.9
 
        if(player.y>338+200){
            player.isJumping=false
            player.y=338+200
            player.velocityY=0
            player.jumps=0
        }
 
        if((player.y>202+200&&player.y<214+200)&&((player.x>244-player.width&&player.x<488)||(player.x>732-player.width&&player.x<976))){
            player.isJumping=false
            player.y=202+200
            player.velocityY=0
            player.jumps=0
            console.log("hello world")
        }
 
        if(player.jumps===1){
            isJumping===false
            console.log("hello moon")
        }
  
        if((player.y>66+200&&player.y<78+200)&&(player.x>488-player.width&&player.x<732)){
            player.isJumping=false
            player.y=72+200
            player.velocityY=0
            player.jumps=0
            console.log("hello jupiter")
        }

        if(!controller.up&&player.y===72+200&&(player.x>488-player.width&&player.x<732)){
            player.isJumping=false
        }

        if((player2.y>202+200&&player2.y<214+200)&&((player2.x>244-player2.width&&player2.x<488)||(player2.x>732-player2.width&&player2.x<976))){
            player2.isJumping=false
            player2.y=202+200
            player2.velocityY=0
            player2.jumps=0
            console.log("hello mars")
        }

        if((player2.y>66+200&&player2.y<78+200)&&(player2.x>488-player2.width&&player2.x<732)){
            player2.isJumping=false
            player2.y=72+200
            player2.velocityY=0
            player2.jumps=0
        }
  
        if(player2.y>338+200){
            player2.isJumping=false
            player2.y=338+200
            player2.velocityY=0
        }

        if(player.x<0){
            player.x=0
        }else if(player.x>1220-32){
            player.x=1220-32
        }

        if(player2.x<0){
            player2.x=0
        }else if(player2.x>1220-32){
            player2.x=1220-32
        }

        // Creates the backdrop for each frame 
        context.fillStyle = "#201A23"; 
        context.fillRect(0, 0, 1220, 400+200); // x, y, width, height

        // Creates and fills the cube for each frame 
        context.fillStyle = "#8DAA9D"; // hex for cube color
        context.beginPath(); 
        context.rect(player.x, player.y, player.width, player.height); 
        context.fill();


        //player 1 bullet drawing
        if(bulletFired && bullet.isFiring){
            // Drawing bullet
            context.fillStyle = "red"; // hex for cube color
            context.beginPath();

            if (player.x > player2.x) {
                context.rect(bullet.x - 22, bullet.y, 20, 5); 
                bullet.velocityX=-30;
            } else {
                context.rect(bullet.x + 42, bullet.y, 20, 5); 
                bullet.velocityX=30
            }

            context.fill();
            bullet.x+=bullet.velocityX
        }

        //check if bullet is gone from canvas
        if(bullet.x<0||bullet.x>1220){
            bullet.isFiring=false
        }

        //player2 bullet drawing
        if(bulletFired2 && bullet2.isFiring){
            // Drawing bullet
            context.fillStyle = "red"; // hex for cube color
            context.beginPath();

            if (player2.x > player.x) {
                context.rect(bullet2.x - 22, bullet2.y, 20, 5); 
                bullet2.velocityX=-30;
            } else {
                context.rect(bullet2.x + 42, bullet2.y, 20, 5); 
                bullet2.velocityX=30
            }

            context.fill();
            bullet2.x+=bullet2.velocityX
        }

        //check if bullet is gone from canvas
        if(bullet2.x<0||bullet2.x>1220){
            bullet2.isFiring=false
        }

        
        // check for bullet and player collision

        //player 1 shooting player 2
        if (player.x < player2.x) { // bullet moving right
            if (bullet.x > player2.x && bullet.x < player2.x + 32 && bullet.y === player2.y) {
                player2.lives--;
            }
        } else { // bullet moving left
            if (bullet.x < player2.x && bullet.x > player2.x - 32 && bullet.y === player2.y) {
                player2.lives--;
            }
        }

        if(player2.lives===0){
            alert("Player 1 Wins!")
            player2.lives = 3;
            window.location.reload();
        }

         //player 2 shooting player 1
        if (player2.x < player.x) { // bullet moving right
            if (bullet2.x > player.x && bullet2.x < player.x + 32 && bullet2.y === player.y) {
                player.lives--;
            }
        } else { // bullet moving left
            if (bullet2.x < player.x && bullet2.x > player.x - 32 && bullet2.y === player.y) {
                player.lives--;
            }
        }

        if(player.lives===0){
            alert("Player 2 Wins!")
            player.lives = 3;
            window.location.reload();
        }

        document.getElementById('player2Lives').innerHTML = `Player 2: ${player2.lives} Lives`;
        document.getElementById('player1Lives').innerHTML = `Player: ${player.lives} Lives`;
  
        context.fillStyle = "#66b3ff"; // hex for cube color
        context.beginPath(); 
        context.rect(player2.x, player2.y, player2.width, player2.height); 
        context.fill();
  
        // Creates the "ground" for each frame 
        context.strokeStyle = "#2E2532"; 
        context.lineWidth = 30; 
        context.beginPath(); 
        context.moveTo(0, 385+200); 
        context.lineTo(1220, 385+200); 
        context.stroke();

        context.strokeStyle = "#2E2532"; 
        context.lineWidth = 12; 
        context.beginPath(); 
        context.moveTo(244, 240+200); 
        context.lineTo(488, 240+200); 
        context.stroke();
    
        context.strokeStyle = "#2E2532"; 
        context.lineWidth = 12; 
        context.beginPath(); 
        context.moveTo(488, 110+200); 
        context.lineTo(732, 110+200); 
        context.stroke();
    
        context.strokeStyle = "#2E2532"; 
        context.lineWidth = 12; 
        context.beginPath(); 
        context.moveTo(732, 240+200); 
        context.lineTo(976, 240+200); 
        context.stroke();

        window.requestAnimationFrame(loop)
    }

    window.addEventListener("keydown", controller.listener)
    window.addEventListener("keyup", controller.listener)
    window.addEventListener("keydown", controller2.listener)
    window.addEventListener("keyup", controller2.listener)

    window.requestAnimationFrame(loop)
}

function home(){
    window.location.href = "./index.html"
}
