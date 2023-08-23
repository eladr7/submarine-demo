import { SubmarineGame } from "./src/submarine";

const main = () => {
  const game = new SubmarineGame();
  game.printAnswersBoard();
  for (let i = 0; i < 99; i++) {
    game.updateBoard(i);
    game.printBoard();
  }
};

main();
