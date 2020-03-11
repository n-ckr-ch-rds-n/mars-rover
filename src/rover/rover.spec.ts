import {Rover} from "./rover";
import {expect} from "chai";
import {Orientation} from "../orientation";
import {Position} from "./position";
import {Rotation} from "../rotation";

describe("Rover", () => {
    let rover: Rover;
    let mockPosition: Position;
    let mockX: number;
    let mockY: number;

    beforeEach(() => {
        mockX = 1;
        mockY = 3;
        mockPosition = {x: mockX, y: mockY, orientation: Orientation.North};
        rover = new Rover(mockPosition);
    });

    it("Moves 1 degree up the y axis if facing North", () => {
        rover.move();
        expect(rover.position).to.deep.equal({...mockPosition, y: mockY + 1},
            "Rover coordinates not set correctly");
    });

    it("Moves a degree down the y axis if facing South", () => {
        rover.position.orientation = Orientation.South;
        rover.move();
        expect(rover.position.y).to.deep.equal(mockY - 1,
            "Rover coordinates not set correctly")
    });

    it("Turns to the right", () => {
        rover.turn(Rotation.Right);
        expect(rover.position.orientation).to.equal(Orientation.East,
            "Rover has not been reoriented in the expected way")
    });

    it("Turns to the left", () => {
        rover.turn(Rotation.Left);
        expect(rover.position.orientation).to.equal(Orientation.West,
            "Rover has not been reoriented in the expected way");
    });

});