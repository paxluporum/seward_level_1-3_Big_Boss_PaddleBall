function GameObject(x, y, w, h, color) {
    // set up player starting point

    //set up X
    if (x == undefined) 
        {
        this.x = canvas.width / 2;
        }
    else 
        {
        this.x = x;
        }

    /// set up Y
    if (y == undefined) 
        {
        this.y = canvas.height / 2;
        }
    else {
        this.y = y;
        }

    /// Set up width
    if (w == undefined) 
        {
        this.width = 100;
        }

    else 
        {
        this.width = w;
        }

    //// set up height
    if (h == undefined) 
        {
        this.height = 100;
        }

    else 
        {
        this.height = h;
        }

    if (color==undefined)
    {
        this.color = "rgba(255, 0, 0, 1)";
    }

    else
    {
        this.color = color;
    }
        // set up player dimensions
       this.radius = 50; // DO I NEED THIS ANYMORE!!!!????

/// BOUNDING BOX

this.left = function()
{
    return this.x - this.width/2
}

this.right = function()
{
    return this.x + this.width/2
}

this.top = function()
{
    return this.y - this.height/2
}

this.bottom = function()
{
    return this.y + this.height/2
}

this.prevX = this.x; //for walls and shit- moves player back
////////////////////////

///////Set UP PHYSICS
this.force = 1;
this.ax = 1; // horizontal acceleration
this.ay = 1; // vert acceleration

    /// set up player color
    //this.color = "rgba(255, 0, 0, 1)"

    // set up player velocity
    this.vx = 0;
    this.vy = 0;

    this.drawRect = function () {
        context.save();
        context.fillStyle = this.color;
        context.translate(this.x,this.y);
        context.fillRect((-this.width/2), (-this.height/2), this.width, this.height);
        context.restore();
    }

    this.drawCircle = function()
    {
        context.save();
            context.fillStyle = this.color;
            context.beginPath();
            context.translate(this.x, this.y);
            context.arc(0,0,this.width/2,0,360 * Math.PI/180, true);
            context.closePath();
            context.fill();
        context.restore();
    }

    this.move = function () {
        this.x += this.vx;
        this.y += this.vy;
    }

    this.collisionCheck = function(obj)
    {
        if 
        (
            this.left() < obj.right() &&
            this.right() > obj.left() &&
            this.top() < obj.bottom() &&
            this.bottom() > obj.top()
        )
        {
            return true;
        }
       return false;
    }


}