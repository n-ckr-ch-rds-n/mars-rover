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
        [InputType.Plateau]: "Please proved the upper right coordinates for the plateau. Format: x y, e.g. '5 5'\n"
    };

    constructor(private validator: InputValidator,
                private roverFactory: RoverFactory,
                private interfaceFactory: InterfaceFactory) {
    }

    async start() {
        let plateau: Plateau | undefined;
        while (!plateau) {
            plateau = await this.initialisePlateau();
        }
        while (!this.rover) {
            this.rover = await this.initialiseRover(plateau);
        }
        await this.instructRover();
    }

    async initialisePlateau(): Promise<Plateau | undefined> {
        const plateauInput = await this.requestInput(InputType.Plateau);
        if (plateauInput.valid) {
            console.log(`${this.colors.success}Plateau initialised${this.colors.reset}`);
            return new Plateau(plateauInput.item as Coordinates);
        } else {
            this.logError(plateauInput.error!)
        }
    }

    async initialiseRover(plateau: Plateau): Promise<Rover | undefined> {
        const initialPositionInput = await this.requestInput(InputType.InitialPosition);
        if (initialPositionInput.valid) {
            return this.roverFactory.create({initialPosition: initialPositionInput.item as Position, plateau})
        } else {
            this.logError(initialPositionInput.error!);
        }
    }

    async instructRover() {
        const roverInstructionsInput = await this.requestInput(InputType.Instructions);
        if (roverInstructionsInput.valid) {
            try {
                const roverPosition = this.rover!.explore(roverInstructionsInput.item as Instruction[]);
                console.log(`${this.colors.success}${roverPosition}${this.colors.reset}`)
            } catch (error) {
                this.logError(error.message);
            }
        } else {
            this.logError(roverInstructionsInput.error!);
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
