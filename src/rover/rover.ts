import {Position} from "../position";
import {Rotation} from "../rotation";
import {OrientationService} from "../orientation-service/orientation.service";
import {CoordinatesService} from "../coordinates-service/coordinates.service";

export class Rover {

    position: Position;

    constructor(private orientationService: OrientationService,
                private coordinatesService: CoordinatesService,
                initialPosition: Position) {
        this.position = {...initialPosition};
    }

    explore(navigationString: string): Position {
        const instructions = navigationString.split("");
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
