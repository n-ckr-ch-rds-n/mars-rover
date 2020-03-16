import {Rover} from "../rover/rover";
import {OrientationService} from "../orientation-service/orientation.service";
import {Position} from "../rover/position";
import {CoordinatesService} from "../coordinates-service/coordinates.service";
import {Plateau} from "../plateau/plateau";

export class RoverFactory {
    constructor() {}

    create(request: {initialPosition: Position, plateau: Plateau}): Rover {
        const orientationService = new OrientationService();
        const coordinatesService = new CoordinatesService(request.plateau);
        return new Rover(orientationService, coordinatesService, request.initialPosition);
    }
}
