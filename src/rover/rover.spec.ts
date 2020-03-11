import {Rover} from "./rover";
import {expect} from "chai";
import {Orientation} from "./orientation";

describe("Rover", () => {
    let rover: Rover;

    beforeEach(() => {
        rover = new Rover();
    });

    it("Has settable coordinates", () => {
        rover.coordinates = {x: 1, y: 3};
        expect(rover.coordinates).to.deep.equal({x: 1, y: 3}, "Rover coordinates incorrectly set");
    });

    it("Has a settable orientation", () => {
        rover.orientation = Orientation.South;
        expect(rover.orientation).to.equal(Orientation.South, "Rover orientation incorrectly set");
    })

});