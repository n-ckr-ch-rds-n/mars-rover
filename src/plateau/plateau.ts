import {Coordinates} from "../coordinates-service/coordinates";

export class Plateau {

    area = {
        upperRightCoords: {},
        bottomLeftCoords: {x: 0, y: 0}
    };

    constructor(upperRightCoords: Coordinates) {
        this.area.upperRightCoords = upperRightCoords
    }
}
