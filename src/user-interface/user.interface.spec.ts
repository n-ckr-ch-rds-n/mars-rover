import {UserInterface} from "./user.interface";
import {expect} from "chai";
import {RoverInterface} from "../interface-factory/rover.interface";

describe("User interface", () => {
    let ui: UserInterface;
    let mockInterface: RoverInterface;
    let mockUserInput: string;
    let consoleOutput: string;

    beforeEach(() => {
        mockInterface = {
            questionAsync: async (question: string) => {
                consoleOutput = question;
                return mockUserInput;
            }
        } as RoverInterface;
        ui = new UserInterface(mockInterface);
    });

    it("Asks the user for input", () => {
        const mockQuestion = "Do you foobar?";
        ui.requestInput(mockQuestion);
    })

});
