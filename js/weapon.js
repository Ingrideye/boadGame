class Weapon {

    constructor (name, avatar, damage) { /* on lui donne des attribut avec le constructor */
        this.name       = name;
        this.avatar     = avatar;
        this.damage     = damage;
        this.type       = 'weapon';     
    }                   
}

/* les armes du jeu */
let rock    = new Weapon ('Pierres', '../image/rock.png', 5);
let sword   = new Weapon ('Epe', '../image/sword.png', 15);
let hammer  = new Weapon ('Marteau', '../image/hammer.png', 25);
let dragon  = new Weapon ('Dragon', '../image/dragon.png', 45);
