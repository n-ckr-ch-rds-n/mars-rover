import {RoverCoordinates} from "./rover.coordinates";
import {Orientation} from "./orientation";

export class Rover {

    private _coordinates: RoverCoordinates = {x: 0, y: 0};
    private _orientation: Orientation = Orientation.North;

    set coordinates(coordinates: RoverCoordinates) {
        this._coordinates = coordinates;
    }

    get coordinates(): RoverCoordinates {
        return this._coordinates;
    }

    get orientation(): Orientation {
        return this._orientation;
    }

    set orientation(orientation: Orientation) {
        this._orientation = orientation;
    }
}