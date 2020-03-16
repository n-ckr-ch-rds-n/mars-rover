import {Coordinates} from "../coordinates-service/coordinates";
import {Area} from "./area";

export class Plateau {

    area: Area = {
        upperRight: {x: 0, y: 0},
        bottomLeft: {x: 0, y: 0}
    };

    constructor(upperRightCoords: Coordinates) {
        this.area.upperRight = upperRightCoords
    }

    outOfBounds(coords: Coordinates): boolean {
        return coords.x > this.area.upperRight.x
            || coords.y > this.area.upperRight.y
            || coords.x < this.area.bottomLeft.x
            || coords.y < this.area.bottomLeft.y;
    }
}
