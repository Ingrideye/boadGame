class InfoPlayer{
    
    constructor (avatar, name, health, weapon, damage, attack, defend){
        this.avatarElt   = $('#'+avatar);
        this.nameElt     = $('#'+name);
        this.healthElt   = $('#'+health);
        this.weaponElt   = $('#'+weapon);
        this.damageElt = $('#'+damage);
        this.attackElt = $('#'+attack);
        this.defendElt = $('#'+defend);
    }
    
    
    updateInfo(player){
        this.avatarElt.attr ('src', player.avatar ) ;
        this.nameElt.html(player.name);
        this.healthElt.html(player.health);
        this.weaponElt.html(player.weapon.name);
        this.damageElt.html(player.weapon.damage); 
    }
}


$('#attack').on('click', function(){  /*le click de l'attaque et la defense */
    if (board.gameIsOver){
        board.replay();
        return;
    }
    const player = board.playerWhoCanPlay;
    if (board.isPlayerNearBy(player.x, player.y)){
        player.attack(board.getOtherPlayer());
    }else {
        alert ('Vous ne pouvez pas attaquer');
    } 
});


$('#defend').on('click', function(){ 
    if (board.gameIsOver){
        board.replay();
        return;
    }
    const player = board.playerWhoCanPlay;
    if (player.defendIt === false){
        player.defendIt = true;
        board.switchTurn();
    }else {
        alert ('Vous ne pouvez pas vous défendre');
    }  
});

