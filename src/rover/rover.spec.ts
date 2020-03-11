import {Rover} from "./rover";
import {expect} from "chai";

describe("Rover", () => {
    let rover: Rover;

    beforeEach(() => {
        rover = new Rover();
    });

    it("Has settable coordinates", () => {
        rover.coordinates = {x: 1, y: 3};
        expect(rover.coordinates).to.deep.equal({x: 1, y: 3}, "");
    });

});