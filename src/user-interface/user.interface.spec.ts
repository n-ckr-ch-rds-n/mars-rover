import {UserInterface} from "./user.interface";
import {expect} from "chai";
import {RoverInterface} from "../interface-factory/rover.interface";
import {InputValidator} from "../input-validator/input-validator";
import {ValidatorResponse} from "../input-validator/validator.response";

describe("User interface", () => {
    let ui: UserInterface;
    let mockInterface: RoverInterface;
    let mockValidator: InputValidator;
    let mockValidatorResponse: ValidatorResponse;
    let mockUserInput: string;
    let consoleOutput: string;
    let mockQuestion: string;

    beforeEach(() => {
        mockQuestion = "Do you foobar?";
        mockUserInput = "Yes indeed";
        mockInterface = {
            questionAsync: async (question: string) => {
                consoleOutput = question;
                return mockUserInput;
            },
            close: () => {}
        } as RoverInterface;
        mockValidator = {
            validate: () => mockValidatorResponse
        };
        ui = new UserInterface(mockInterface, mockValidator);
    });

    it("Asks the user for input", async () => {
        const userInput = await ui.requestInput(mockQuestion);
        expect(consoleOutput).to.equal(mockQuestion, "User not asked the correct question");
        expect(userInput).to.equal(mockUserInput, "Expected input was not retrieved");
    })

    it("Passes raw input to validator for validation", () => {

    })

});
