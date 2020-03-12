import {CoordinatesService} from "./coordinates.service";
import {Orientation} from "../orientation";
import {Position} from "../position";
import {expect} from "chai";

describe("Coordinates service", () =>{
    let coordinatesService: CoordinatesService;
    let mockPosition: Position;
    let mockX: number;
    let mockY: number;

    beforeEach(() => {
        mockX = 1;
        mockY = 3;
        coordinatesService = new CoordinatesService();
    });

    it("Increases y axis value by a degree if oriented Northward", () => {
        mockPosition = {coordinates: {x: mockX, y: mockY}, orientation: Orientation.North};
        const newCoordinates = coordinatesService.refreshCoordinates(mockPosition);
        expect(newCoordinates.y).to.equal(mockY + 1, "Y-axis value was not increased by 1");
    })
});
