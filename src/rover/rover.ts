import {Position} from "../position";
import {RoverCoordinates} from "./rover.coordinates";
import {Orientation} from "../orientation";
import {Rotation} from "../rotation";
import {OrientationService} from "../orientation-service/orientation.service";

export class Rover {

    position: Position;

    constructor(private orientationService: OrientationService, initialPosition: Position) {
        this.position = {...initialPosition};
    }

    move() {
        this.position.coordinates[this.affectedAxis()] += this.direction();
    }

    turn(rotation: Rotation) {
        this.position.orientation = this.orientationService.reorient({
            rotation, currentOrientation: this.position.orientation
        });
    }

    private affectedAxis(): keyof RoverCoordinates {
        return [Orientation.North, Orientation.South].includes(this.position.orientation) ? "y" : "x";
    }

    private direction(): 1 | -1 {
        return [Orientation.North, Orientation.East].includes(this.position.orientation) ? 1 : -1;
    }

}