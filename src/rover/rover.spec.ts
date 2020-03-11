import {Rover} from "./rover";
import {expect} from "chai";
import {Orientation} from "./orientation";
import {Position} from "./position";

describe("Rover", () => {
    let rover: Rover;
    let mockPosition: Position;
    let mockX: number;
    let mockY: number;

    beforeEach(() => {
        mockPosition = {x: mockX, y: mockY, orientation: Orientation.North};
        rover = new Rover(mockPosition);
    });

    it("Moves 1 degree up the y axis if facing North", () => {
        rover.move();
        expect(rover.position).to.deep.equal({...mockPosition, y: mockY + 1},
            "Rover should have moved forwards");
    });

    it("Moves a degree down the y axis if facing North", () => {

    });

});