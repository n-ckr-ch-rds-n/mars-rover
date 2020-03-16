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
}
