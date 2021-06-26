function loadGame() {
    let canvas = document.getElementById("gameCanvas")

    let context = canvas.getContext("2d")

    let frameCount = 1

    let obstacleCoordinates = []

    document.getElementById("score").innerHTML = 'Level: 0'


    function nextFrame(){
        
        if(obstacleCoordinates.length===10){
            window.location.href = "game_won.html";
        }
        frameCount+=1

        let increment = 1;
        let whileLoopMaxIterations = 0;
        while(true){
            let objectCoord=Math.floor(Math.random()*(1165-140+1)+140)
    
           let isValidPosition = true
    
            for(let i=0; i<obstacleCoordinates.length; i++){
                if(objectCoord === obstacleCoordinates[i] ||
                    (objectCoord<obstacleCoordinates[i]&&objectCoord-obstacleCoordinates[i]>-100)||
                    (objectCoord>obstacleCoordinates[i]&&objectCoord-obstacleCoordinates[i]<100)){
                    isValidPosition=false
                }
            }

            if(isValidPosition){
                whileLoopMaxIterations = 0;
                increment++;
                obstacleCoordinates.push(objectCoord)
                document.getElementById("score").innerHTML = `Level: ${obstacleCoordinates.length}`
                break
            }

            if (increment === 10 || whileLoopMaxIterations === 50000) {
                window.location.href = "game_won.html";
                break
            }

            whileLoopMaxIterations++;
        }
    }

    //defining the player
    let player = {
        height: 32,
        width: 32,
        isJumping: false,
        x:0,
        y:0,
        velocityX:0,
        velocityY:0
    }

    //controller logic
    let controller = {
        left:false,
        right:false,
        up:false,
        listener: function (event){
            let keyState 
            if(event.type === "keydown"){
                keyState = true
            }else{
                keyState = false
            }

            // left arrow detect
            if(event.keyCode === 37) {
                controller.left = keyState
            }else if (event.keyCode === 38){
                controller.up = keyState
            }else if(event.keyCode === 39){
                controller.right = keyState
            }
        }
    }

    function loop(){
        if(controller.up&&!player.isJumping){
            player.isJumping=true
            player.velocityY-=20
        }
        if(controller.left){
            player.velocityX-=0.5
        }
        if(controller.right){
            player.velocityX+=0.5
        }

        player.velocityY+=1.5
        player.x+=player.velocityX
        player.y+=player.velocityY
        player.velocityX*=0.9
        player.velocityY*=0.9

        if(player.y>338){
            player.isJumping=false
            player.y=338
            player.velocityY=0
        }
        if(player.x<0){
            player.x=0
        }else if(player.x>1220){
            player.x=-20
            nextFrame();
        }

        // Creates the backdrop for each frame  
        context.fillStyle = "#201A23";  
        context.fillRect(0, 0, 1220, 400); // x, y, width, height

        // Creates and fills the cube for each frame  
        context.fillStyle = "#8DAA9D"; // hex for cube color 
        context.beginPath();  
        context.rect(player.x, player.y, player.width, player.height);  
        context.fill();

        let triangleHeight = 200*Math.cos(Math.PI/6)

        context.fillStyle = "fbf5f3"
        for(let i=0; i<obstacleCoordinates.length; i++){

        let currentLocation = obstacleCoordinates[i]

        if (
            player.isJumping &&
            player.y > 310 &&
            player.x + 32 >= currentLocation + 10 && player.x <= currentLocation + 10
        ) {
            window.location.href = 'game_over.html'
        }

        // only care about x collision on ground
        if(
            !player.isJumping &&
            ((player.x + 28 >= currentLocation && player.x < currentLocation) ||
            (player.x + 28 > currentLocation + 20 && player.x <= currentLocation + 20))
        ) {
            window.location.href = "game_over.html";
        }

        context.beginPath();
        context.moveTo(currentLocation, 385);
        context.lineTo(currentLocation+20, 385);
        context.lineTo(currentLocation+10, 510-triangleHeight)
        context.closePath();
        context.fill();
    }

    // Creates the "ground" for each frame  
    context.strokeStyle = "#2E2532";  
    context.lineWidth = 30;  
    context.beginPath();  
    context.moveTo(0, 385);  
    context.lineTo(1220, 385);  
    context.stroke();

    window.requestAnimationFrame(loop)
    }

    window.addEventListener("keydown", controller.listener)
    window.addEventListener("keyup", controller.listener)
    window.requestAnimationFrame(loop)

}
 function playAgain(){
     window.location.href = "index.html"
 }

 function home(){
    window.location.href = "./index.html"
}
