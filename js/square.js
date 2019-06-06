class Square{

    
	constructor(elementHTML, x, y) {
		this.init(elementHTML, x, y);
        this.empty     = true; /* le carre est vide */
        this.clickable = false; 
        this.occupier  = false;
	}

    
	init(elementHTML, x, y) { /* on lui donne une valeur x et y */
		this.elt  = elementHTML;
		this.x    = x;
		this.y    = y;
		this.clickHandler(); // on lance cette fonction qui cree un event cliquable
        this.elt.style.backgroundImage = 'url(../image/water.png)';
    }

    
	clickHandler(){
		$(this.elt).on('click', e=> {
            if (board.gameIsOver){
                board.replay();
                return;
            }
			if (this.clickable === true){
                board.playerWhoCanPlay.move(this);
                board.switchTurn();
            }
		});
	}
  
    
    occupiedSquare(occupier) { /* pour eviter que les elts se superposent */
        this.occupier     = occupier;
        if (occupier.type === "weapon" ){ 
            this.weapon   = occupier;
            this.occupier = false;    
        }
        this.elt.style.backgroundImage = 'url('+ occupier.avatar +')';
        this.elt.style.backgroundColor = 'white';
        this.empty                     = false;   
    }
    
    
    hasBeenLeft(player) {
        this.notClickableAnymore (true);
        this.occupier = false;
        if (this.weapon) {
            this.occupiedSquare(player.oldWeapon); //laisser l'arme quand on quitte la case
        }
    }
    
    
    notClickableAnymore(playerHasLeft) {
        this.elt.style.backgroundSize = '50px 50px ';
        this.clickable                = false; 
        if ((playerHasLeft === true || this.occupier === false) && !this.weapon){
            this.elt.style.backgroundImage = 'url("../image/water.png")'; 
        }     
    }
    
}