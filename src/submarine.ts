import { getRandomNumberFromRange } from "./helpers";

export class SubmarineGame {
  playBoard: boolean[] = new Array<boolean>(100).fill(false);
  answersBoard: boolean[] = new Array<boolean>(100).fill(false);
  constructor() {
    this.fillBoard();
  }

  private fillBoard() {
    let numOfSubmarines = 0;
    while (numOfSubmarines < 10) {
      let randomCoordinate = getRandomNumberFromRange(100);
      if (!this.check(randomCoordinate)) {
        continue;
      }
      // Asign a submarine to the chosen coordinate
      this.answersBoard[randomCoordinate] = true;

      numOfSubmarines += 1;
    }
  }

  private check(coordinate: number) {
    // If the coordinate is in the first row but not in one of the edges:
    if (coordinate > 0 && coordinate < 9) {
      return !(
        this.answersBoard[coordinate - 1] ||
        this.answersBoard[coordinate] ||
        this.answersBoard[coordinate + 1] ||
        this.answersBoard[coordinate + 9] ||
        this.answersBoard[coordinate + 10] ||
        this.answersBoard[coordinate + 11]
      );
    }

    // If the coordinate is in the first row and the left edge:
    if (coordinate === 0) {
      return !(
        this.answersBoard[0] ||
        this.answersBoard[1] ||
        this.answersBoard[10] ||
        this.answersBoard[11]
      );
    }

    // If the coordinate is in the first row and the right edge:
    if (coordinate === 9) {
      return !(
        this.answersBoard[8] ||
        this.answersBoard[9] ||
        this.answersBoard[18] ||
        this.answersBoard[19]
      );
    }

    // If the coordinate is in the last row but not in one of the edges:
    if (coordinate > 90 && coordinate < 99) {
      return !(
        this.answersBoard[coordinate - 11] ||
        this.answersBoard[coordinate - 10] ||
        this.answersBoard[coordinate - 9] ||
        this.answersBoard[coordinate - 1] ||
        this.answersBoard[coordinate] ||
        this.answersBoard[coordinate + 1]
      );
    }

    // If the coordinate is in the last row and the left edge:
    if (coordinate === 90) {
      return !(
        this.answersBoard[80] ||
        this.answersBoard[91] ||
        this.answersBoard[90] ||
        this.answersBoard[91]
      );
    }

    // If the coordinate is in the last row and the right edge:
    if (coordinate === 99) {
      return !(
        this.answersBoard[88] ||
        this.answersBoard[89] ||
        this.answersBoard[98] ||
        this.answersBoard[99]
      );
    }

    // If the coordinate is in the first column but not in one of the edges:
    if (coordinate % 10 === 0) {
      return !(
        this.answersBoard[coordinate - 10] ||
        this.answersBoard[coordinate - 9] ||
        this.answersBoard[coordinate] ||
        this.answersBoard[coordinate + 1] ||
        this.answersBoard[coordinate + 10] ||
        this.answersBoard[coordinate + 11]
      );
    }

    // If the coordinate is in the last column but not in one of the edges:
    if (coordinate % 10 === 9) {
      return !(
        this.answersBoard[coordinate - 11] ||
        this.answersBoard[coordinate - 10] ||
        this.answersBoard[coordinate - 1] ||
        this.answersBoard[coordinate] ||
        this.answersBoard[coordinate + 9] ||
        this.answersBoard[coordinate + 10]
      );
    }

    // The coordinate is not on any edge:
    return !(
      this.answersBoard[coordinate - 11] ||
      this.answersBoard[coordinate - 10] ||
      this.answersBoard[coordinate - 9] ||
      this.answersBoard[coordinate - 1] ||
      this.answersBoard[coordinate] ||
      this.answersBoard[coordinate + 1] ||
      this.answersBoard[coordinate + 9] ||
      this.answersBoard[coordinate + 10] ||
      this.answersBoard[coordinate + 11]
    );
  }

  updateBoard(coordinate: number) {
    if (this.playBoard[coordinate]) {
      console.log("You cannot pick a square that's already taken");
      return;
    }

    if (this.answersBoard[coordinate]) {
      this.playBoard[coordinate] = true;
      console.log("A hit!, well done");
      return;
    }

    console.log("No submarine here");
  }

  private printBoard(board: boolean[]) {
    for (let row = 0; row < 10; row++) {
      let rowString = "";
      for (let col = 0; col < 10; col++) {
        const index = row * 10 + col;
        rowString += board[index] ? "X " : "O ";
      }
      console.log(rowString);
    }
  }

  printPlayBoard() {
    this.printBoard(this.playBoard);
  }

  printAnswersBoard() {
    this.printBoard(this.answersBoard);
  }
}
