import {RoverCoordinates} from "./rover.coordinates";

export class Rover {

    private _coordinates: RoverCoordinates = {x: 0, y: 0};

    set coordinates(coordinates: RoverCoordinates) {
        this._coordinates = coordinates;
    }

    get coordinates(): RoverCoordinates {
        return this._coordinates;
    }
}