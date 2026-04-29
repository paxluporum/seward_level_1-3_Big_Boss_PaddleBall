var canvas;
var context;
var ball;
var timer;
var interval = 1000 / 60; //60 fps
//var counter = 0;
var player1;


var score1 = 0;


var frictionX = .1;
var frictionY = .9;
var gravity = 1;


// var net;



canvas = document.getElementById("canvas");
context = canvas.getContext("2d");

ball = new GameObject(200, canvas.height / 2, 100, 100, "#ff00ff");
// ball.vx = 0; //horizontal movement
// ball.vy = 0; // vertical movement

player1 = new GameObject(canvas.width / 2, 770, 250, 40, "#00ffff");




timer = setInterval(animate, interval);

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    band();

    doHandleAcceleration();
    doHandleFriction();
    doHandleGravity();
    doUpdatePosition();
    doCheckPaddleBounds();

   // context.drawImage("ric", 100, 100, 100, 100);

    // player1.move();
    // player2.move();

    ball.move();
    //BOUNCE OFF RIGHT WALL
    if (ball.x + ball.radius > canvas.width) {
        ball.x = canvas.width - ball.radius;   // push ball back to the edge
        ball.vx *= -1;                         // reverse horizontal direction
    }

    // BOUNCE OFF LEFT WALL
    if (ball.x - ball.radius < 0) {
        ball.x = ball.radius;                  // push ball back to the edge
        ball.vx *= -1;                         // reverse horizontal direction
    }

    //BOUNCE OFF BOTTOM WALL
    if (ball.y + ball.radius > canvas.height) {
        ball.y = canvas.height - ball.radius;     // push back to edge
        ball.vy *= -1;                            // reverse vertical direction

        score1 = 0; 
    }

    // BOUNCE OFF TOP WALL
    if (ball.y - ball.radius < 0) {
        ball.y = ball.radius;                     // push back to edge
        ball.vy *= -1;
    }



    // ///////////////=============================

    // Player collision

// === BALL COLLISION WITH HORIZONTAL PADDLE (bottom paddle with gravity) ===
if (player1.collisionCheck(ball)) {
    ball.y = player1.top() - ball.radius;   // push above paddle
    ball.vy = -35;                           // upward bounce

    let halfZone = player1.width / 10;      // change the 10 for different zones

    if (ball.x < player1.x - halfZone * 2) {          // far left fifth
        (ball.vx = -20) * 5 ;
    } else if (ball.x < player1.x - halfZone) {       // left-of-center fifth
        ball.vx = -20;
    } else if (ball.x > player1.x + halfZone) {       // right-of-center fifth
        ball.vx = 20;
    } else if (ball.x > player1.x + halfZone * 2) {   // far right fifth
        (ball.vx = 20) *5 ;
    } else {
        ball.vx = 0;                                  // dead center fifth
    }

    score1++;
}


    
    player1.drawRect();
    ball.drawCircle(); 
       

    //Display
    context.fillStyle = "black";                  // text color
    context.font = "bold 16px Arial";             // text style and size
    context.fillText("Score: ", 390, 50);
    context.fillText(score1, 450, 50);  // text + position

    //Net


// console.log("Current bounces:", counter);
}


function doHandleAcceleration()
{
    if (d)
    {
        player1.vx += player1.ax * player1.force;
    }
    if (a)
    {
        player1.vx += player1.ax * -player1.force;
    }


}

function doHandleFriction()
{
    player1.vx *= frictionY;

}

 function doHandleGravity()
{
    ball.vy += gravity;

}

function doUpdatePosition()
{
    player1.x += player1.vx;
    player1.y += player1.vy;

}

function doCheckPaddleBounds() {
    // Clamp PLAYER 1 (left paddle)
    if (player1.x - player1.width / 2 < 0) {
        player1.x = player1.width / 2;      // stick to top
        player1.vx = 0;                      // stop momentum
    }
    if (player1.x + player1.width / 2 > canvas.width) {
        player1.x = canvas.width - player1.width / 2;   // stick to bottom
        player1.vx = 0;
    }


}

function band()
{
    context.save();

    context.strokeStyle = "#000000";
    context.lineWidth = 10;

    context.beginPath();
    context.moveTo(ball.x, ball.y);
    context.lineTo(player1.x, player1.y);
    context.stroke();

    context.restore();
}
