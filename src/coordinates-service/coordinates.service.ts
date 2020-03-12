import {RoverCoordinates} from "../rover/rover.coordinates";
import {Position} from "../position";

export class CoordinatesService {

    refreshCoordinates(currentPosition: Position): RoverCoordinates {
        return {x: 1, y: 3};
    }
}