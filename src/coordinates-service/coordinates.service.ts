import {Coordinates} from "./coordinates";
import {Position} from "../rover/position";
import {Orientation} from "../orientation-service/orientation";
import {Plateau} from "../plateau/plateau";

export class CoordinatesService {

    constructor(private plateau: Plateau) {}

    refreshCoordinates(currentPosition: Position): Coordinates {
        const affectedAxis = this.affectedAxis(currentPosition.orientation);
        const newValue = currentPosition.coordinates[affectedAxis] += this.direction(currentPosition.orientation);
        return {
            ...currentPosition.coordinates,
            [affectedAxis]: newValue
        };
    }

    private affectedAxis(orientation: Orientation): keyof Coordinates {
        return [Orientation.North, Orientation.South].includes(orientation) ? "y" : "x";
    }

    private direction(orientation: Orientation): 1 | -1 {
        return [Orientation.North, Orientation.East].includes(orientation) ? 1 : -1;
    }
}
