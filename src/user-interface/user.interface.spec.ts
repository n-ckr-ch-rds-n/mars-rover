import {UserInterface} from "./user.interface";
import rl, {Interface, ReadLineOptions} from "readline";
import {expect} from "chai";

describe("User interface", () => {
    let ui: UserInterface;
    let mockInterface: Interface;

    beforeEach(() => {
        mockInterface = {} as Interface;
        rl.createInterface = () => mockInterface;
        ui = new UserInterface();
    });

    it("Creates an interface on instantiation", () => {
        expect(ui.interface).to.deep.equal(mockInterface, "Interface should have been created");
    })
});
