import {RoverFactory} from "./rover.factory";
import {Coordinates} from "../rover/rover.coordinates";
import {Position} from "../rover/position";
import {Orientation} from "../orientation-service/orientation";
import {expect} from "chai";

describe("Rover factory", () => {
    let factory: RoverFactory;
    let coords: Coordinates;
    let initialPosition: Position;

    beforeEach(() => {
        coords = {x: 1, y: 3};
        initialPosition = {coordinates: coords, orientation: Orientation.East};
        factory = new RoverFactory();
    });

    it("Creates Rovers", () => {
        const rover = factory.create(initialPosition);
        expect(rover.position).to.deep.equal(initialPosition,
            "Rover should have been created with an initial position");
        for (const service of ["orientationService", "coordinatesService"]) {
            expect(Object.keys(rover)).to.include(service, "Rover not created with necessary services");
        }
    })

});
