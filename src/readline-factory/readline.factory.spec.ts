import {ReadlineFactory} from "./readline.factory";

describe("Rover interface factory", () => {
    let factory: ReadlineFactory;

    beforeEach(() => {
        factory = new ReadlineFactory();
    });

    it("Creates Mars rover interfaces", async () => {
       const roverInterface = factory.create();
       roverInterface.close();
    })
});
