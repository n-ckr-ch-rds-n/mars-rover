import {UserInterface} from "./user.interface";
import {expect} from "chai";
import {RoverInterface} from "../interface-factory/rover.interface";
import {InputValidator} from "../input-validator/input-validator";
import {ValidatorResponse} from "../input-validator/validator.response";
import {ValidationRequest} from "../input-validator/validation.request";
import {InputType} from "../input-validator/input.type";
import {RoverFactory} from "../rover-factory/rover.factory";

describe("User interface", () => {
    let ui: UserInterface;
    let mockInterface: RoverInterface;
    let mockValidator: InputValidator;
    let mockRoverFactory: RoverFactory;
    let mockValidatorResponse: ValidatorResponse;
    let mockValidationRequest: ValidationRequest;
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
            validate: (request: ValidationRequest) => {
                mockValidationRequest = request;
                return mockValidatorResponse;
            }
        };
        mockRoverFactory = {} as RoverFactory;
        ui = new UserInterface(mockInterface, mockValidator, mockRoverFactory);
    });

    it("Asks the user for input", async () => {
        for (const inputType of Object.values(InputType)) {
            const input = await ui.requestInput(inputType);
            expect(consoleOutput).to.equal(ui.consoleOutput[inputType], "User not asked the correct question");
        }
        // expect(input).to.equal(mockValidatorResponse, "Expected input was not retrieved");
    });

});
