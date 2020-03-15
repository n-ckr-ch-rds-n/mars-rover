import {InterfaceFactory} from "./interface.factory";
import {expect} from "chai";

describe("Rover interface factory", () => {
    let factory: InterfaceFactory;

    beforeEach(() => {
        factory = new InterfaceFactory();
    });

    it("Creates Mars rover interfaces", async () => {
       const roverInterface = factory.create();
       expect(roverInterface).to.have.property("questionAsync", "Async question method should have been defined");
       roverInterface.close();
    })
});
