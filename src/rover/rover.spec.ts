import {Rover} from "./rover";
import {expect} from "chai";
import {Orientation} from "../orientation";
import {Position} from "../position";
import {Rotation} from "../rotation";
import {OrientationService} from "../orientation-service/orientation.service";
import {ReorientationRequest} from "../orientation-service/reorientation.request";

describe("Rover", () => {
    let rover: Rover;
    let mockOrientationService: OrientationService;
    let mockPosition: Position;
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
        rover = new Rover(mockOrientationService, mockPosition);
    });

    it("Moves 1 degree up the y axis if facing North", () => {
        rover.move();
        expect(rover.position).to.deep.equal({...mockPosition, y: mockY + 1},
            "Rover coordinates not set correctly");
    });

    it("Moves a degree down the y axis if facing South", () => {
        rover.position.orientation = Orientation.South;
        rover.move();
        expect(rover.position.coordinates.y).to.deep.equal(mockY - 1,
            "Rover coordinates not set correctly")
    });

    it("Rotates", () => {
        rover.turn(Rotation.Right);
        expect(rover.position.orientation).to.equal(mockOrientation, "Rover has not been reoriented")
    });

});