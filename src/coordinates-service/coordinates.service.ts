import {RoverCoordinates} from "../rover/rover.coordinates";
import {Position} from "../position";
import {Orientation} from "../orientation";

export class CoordinatesService {

    refreshCoordinates(currentPosition: Position): RoverCoordinates {
        const affectedAxis = this.affectedAxis(currentPosition.orientation);
        const newValue = currentPosition.coordinates[affectedAxis] += this.direction(currentPosition.orientation);
        return {
            ...currentPosition.coordinates,
            [affectedAxis]: newValue
        };
    }

    private affectedAxis(orientation: Orientation): keyof RoverCoordinates {
        return [Orientation.North, Orientation.South].includes(orientation) ? "y" : "x";
    }

    private direction(orientation: Orientation): 1 | -1 {
        return [Orientation.North, Orientation.East].includes(orientation) ? 1 : -1;
    }
}