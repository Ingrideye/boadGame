class Board{
    
    constructor(width, height, boardGameId, player1, player2) {
        this.boardGame          = document.getElementById(boardGameId);
        this.width              = width;
        this.height             = height;
        this.rows               = [];
        this.blocks             = [];
        this.player1            = player1;
        this.playerWhoCanPlay   = player1;
        this.player2            = player2;
        this.dir                = [];
        this.clickableSquares   = [];
        this.gameIsOver         = false;
        this.drawBoard(); /* on execute la fonction qui sera vide */
        this.generateBlocks(15); /* on execute les obstacles et on en demande 15 */
        infoPlayer.updateInfo(this.playerWhoCanPlay);
        this.isPlayerNearBy ();
    }

    
    drawBoard() { /* on cree un tableau de 10 ranges a base de 10 carres  */
        let squareElt, rowElt, row = [], square;
    
        for (let y = 0; y < this.height; y++) {
            row              = []; /*  une range vide */
            rowElt           = document.createElement('div'); 
            rowElt.className = 'board-row';

            for (let x = 0; x < this.width; x++) {
                squareElt           = document.createElement('div'); /* on cree un carre dans le DOM */
                squareElt.className = 'board-square';
                rowElt.appendChild(squareElt);
                square              = new Square(squareElt, x, y);
                row.push(square); /* on ajoute plusieurs range l une sur l autre pour creer le tableau */
            }
            this.boardGame.appendChild(rowElt);
            this.rows.push(row);   
        }   
    }
    
    
    switchPlayerWhoCanPlay(){ /* fonction pour lancer la partie avec la joueur 1 */
        this.playerWhoCanPlay = this.getOtherPlayer();
        infoPlayer.updateInfo(this.playerWhoCanPlay);
    }
    
    
    getOtherPlayer(){ 
        if (this.playerWhoCanPlay === this.player1){
            return this.player2;
        }else {
            return this.player1;
        }
    }
    
    
    isPlayerNearBy(x, y){
        let isNearBy = false;
        let newX;
        let newY;
        ['left', 'right', 'up', 'down'].forEach (dir =>{ /* pr chaque dir (fct) nouvelle ( new) */
            newX = x ;
            newY = y ; 
            switch(dir) { /* on initalise de possibilite de tous les cotes */
                case 'left' : 
                   newX --;
                break;
                case 'right' : 
                    newX ++;
                break;
                case 'up' : 
                    newY --;               
                break;
                case 'down' : 
                    newY ++;                          
                 break;
            } 
            if (newX >= 0 && newX <= this.width-1 && newY >= 0 && newY <= this.height-1 && board.rows[newY][newX].occupier.health){
                isNearBy= true;
            }
        }); 
        return isNearBy;
    }
    
    
     generateBlocks(number) {
        let block; 
        for ( let i = 0 ; i < number ; i++) {
            block = new Block(); /* on cree les obstacles */
            this.blocks.push(block); 
        }
    }
    
    
    setClickableSquares() { 
        this.clickableSquares.forEach (square => {  /* fonction pour chaque carre cliquable */
            this.rows[square.y][square.x].notClickableAnymore(false);   
        });
        
        this.clickableSquares = []; /* on initialise un tableau vide  */
        let x                 = this.playerWhoCanPlay.x;  /* le joueur qui joue a une position x et y */
        let y                 = this.playerWhoCanPlay.y;
        let newX ; /* selon que sa position change il aura d autres cases potentiellement cliquable */
        let newY ;
        
        ['left', 'right', 'up', 'down'].forEach (dir =>{
            newX = x ;
            newY = y ;
            
            for (let i = 1; i <= 3; i++) {
                           
                switch(dir) { /* on initalise de possibilite de tous les cotes */
                    case 'left' : 
                       newX --;
                    break;
                    case 'right' : 
                        newX ++;
                    break;
                    case 'up' : 
                        newY --;               
                    break;
                    case 'down' : 
                        newY ++;                          
                     break;
                } 

                if (newX >= 0 && newX <= this.width-1 && newY >= 0 && newY <= this.height-1 && this.rows [newY][newX].occupier === false){ /*les conditions: faut que ce soit dans le board 10x10 donc de 0 a 9 en x et en y et aussi que les ranges x et y ne soit pas occupes */
                    this.clickableSquares.push(this.rows[newY][newX] ) ;
                    this.rows [newY][newX].clickable = true;
                    if(!this.rows [newY][newX].weapon ){
                        this.rows [newY][newX].elt.style.background = 'silver';
                        /* on le marquera en gris --- opacite ca serait mieux */
                    }    
                } else {
                    break;
                }
            }  
        });
    }
    
    
    disposeElts(elts) { /* la phase ou l on place les elt aleatoirement */
        let x,y,line, keeplooping, square;

        elts.forEach((elt) => {

            keeplooping = true;
            while (keeplooping){  /* pour chaque elts, il tourne en boucle jusqu a qu ils tombent sur une case vide  */
                x       = Math.round(Math.random() * (this.width  - 1)); /* fonction aleatoire */
                y       = Math.round(Math.random() * (this.height - 1));
                line    = board.rows[y]; /* la ligne correspond a un range de square */
                square  = line[x];
                if (square.empty){
                    if (!(elt.type === 'player' && this.isPlayerNearBy(x, y))) {
                        square.occupiedSquare(elt);
                        elt.x             = x;
                        elt.y             = y;
                        keeplooping       = false; /* la boucle s arrete lorsque la case est occupee */
                    }
                }
            }
        });   
    }
    
    
    isGameOver (playerAttacked){
        if (playerAttacked.health <=0){
            this.gameIsOver = true;
            alert(`${playerAttacked.name} a perdu`);
        }else {
            this.switchTurn();
        }
        
    }
    
    
    switchTurn (){
        this.switchPlayerWhoCanPlay(); 
        this.setClickableSquares(); 
    }
    
    
    replay(){
        if (confirm("Voulez-vous rejouer?")) { 
            location.reload();
        }
    }
    

    
}


