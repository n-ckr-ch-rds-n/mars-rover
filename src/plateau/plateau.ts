import {Coordinates} from "../coordinates-service/coordinates";
import {Area} from "./area";

export class Plateau {

    area: Area = {
        upperRightCoords: {x: 0, y: 0},
        bottomLeftCoords: {x: 0, y: 0}
    };

    constructor(upperRightCoords: Coordinates) {
        this.area.upperRightCoords = upperRightCoords
    }
}
