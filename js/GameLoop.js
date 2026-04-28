var canvas;
var context;
var ball;
var timer;
var interval = 1000 / 60; //60 fps
//var counter = 0;
var player1;
var player2;

var score1 = 0;
var score2 = 0;

var frictionX = .5;
var frictionY = .8;
var gravity = 1;

var img=document.getElementById("ric");
var net;



canvas = document.getElementById("canvas");
context = canvas.getContext("2d");

ball = new GameObject(200, canvas.height / 2, 100, 100, "#00ff00");
ball.vx = -4; //horizontal movement
ball.vy = 0; // vertical movement

player1 = new GameObject(100, canvas.height / 2, 25, 100, "#8400ff5e");
player2 = new GameObject(924, canvas.height / 2, 25, 100, "#ff0000");

net = new GameObject(canvas.width / 2, canvas.height / 2, 20, 800, "#ffc527" )

// npc1 = new GameObject(300, canvas.height / 2, 100, 100, "#00ffff");
// npc2 = new GameObject(600, canvas.height / 2, 100, 100, "#1900ff");
// npc3 = new GameObject(900, canvas.height / 2, 100, 100, "#ff00ff");

timer = setInterval(animate, interval);

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    doHandleAcceleration();
    doHandleFriction();
    // doHandleGravity();
    doUpdatePosition();
    doCheckPaddleBounds();

   // context.drawImage("ric", 100, 100, 100, 100);

    // player1.move();
    // player2.move();

    ball.move();
    // BOUNCE OFF RIGHT WALL
    // if (ball.x + ball.radius > canvas.width) {
    //     ball.x = canvas.width - ball.radius;   // push ball back to the edge
    //     ball.vx *= -1;                         // reverse horizontal direction
    // }

    // // BOUNCE OFF LEFT WALL
    // if (ball.x - ball.radius < 0) {
    //     ball.x = ball.radius;                  // push ball back to the edge
    //     ball.vx *= -1;                         // reverse horizontal direction
    // }

    //BOUNCE OFF BOTTOM WALL
    if (ball.y + ball.radius > canvas.height) {
        ball.y = canvas.height - ball.radius;     // push back to edge
        ball.vy *= -1;                            // reverse vertical direction
    }

    // BOUNCE OFF TOP WALL
    if (ball.y - ball.radius < 0) {
        ball.y = ball.radius;                     // push back to edge
        ball.vy *= -1;
    }

    //////////////////////// Losing Condition

    if (ball.x - ball.radius < 0) {
        ball.x = canvas.width / 2; // respawns in middle
        ball.vx *= -1; // when respawning ball goes away from paddle
        score2 = score2 + 1;
    }

    if (ball.x - ball.radius > 1024) {
        ball.x = canvas.width / 2;
        ball.vx *= -1;
        score1= score1 + 1;
    }


    // ///////////////=============================

    // Player collision

// === BALL COLLISION WITH BOTH PADDLES ===
    if (player1.collisionCheck(ball)) {
        ball.x = player1.right() + ball.radius;
        ball.vx *= -1;

        if (ball.y < player1.y - player1.height / 6) {
            ball.vy = -4;      // top third → up
        }
        else if (ball.y > player1.y + player1.height / 6) {
            ball.vy = 4;       // bottom third → down
        }
        else {
            ball.vy = 0;       // middle third → straight
        }
    }

    if (player2.collisionCheck(ball)) {
        ball.x = player2.left() - ball.radius;    // push to the left of right paddle
        ball.vx *= -1;

        if (ball.y < player2.y - player2.height / 6) {
            ball.vy = -4;
        }
        else if (ball.y > player2.y + player2.height / 6) {
            ball.vy = 4;
        }
        else {
            ball.vy = 0;
        }
    }
    

    // Reverse the horizontal velocity 
    // //NPC1 collision stuff
    // if (npc1.collisionCheck(ball)) {
    //     npc1.color = "#bbff00";
    // }
    // ////////////=====================
    // //NPC2 collision stuff
    // if (npc2.collisionCheck(ball)) {
    //     context.strokeRect(npc2.x - npc2.width / 2, npc2.y - npc2.height / 2, npc2.width, npc2.height);
    // }

    // //NPC3 collision
    // if (npc3.collisionCheck(ball)) {
    //     ball.x = ball.prevX
    // }
    // else 
    // {
    //     ball.prevX = ball.x;
    // }
    net.drawRect();
    player1.drawRect();
    player2.drawRect();
    //ball.drawCircle(); // everything above this does not visually appear untul this function is called
    context.drawImage(img, 
                  ball.x - ball.width / 2,   // center horizontally
                  ball.y - ball.height / 2,  // center vertically
                  ball.width,                // width of the image
                  ball.height);              // height of the image
    // npc1.drawCircle();
    // npc2.drawCircle();
    // npc3.drawRect();

    //Display
    context.fillStyle = "black";                  // text color
    context.font = "bold 28px Arial";             // text style and size
    context.fillText("Player 1 || Player 2", 390, 50);
    context.fillText(score1 + " - " + score2, 485, 100);  // text + position

    //Net


// console.log("Current bounces:", counter);
}


function doHandleAcceleration()
{
    if (s)
    {
        player1.vy += player1.ay * player1.force;
    }
    if (w)
    {
        player1.vy += player1.ay * -player1.force;
    }

    if (down)
    {
        player2.vy += player2.ay * player2.force;
    }
    if (up)
    {
        player2.vy += player2.ay * -player2.force;
    }



}

function doHandleFriction()
{
    player1.vy *= frictionY;
    player2.vy *= frictionY;
}

// function doHandleGravity()
// {
//     player1.vy += gravity;

// }

function doUpdatePosition()
{
    player1.x += player1.vx;
    player1.y += player1.vy;
    player2.x += player2.vx;
    player2.y += player2.vy;
}

function doCheckPaddleBounds() {
    // Clamp PLAYER 1 (left paddle)
    if (player1.y - player1.height / 2 < 0) {
        player1.y = player1.height / 2;      // stick to top
        player1.vy = 0;                      // stop momentum
    }
    if (player1.y + player1.height / 2 > canvas.height) {
        player1.y = canvas.height - player1.height / 2;   // stick to bottom
        player1.vy = 0;
    }

    // Clamp PLAYER 2 (right paddle)
    if (player2.y - player2.height / 2 < 0) {
        player2.y = player2.height / 2;
        player2.vy = 0;
    }
    if (player2.y + player2.height / 2 > canvas.height) {
        player2.y = canvas.height - player2.height / 2;
        player2.vy = 0;
    }
}

//function doJump()
// {
//     if (w)
//     {
//         player1.vy = -20;
//     }

//     if (!w && player1.vy >= 0)
//     {
//         player1.vy = -40;
//     }
