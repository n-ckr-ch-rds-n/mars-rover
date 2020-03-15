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
    let mockInitialPosition: Position;
    let mockCoordinates: RoverCoordinates;
    let mockX: number;
    let mockY: number;
    let mockOrientation: Orientation;
    let mockNavigationString: string;

    beforeEach(() => {
        mockX = 1;
        mockY = 3;
        mockInitialPosition = {coordinates: {x: mockX, y: mockY}, orientation: Orientation.North};
        mockOrientation = Orientation.West;
        mockOrientationService = {
          reorient: (request: ReorientationRequest) => mockOrientation
        } as OrientationService;
        mockCoordinatesService = {
            refreshCoordinates: (currentPosition: Position) => mockCoordinates
        } as CoordinatesService;
        rover = new Rover(mockOrientationService, mockCoordinatesService, mockInitialPosition);
    });

    it("Moves", () => {
        for (const coords of [{x: 3, y: 1}, {x: 2, y: 4}, {x: -1, y: 500}]) {
            mockCoordinates = coords;
            rover.move();
            expect(rover.position.coordinates).to.deep.equal(mockCoordinates, "Rover has not moved");
        }
    });

    it("Rotates", () => {
        for (const rotation of Object.values(Rotation)) {
            rover.turn(rotation);
            expect(rover.position.orientation).to.equal(mockOrientation, "Rover has not been reoriented")
        }
    });

    it("Understands orientation instructions", () => {
        mockNavigationString = "LR";
        const newPosition = rover.explore(mockNavigationString);
        expect(newPosition.orientation).to.equal(mockOrientation, "Rover should have reoriented");
    });

    it("Understands movement instructions", () => {
       mockNavigationString = "M";
       const newPosition = rover.explore(mockNavigationString);
       expect(newPosition.coordinates).to.deep.equal(mockCoordinates);
    });

});
