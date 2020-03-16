import {InputValidator} from "../input-validator/input-validator";
import {InputType} from "../input-validator/input.type";
import {ValidatorResponse} from "../input-validator/validator.response";
import {RoverFactory} from "../rover-factory/rover.factory";
import {Position} from "../rover/position";
import {Rover} from "../rover/rover";
import {InterfaceFactory} from "../interface-factory/interface.factory";
import {Instruction} from "../rover/instruction";
import {Plateau} from "../plateau/plateau";
import {Coordinates} from "../coordinates-service/coordinates";

export class UserInterface {

    rover: Rover | undefined;

    colors: Record<string, string> = {
        success: "\x1b[32m",
        error: "\x1b[31m",
        reset: "\x1b[0m"
    };

    consoleOutput: Record<InputType, string> = {
        [InputType.Instructions]: "Please input Rover navigation instructions. Permitted characters: L, R, M\n",
        [InputType.InitialPosition]: "Please input initial Rover coordinates. Format: x y orientation, e.g. '3 5 N'\n",
        [InputType.Plateau]: "Please proved the upper right coordinates for the plateau. Format: x y, e.g. '5 5\n"
    };

    constructor(private validator: InputValidator,
                private roverFactory: RoverFactory,
                private interfaceFactory: InterfaceFactory) {
    }

    async start() {
        while (!this.rover) {
            this.rover = await this.initialiseRover();
        }
        await this.instructRover();
    }

    async initialisePlateau(): Promise<Plateau | undefined> {
        const upperRight = await this.requestInput(InputType.Plateau);
        if (upperRight.valid) {
            return new Plateau(upperRight.input as Coordinates);
        }
    }

    async initialiseRover(): Promise<Rover | undefined> {
        const initialPosition = await this.requestInput(InputType.InitialPosition);
        if (initialPosition.valid) {
            return this.roverFactory.create(initialPosition.input as Position)
        } else {
            this.logError(initialPosition.error!);
        }
    }

    async instructRover() {
        const roverInstructions = await this.requestInput(InputType.Instructions);
        if (roverInstructions.valid) {
            const roverPosition = this.rover!.explore(roverInstructions.input as Instruction[]);
            console.log(`${this.colors.success}${roverPosition}${this.colors.reset}`)
        } else {
            this.logError(roverInstructions.error!);
        }
    }

    async requestInput(type: InputType): Promise<ValidatorResponse> {
        const roverInterface = this.interfaceFactory.create();
        const input = await roverInterface.questionAsync(this.consoleOutput[type]);
        roverInterface.close();
        return this.validator.validate({input, type});
    }

    logError(error: string) {
        console.log(`${this.colors.error}${error}${this.colors.reset}`);
    }
}
