import {UserInterface} from "./user.interface";
import {expect} from "chai";
import {RoverInterface} from "../interface-factory/rover.interface";
import {InputValidator} from "../input-validator/input-validator";
import {ValidatorResponse} from "../input-validator/validator.response";
import {ValidationRequest} from "../input-validator/validation.request";
import {InputType} from "../input-validator/input.type";
import {RoverFactory} from "../rover-factory/rover.factory";
import {Position} from "../rover/position";
import {Orientation} from "../orientation-service/orientation";
import {InterfaceFactory} from "../interface-factory/interface.factory";

describe("User interface", () => {
    let ui: UserInterface;
    let mockInterface: RoverInterface;
    let mockValidator: InputValidator;
    let mockRoverFactory: RoverFactory;
    let mockInterfaceFactory: InterfaceFactory;
    let mockValidatorResponse: ValidatorResponse;
    let mockValidationRequest: ValidationRequest;
    let mockPosition: Position;
    let mockUserInput: string;
    let consoleOutput: string;

    beforeEach(() => {
        mockInterface = {
            questionAsync: async (question: string) => {
                consoleOutput = question;
                return mockUserInput;
            },
            close: () => {}
        } as RoverInterface;
        mockInterfaceFactory = {
            create: () => mockInterface
        };
        mockValidator = {
            validate: (request: ValidationRequest) => {
                mockValidationRequest = request;
                return mockValidatorResponse;
            }
        };
        mockRoverFactory = {
            create: (initialPosition: Position) => ({position: initialPosition})
        } as RoverFactory;
        ui = new UserInterface(mockValidator, mockRoverFactory, mockInterfaceFactory);
    });

    it("Asks the user for input", async () => {
        for (const inputType of Object.values(InputType)) {
            await ui.requestInput(inputType);
            expect(consoleOutput).to.equal(ui.consoleOutput[inputType], "User not asked the correct question");
        }
    });

    it("Creates a rover if initial position input is valid", async () => {
        mockPosition = {coordinates: {x: 1, y: 4}, orientation: Orientation.East};
        mockValidatorResponse = {input: mockPosition, valid: true};
        await ui.start();
        expect(ui.rover.position).to.deep.equal(mockPosition, "Should have created a rover with an initial position");
    });

});
