class Player{
    
    
    constructor(name, avatar, health, weapon){ 
        this.name       = name;
        this.avatar     = avatar;
        this.health     = health;
        this.x          = null;
        this.y          = null;
        this.type       = 'player';
        this.weapon     = weapon;   
        this.oldWeapon; 
        this.defendIt   = false; 
    }
    
    
    move(nextSquare){  /* deplacements */
        board.rows[this.y][this.x].hasBeenLeft(this); //il a quitte une position x et y
        board.rows[nextSquare.y][nextSquare.x].occupiedSquare(this); // pour une nouvelle position
        this.x           = nextSquare.x;
        this.y           = nextSquare.y;
        if (nextSquare.weapon) { //s'il se place sur une case avec une arme, il la recupere
            this.getWeaponOnSquare (nextSquare);
        }
    }   
    
    
    getWeaponOnSquare(square){  // et laisse automatiquement l'ancienne arme sur la case
        this.oldWeapon = this.weapon;
        this.weapon    = square.weapon;
    }
    
    
    attack(playerAttacked){
        const damage = this.weapon.damage;
        if (playerAttacked.defendIt){
            playerAttacked.defend(damage);
        }else {
            playerAttacked.health -= damage;
        } 
        board.isGameOver(playerAttacked); 
    } 
    
    
    defend(damage){
        const realDamage = damage /2;
        this.health     -= realDamage;
        //alert('je me defends');
        this.defendIt    = false;
    }
    
}





  