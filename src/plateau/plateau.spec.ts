import {Plateau} from "./plateau";
import {expect} from "chai";

describe("Plateau", () => {
    let plateau: Plateau;

    it("Can be initialised with different upper right coordinates", () => {
        for (const mockCoordinates of [{x: 3, y: 4}, {x: 5, y: 5}]) {
            plateau = new Plateau(mockCoordinates);
            expect(plateau.area.upperRight).to.deep.equal(mockCoordinates, "Area was not initialised correctly");
        }
    });

    it("Knows when coordinates are out of bounds", () => {
        plateau = new Plateau({x: 5, y: 5});
        for (const coords of [{x: 5, y: 6}, {x: -1, y: 4}]) {
            expect(plateau.outOfBounds(coords)).to.equal(true,
                "Coordinates should have been recognised as out of bounds");
        }
    })

});
