import {Position} from "./position";
import {Rotation} from "../orientation-service/rotation";
import {OrientationService} from "../orientation-service/orientation.service";
import {CoordinatesService} from "../coordinates-service/coordinates.service";
import {Instruction} from "./instruction";

export class Rover {

    position: Position;

    constructor(private orientationService: OrientationService,
                private coordinatesService: CoordinatesService,
                initialPosition: Position) {
        this.position = {...initialPosition};
    }

    explore(instructions: Instruction[]): Position {
        for (const instruction of instructions) {
            Object.values(Rotation).includes(instruction as any)
                ? this.turn(instruction as Rotation)
                : this.move();
        }
        return this.position;
    }

    move() {
        this.position.coordinates = this.coordinatesService.refreshCoordinates(this.position);
    }

    turn(rotation: Rotation) {
        this.position.orientation = this.orientationService.reorient({
            rotation, currentOrientation: this.position.orientation
        });
    }

}
