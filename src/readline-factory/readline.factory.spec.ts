import {ReadlineFactory} from "./readline.factory";
import {expect} from "chai";

describe("Rover interface factory", () => {
    let factory: ReadlineFactory;

    beforeEach(() => {
        factory = new ReadlineFactory();
    });

    it("Creates Mars rover readline interfaces", async () => {
       const readline = factory.create();
       readline.close();
    })
});
