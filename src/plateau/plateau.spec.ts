import {Plateau} from "./plateau";

describe("Plateau", () => {
    let plateau: Plateau;

    it("Can be initialised with different upper right coordinates", () => {
        plateau = new Plateau({x: 3, y: 4});
    })

});
