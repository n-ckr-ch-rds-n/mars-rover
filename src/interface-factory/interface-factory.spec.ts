import {InterfaceFactory} from "./interface.factory";

describe("Rover interface factory", () => {
    let factory: InterfaceFactory;

    beforeEach(() => {
        factory = new InterfaceFactory();
    });

    it("Creates Mars rover interfaces", async () => {
       const roverInterface = factory.create();
       roverInterface.close();
    })
});
