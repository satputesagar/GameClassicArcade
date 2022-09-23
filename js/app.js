function randomNumber(max,min){
    return Math.floor(Math.random() * (max -min +1) + min);
}

// collisions between player and enemy

function checkCollision(enemy,player){
    return(
        player.x >enemy.x - enemy.hitBox.x /2 
    && player.x < enemy.x + enemy.hitBox.x /2 
    && player.y > enemy.y - enemy.hitBox.y /2 
    && player.y < enemy.y + enemy.hitBox.y /2
    );
}

// Enimies our player must avoid

var Enemy =function(x,y,sprite){
    this.x=x;
    this.y=y;
    

    this.sprite ='img/enemy-bug.png';
    this.speed=randomNumber(300,500);
};

Enemy.prototype.update=function(dt){

    if(this.x <=505){
        this.x +=this.speed *dt;
    }else{
        this.x=-45;
        this.speed =randomNumber(300,500);
    }
    if(checkCollision(this,player)){
        alert("Oops!! please try again!!");
        player.reset();
    }
};


// Draw the enemy on the screen required method for game
Enemy.prototype.render=function(){
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};
Enemy.prototype.hitBox={'x':101,'y':83};



var Player =function(){
    this.x=200;
    this.y=400;
    this.sprite='img/char-boy.png';
};

Player.prototype.update=function(){
    var stepX=101;
    var stepY=83;
    switch(this.action){
        case 'up':
            this.y-=stepY;
            break;
        case 'down':
            if(this.y <= 317){
                this.y+=stepY;
            }
            break;
        case 'left':
            if(this.x >= 99){
                this.x -=stepX;

            }
            break;
    }
    if(this.y <0){
        alert("congratutions !! you have won");
        this.reset();
    }
    this.action =null;
};

// 
// Draw the player on the screen, required method for game
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// a handleInput() method.
Player.prototype.handleInput = function (e) {
    this.action = e;
};

// Reset the game
Player.prototype.reset = function () {
    this.x = 200;
    this.y = 400;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(-100, 60), new Enemy(-75, 145), new Enemy(-50, 230)];
// Place the player object in a variable called player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


