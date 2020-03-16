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
import {Rover} from "../rover/rover";
import {Instruction} from "../rover/instruction";
import {Rotation} from "../orientation-service/rotation";
import {Movement} from "../coordinates-service/movement";

describe("User interface", () => {
    let ui: UserInterface;
    let mockInterface: RoverInterface;
    let mockValidator: InputValidator;
    let mockRoverFactory: RoverFactory;
    let mockInterfaceFactory: InterfaceFactory;
    let mockValidatorResponse: ValidatorResponse;
    let mockValidationRequest: ValidationRequest;
    let mockInstructions: Instruction[];
    let receivedInstructions: Instruction[];
    let mockPosition: Position;
    let mockUserInput: string;
    let consoleOutput: string;

    beforeEach(() => {
        mockPosition = {coordinates: {x: 1, y: 4}, orientation: Orientation.East};
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
        mockValidatorResponse = {item: mockPosition, valid: true};
        mockRoverFactory = {
            create: (initialPosition: Position) => ({
                position: initialPosition,
                explore: (instructions: Instruction[]) => {receivedInstructions = instructions}
            } as Rover)
        } as RoverFactory;
        ui = new UserInterface(mockValidator, mockRoverFactory, mockInterfaceFactory);
    });

    it("Asks the user for input", async () => {
        for (const inputType of Object.values(InputType)) {
            await ui.requestInput(inputType);
            expect(consoleOutput).to.equal(ui.consoleOutput[inputType], "User not asked the correct question");
        }
    });

    it("Initialises a plateau if plateau input is valid", () => {
        const plateau = ui.initialisePlateau();
    });

    it("Creates a rover if initial position input is valid", async () => {
        const rover = await ui.initialiseRover();
        expect(rover!.position).to.deep.equal(mockPosition, "Should have created a rover with an initial position");
    });

    it("Doesn't create a Rover if initial position input is invalid", async () => {
        mockValidatorResponse = {valid: false, error: "foobar"};
        const rover = await ui.initialiseRover();
        expect(rover).to.equal(undefined, "Rover should not have been created")
    });

    it("Passes instruction input to the rover", async () => {
        mockInstructions = [Rotation.Left, Movement.Forward];
        mockValidatorResponse.item = mockInstructions;
        ui.rover = await ui.initialiseRover();
        await ui.instructRover();
        expect(receivedInstructions).to.equal(mockInstructions, "Rover was not passed expected instructions");
    })

});
