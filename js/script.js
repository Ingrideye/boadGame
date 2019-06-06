let infoPlayer   = new InfoPlayer('avatar', 'name', 'health', 'weapon', 'damage');

const player1    = new Player ('Aasbjorn', '../image/boat-r.png', 100, rock);
const player2    = new Player ('Thorsten', '../image/boat-y.png', 100, rock);

const players    = [ player1 , player2]; /* on les place dans un tableau */ 
const weapons    = [ rock , sword , hammer , dragon]; /* les armes sont dans un tableau */

const board      = new Board(10, 10, 'board-game', player1, player2); 


board.disposeElts (board.blocks);
board.disposeElts (weapons);
board.disposeElts (players);
board.setClickableSquares(); 