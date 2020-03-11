import {Rover} from "./rover";
import {expect} from "chai";
import {Orientation} from "./orientation";
import {Position} from "./position";

describe("Rover", () => {
    let rover: Rover;
    let mockPosition: Position;

    beforeEach(() => {
        mockPosition = {x: 1, y: 3, orientation: Orientation.North};
        rover = new Rover(mockPosition);
    });

    it("Moves 1 degree up the y axis if facing North", () => {
        rover.move();
        expect(rover.position).to.deep.equal({...mockPosition, y: 4},
            "Rover should have moved forwards");
    })

});