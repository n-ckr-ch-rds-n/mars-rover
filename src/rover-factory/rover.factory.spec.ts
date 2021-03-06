import {RoverFactory} from "./rover.factory";
import {Coordinates} from "../coordinates-service/coordinates";
import {Position} from "../rover/position";
import {Orientation} from "../orientation-service/orientation";
import {expect} from "chai";
import {Plateau} from "../plateau/plateau";
import {ErrorType} from "../input-validator/error.type";

describe("Rover factory", () => {
    let factory: RoverFactory;
    let coords: Coordinates;
    let initialPosition: Position;
    let mockPlateau: Plateau;

    beforeEach(() => {
        coords = {x: 1, y: 3};
        initialPosition = {coordinates: coords, orientation: Orientation.East};
        mockPlateau = {
            outOfBounds: (coords: Coordinates) => false
        } as Plateau;
        factory = new RoverFactory();
    });

    it("Creates Rovers with an initial position", () => {
        const rover = factory.create({initialPosition, plateau: mockPlateau});
        expect(rover.position).to.deep.equal(initialPosition,
            "Rover should have been created with an initial position");

    });

    it("Creates Rovers with their required services", () => {
        const rover = factory.create({initialPosition, plateau: mockPlateau});
        for (const service of ["orientationService", "coordinatesService"]) {
            expect(Object.keys(rover)).to.include(service, "Rover not created with necessary services");
        }
    });

    it("Doesn't create Rovers if the initial position input is out of bounds", () => {
        mockPlateau.outOfBounds = (coords) => true;
        try {
            factory.create({initialPosition, plateau: mockPlateau});
        } catch (error) {
            expect(error.message).to.equal(ErrorType.OutOfBounds, "Should have thrown an out of bounds error");
        }
    })

});
