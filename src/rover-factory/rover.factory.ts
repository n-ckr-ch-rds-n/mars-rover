import {Rover} from "../rover/rover";
import {OrientationService} from "../orientation-service/orientation.service";
import {Position} from "../rover/position";
import {CoordinatesService} from "../coordinates-service/coordinates.service";

export class RoverFactory {
    constructor() {}

    create(initialPosition: Position): Rover {
        const orientationService = new OrientationService();
        const coordinatesService = new CoordinatesService();
        return new Rover(orientationService, coordinatesService, initialPosition);
    }
}
