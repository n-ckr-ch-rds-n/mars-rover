import {Position} from "./position";
import {RoverCoordinates} from "./rover.coordinates";
import {Orientation} from "./orientation";
import {Rotation} from "./rotation";

export class Rover {

    position: Position;
    cardinalPoints: Orientation[] = [Orientation.North, Orientation.East, Orientation.South, Orientation.West];

    constructor(initialPosition: Position) {
        this.position = {...initialPosition};
    }

    move() {
        this.position[this.affectedAxis()] += this.direction();
    }

    turn(rotation: Rotation) {
        const currentIndex = this.cardinalPoints.indexOf(this.position.orientation);
        if (rotation === Rotation.Right) {
            this.position.orientation = currentIndex === this.cardinalPoints.length - 1
                ? this.cardinalPoints[0]
                : this.cardinalPoints[currentIndex + 1]
        } else if (rotation === Rotation.Left) {
            this.position.orientation = currentIndex === 0
                ? this.cardinalPoints[this.cardinalPoints.length - 1]
                : this.cardinalPoints[currentIndex - 1]
        }
    }

    private affectedAxis(): keyof RoverCoordinates {
        return [Orientation.North, Orientation.South].includes(this.position.orientation) ? "y" : "x";
    }

    private direction(): 1 | -1 {
        return [Orientation.North, Orientation.East].includes(this.position.orientation) ? 1 : -1;
    }

}