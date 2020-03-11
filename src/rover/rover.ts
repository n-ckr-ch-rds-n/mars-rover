import {Position} from "./position";
import {RoverCoordinates} from "./rover.coordinates";
import {Orientation} from "./orientation";
import {Rotation} from "./rotation";

export class Rover {

    position: Position;

    constructor(initialPosition: Position) {
        this.position = {...initialPosition};
    }

    move() {
        this.position[this.affectedAxis()] += this.direction();
    }

    turn(rotation: Rotation) {
        this.position.orientation = Orientation.East;
    }

    private affectedAxis(): keyof RoverCoordinates {
        return [Orientation.North, Orientation.South].includes(this.position.orientation) ? "y" : "x";
    }

    private direction(): 1 | -1 {
        return [Orientation.North, Orientation.East].includes(this.position.orientation) ? 1 : -1;
    }

}