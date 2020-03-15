import {Rover} from "./rover";
import {expect} from "chai";
import {Orientation} from "../orientation-service/orientation";
import {Position} from "./position";
import {Rotation} from "../orientation-service/rotation";
import {OrientationService} from "../orientation-service/orientation.service";
import {ReorientationRequest} from "../orientation-service/reorientation.request";
import {CoordinatesService} from "../coordinates-service/coordinates.service";
import {RoverCoordinates} from "./rover.coordinates";
import {Movement} from "../coordinates-service/movement";

describe("Rover", () => {
    let rover: Rover;
    let mockOrientationService: OrientationService;
    let mockCoordinatesService: CoordinatesService;
    let mockInitialPosition: Position;
    let mockUpdatedCoordinates: RoverCoordinates;
    let mockX: number;
    let mockY: number;
    let mockUpdatedOrientation: Orientation;
    let newPosition: Position;

    beforeEach(() => {
        mockX = 1;
        mockY = 3;
        mockInitialPosition = {coordinates: {x: mockX, y: mockY}, orientation: Orientation.North};
        mockUpdatedOrientation = Orientation.West;
        mockOrientationService = {
          reorient: (request: ReorientationRequest) => mockUpdatedOrientation
        } as OrientationService;
        mockCoordinatesService = {
            refreshCoordinates: (currentPosition: Position) => mockUpdatedCoordinates
        } as CoordinatesService;
        rover = new Rover(mockOrientationService, mockCoordinatesService, mockInitialPosition);
    });

    it("Moves", () => {
        for (const coords of [{x: 3, y: 1}, {x: 2, y: 4}, {x: -1, y: 500}]) {
            mockUpdatedCoordinates = coords;
            rover.move();
            expect(rover.position.coordinates).to.deep.equal(mockUpdatedCoordinates, "Rover has not moved");
        }
    });

    it("Rotates", () => {
        for (const rotation of Object.values(Rotation)) {
            rover.turn(rotation);
            expect(rover.position.orientation).to.equal(mockUpdatedOrientation, "Rover has not been reoriented")
        }
    });

    it("Understands orientation instructions", () => {
        newPosition = rover.explore([Rotation.Left, Rotation.Right]);
        expect(newPosition.coordinates).to.deep.equal(mockInitialPosition.coordinates, "Rover should not have moved");
        expect(newPosition.orientation).to.equal(mockUpdatedOrientation, "Rover should have reoriented");
    });

    it("Understands movement instructions", () => {
       newPosition = rover.explore([Movement.Forward]);
       expect(newPosition.orientation).to.equal(mockInitialPosition.orientation, "Rover should not have reoriented")
       expect(newPosition.coordinates).to.deep.equal(mockUpdatedCoordinates);
    });

    it("Understands a mixed list of instructions", () => {
        newPosition = rover.explore([Rotation.Right, Movement.Forward, Rotation.Left]);
        expect(newPosition.orientation).to.equal(mockUpdatedOrientation, "Rover should have reoriented");
        expect(newPosition.coordinates).to.deep.equal(mockUpdatedCoordinates);
    });

});
