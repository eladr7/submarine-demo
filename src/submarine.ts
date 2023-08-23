import { removeNumbersFromArray } from "./helpers";
import { getRandomNumberFromRange } from "./helpers";
import { range } from "./helpers";

export class SubmarineGame {
  playBoard: boolean[] = new Array<boolean>(100).fill(false);
  answersBoard: boolean[] = new Array<boolean>(100).fill(false);
  constructor() {
    this.fillBoard();
  }

  private fillBoard() {
    // Initialize an array with random numbers in the range of [0,..99]
    let availableSquares = range(100);

    let numOfRemoved = 0;
    for (let i = 0; i < 50; i++) {
      if (availableSquares.length === 0) break;

      // Get a random number from the array of available squares
      let randomCoordinate = getRandomNumberFromRange(100 - numOfRemoved);

      // Get the surrounding sqyares of that corrdinate
      let surroundingCoordinates = this.getSurroundingCoordinates(
        availableSquares[randomCoordinate]
      );

      // Asign a submarine to the chosen coordinate
      this.answersBoard[availableSquares[randomCoordinate]] = true;

      availableSquares = removeNumbersFromArray(
        availableSquares,
        surroundingCoordinates
      );

      numOfRemoved += surroundingCoordinates.length;
    }
  }

  private getSurroundingCoordinates(coordinate: number) {
    // If the coordinate is in the first row but not in one of the edges:
    if (coordinate > 0 && coordinate < 9) {
      return [
        coordinate - 1,
        coordinate,
        coordinate + 1,
        coordinate + 9,
        coordinate + 10,
        coordinate + 11,
      ];
    }

    // If the coordinate is in the first row and the left edge:
    if (coordinate === 0) {
      return [0, 1, 10, 11];
    }

    // If the coordinate is in the first row and the right edge:
    if (coordinate === 9) {
      return [8, 9, 18, 19];
    }

    // If the coordinate is in the last row but not in one of the edges:
    if (coordinate > 90 && coordinate < 99) {
      return [
        coordinate - 11,
        coordinate - 10,
        coordinate - 9,
        coordinate - 1,
        coordinate,
        coordinate + 1,
      ];
    }

    // If the coordinate is in the last row and the left edge:
    if (coordinate === 90) {
      return [80, 81, 90, 91];
    }

    // If the coordinate is in the last row and the right edge:
    if (coordinate === 99) {
      return [88, 89, 98, 99];
    }

    // If the coordinate is in the first column but not in one of the edges:
    if (coordinate % 10 === 0) {
      return [
        coordinate - 10,
        coordinate - 9,
        coordinate,
        coordinate + 1,
        coordinate + 10,
        coordinate + 11,
      ];
    }

    // If the coordinate is in the last column but not in one of the edges:
    if (coordinate % 10 === 9) {
      return [
        coordinate - 11,
        coordinate - 10,
        coordinate - 1,
        coordinate,
        coordinate + 9,
        coordinate + 10,
      ];
    }

    // The coordinate is not on any edge:
    return [
      coordinate - 11,
      coordinate - 10,
      coordinate - 9,
      coordinate - 1,
      coordinate,
      coordinate + 1,
      coordinate + 9,
      coordinate + 10,
      coordinate + 11,
    ];
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

  printBoard() {
    for (let row = 0; row < 10; row++) {
      let rowString = "";
      for (let col = 0; col < 10; col++) {
        const index = row * 10 + col;
        rowString += this.playBoard[index] ? "X " : "O ";
      }
      console.log(rowString);
    }
  }

  printAnswersBoard() {
    for (let row = 0; row < 10; row++) {
      let rowString = "";
      for (let col = 0; col < 10; col++) {
        const index = row * 10 + col;
        rowString += this.answersBoard[index] ? "X " : "O ";
      }
      console.log(rowString);
    }
  }
}
