import {Rover} from "./rover";
import {expect} from "chai";
import {Orientation} from "../orientation";
import {Position} from "../position";
import {Rotation} from "../rotation";
import {OrientationService} from "../orientation-service/orientation.service";
import {ReorientationRequest} from "../orientation-service/reorientation.request";
import {CoordinatesService} from "../coordinates-service/coordinates.service";
import {RoverCoordinates} from "./rover.coordinates";

describe("Rover", () => {
    let rover: Rover;
    let mockOrientationService: OrientationService;
    let mockCoordinatesService: CoordinatesService;
    let mockPosition: Position;
    let mockCoordinates: RoverCoordinates;
    let mockX: number;
    let mockY: number;
    let mockOrientation: Orientation;

    beforeEach(() => {
        mockX = 1;
        mockY = 3;
        mockPosition = {coordinates: {x: mockX, y: mockY}, orientation: Orientation.North};
        mockOrientation = Orientation.West;
        mockOrientationService = {
          reorient: (request: ReorientationRequest) => mockOrientation
        } as OrientationService;
        mockCoordinatesService = {
            refreshCoordinates: (currentPosition: Position) => mockCoordinates
        } as CoordinatesService;
        rover = new Rover(mockOrientationService, mockCoordinatesService, mockPosition);
    });

    it("Moves", () => {
        rover.move();
        expect(rover.position.coordinates).to.deep.equal(mockCoordinates, "Rover has not moved");
    });

    it("Rotates", () => {
        rover.turn(Rotation.Right);
        expect(rover.position.orientation).to.equal(mockOrientation, "Rover has not been reoriented")
    });

});