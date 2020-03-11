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

});