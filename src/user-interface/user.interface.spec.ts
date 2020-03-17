import {UserInterface} from "./user.interface";
import {expect} from "chai";
import {RoverReadline} from "../readline-factory/rover.readline";
import {InputValidator} from "../input-validator/input-validator";
import {ValidatorResponse} from "../input-validator/validator.response";
import {ValidationRequest} from "../input-validator/validation.request";
import {InputType} from "../input-validator/input.type";
import {RoverFactory} from "../rover-factory/rover.factory";
import {Position} from "../rover/position";
import {Orientation} from "../orientation-service/orientation";
import {ReadlineFactory} from "../readline-factory/readline.factory";
import {Rover} from "../rover/rover";
import {Instruction} from "../rover/instruction";
import {Rotation} from "../orientation-service/rotation";
import {Movement} from "../coordinates-service/movement";
import {Coordinates} from "../coordinates-service/coordinates"
import {Plateau} from "../plateau/plateau";

describe("User interface", () => {
    let ui: UserInterface;
    let mockInterface: RoverReadline;
    let mockValidator: InputValidator;
    let mockRoverFactory: RoverFactory;
    let mockInterfaceFactory: ReadlineFactory;
    let mockValidatorResponse: ValidatorResponse;
    let mockValidationRequest: ValidationRequest;
    let mockInstructions: Instruction[];
    let receivedInstructions: Instruction[];
    let mockCoordinates: Coordinates;
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
        } as RoverReadline;
        mockInterfaceFactory = {
            create: () => mockInterface
        };
        mockValidator = {
            validate: (request: ValidationRequest) => {
                mockValidationRequest = request;
                return mockValidatorResponse;
            }
        } as InputValidator;
        mockValidatorResponse = {item: mockPosition, valid: true};
        mockRoverFactory = {
            create: (request: {initialPosition: Position, plateau: Plateau}) => ({
                position: request.initialPosition,
                explore: (instructions: Instruction[]) => {
                    receivedInstructions = instructions;
                    return mockPosition;
                }
            } as Rover)
        } as RoverFactory;
        ui = new UserInterface(mockValidator, mockRoverFactory, mockInterfaceFactory);
        console.log = () => {}
    });

    it("Asks the user for input", async () => {
        for (const inputType of Object.values(InputType)) {
            await ui.requestInput(inputType);
            expect(consoleOutput).to.equal(ui.consoleOutput[inputType], "User not asked the correct question");
        }
    });

    it("Initialises a plateau if plateau input is valid", async () => {
        mockCoordinates = {x: 3, y: 5};
        mockValidatorResponse.item = mockCoordinates;
        const plateau = await ui.initialisePlateau();
        expect(plateau!.area.upperRight).to.deep.equal(mockCoordinates,
            "Plateau should have been initialised with given coordinates")
    });

    it("Creates a rover if initial position input is valid", async () => {
        const rover = await ui.initialiseRover({} as Plateau);
        expect(rover!.position).to.deep.equal(mockPosition, "Should have created a rover with an initial position");
    });

    it("Doesn't create a Rover if initial position input is invalid", async () => {
        mockValidatorResponse = {valid: false, error: "foobar"};
        const rover = await ui.initialiseRover({} as Plateau);
        expect(rover).to.equal(undefined, "Rover should not have been created")
    });

    it("Passes instruction input to the rover", async () => {
        mockInstructions = [Rotation.Left, Movement.Forward];
        ui.rover = await ui.initialiseRover({} as Plateau);
        mockValidatorResponse.item = mockInstructions;
        await ui.instructRover();
        expect(receivedInstructions).to.equal(mockInstructions, "Rover was not passed expected instructions");
    })

});
