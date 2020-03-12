import {CoordinatesService} from "./coordinates.service";
import {Orientation} from "../orientation";
import {Position} from "../position";
import {expect} from "chai";

describe("Coordinates service", () =>{
    let coordinatesService: CoordinatesService;
    let mockPosition: Position;

    beforeEach(() => {
        coordinatesService = new CoordinatesService();
    });

    it("Increases y axis value by a degree if oriented Northward", () => {
        mockPosition = {coordinates: {x: 1, y: 2}, orientation: Orientation.North};
        const newCoordinates = coordinatesService.refreshCoordinates(mockPosition);
        expect(newCoordinates.y).to.equal(mockPosition.coordinates.y + 1);
    })
});
