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
