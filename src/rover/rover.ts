import {Position} from "./position";
import {RoverCoordinates} from "./rover.coordinates";
import {Orientation} from "./orientation";

export class Rover {

    position: Position;

    constructor(initialPosition: Position) {
        this.position = initialPosition;
    }

    move() {
        this.position[this.affectedAxis()] += 1;
    }

    private affectedAxis(): keyof RoverCoordinates {
        return [Orientation.North, Orientation.South].includes(this.position.orientation) ? "x" : "y";
    }

}