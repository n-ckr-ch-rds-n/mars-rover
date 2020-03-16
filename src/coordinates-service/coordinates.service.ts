import {Coordinates} from "./coordinates";
import {Position} from "../rover/position";
import {Orientation} from "../orientation-service/orientation";
import {Plateau} from "../plateau/plateau";

export class CoordinatesService {

    outOfBoundsMessage: string = "Requested movement is out of bounds of the plateau";

    constructor(private plateau: Plateau) {}

    refreshCoordinates(currentPosition: Position): Coordinates {
        const affectedAxis = this.affectedAxis(currentPosition.orientation);
        const newValue = currentPosition.coordinates[affectedAxis] += this.direction(currentPosition.orientation);
        const refreshedCoordinates = {
            ...currentPosition.coordinates,
            [affectedAxis]: newValue
        };
        if (this.isInBounds(refreshedCoordinates)) {
            return refreshedCoordinates
        } else {
            throw new Error(this.outOfBoundsMessage);
        };
    }

    private affectedAxis(orientation: Orientation): keyof Coordinates {
        return [Orientation.North, Orientation.South].includes(orientation) ? "y" : "x";
    }

    private direction(orientation: Orientation): 1 | -1 {
        return [Orientation.North, Orientation.East].includes(orientation) ? 1 : -1;
    }

    private isInBounds(coordinates: Coordinates): boolean {
        const plateauRight = this.plateau.area.upperRight;
        const plateauLeft = this.plateau.area.bottomLeft;
        return coordinates.x > plateauRight.x || coordinates.y > plateauRight.y
            ? false
            : !(coordinates.x < plateauLeft.x || coordinates.y < plateauLeft.y)
    }
}
