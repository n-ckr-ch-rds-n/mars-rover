import {Position} from "./position";

export class Rover {

    position: Position;

    constructor(initialPosition: Position) {
        this.position = initialPosition;
    }

    move() {
        this.position.x += 1;
    }

}