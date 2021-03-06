import {InputValidator} from "../input-validator/input-validator";
import {InputType} from "../input-validator/input.type";
import {ValidatorResponse} from "../input-validator/validator.response";
import {RoverFactory} from "../rover-factory/rover.factory";
import {Position} from "../rover/position";
import {Rover} from "../rover/rover";
import {ReadlineFactory} from "../readline-factory/readline.factory";
import {Instruction} from "../rover/instruction";
import {Plateau} from "../plateau/plateau";
import {Coordinates} from "../coordinates-service/coordinates";
import {Color} from "./color";

export class UserInterface {

    rover: Rover | undefined;
    fleetSize: number = 2;

    consoleOutput: Record<InputType, string> = {
        [InputType.Instructions]: "Please input Rover navigation instructions. Permitted characters: L, R, M\n",
        [InputType.InitialPosition]: "Please input initial Rover coordinates. Format: x y orientation, e.g. '3 5 N'\n",
        [InputType.Plateau]: "Please provide the upper right coordinates for the plateau. Format: x y, e.g. '5 5'\n"
    };

    constructor(private validator: InputValidator,
                private roverFactory: RoverFactory,
                private readlineFactory: ReadlineFactory) {
    }

    async start() {
        let plateau: Plateau | undefined;
        while (!plateau) {
            plateau = await this.initialisePlateau();
        }
        for (const rover of Array(this.fleetSize).fill(0)) {
            while (!this.rover) {
                this.rover = await this.initialiseRover(plateau);
            }
            await this.instructRover();
            this.rover = undefined;
        }
    }

    async initialisePlateau(): Promise<Plateau | undefined> {
        const plateauInput = await this.requestInput(InputType.Plateau);
        if (plateauInput.valid) {
            const coords = plateauInput.item as Coordinates;
            this.logSuccess(`Plateau initialised: {x: ${coords.x}, y: ${coords.y}}`);
            return new Plateau(coords);
        } else {
            this.logError(plateauInput.error!)
        }
    }

    async initialiseRover(plateau: Plateau): Promise<Rover | undefined> {
        const initialPositionInput = await this.requestInput(InputType.InitialPosition);
        if (initialPositionInput.valid) {
            try {
                const initialPosition = initialPositionInput.item as Position;
                const rover = this.roverFactory.create({initialPosition, plateau});
                this.logSuccess(`Rover initialised: ` +
                    `${initialPosition.coordinates.x} ${initialPosition.coordinates.y} ${initialPosition.orientation}`);
                return rover;
            } catch (error) {
                this.logError(error.message);
            }
        } else {
            this.logError(initialPositionInput.error!);
        }
    }

    async instructRover() {
        const roverInstructionsInput = await this.requestInput(InputType.Instructions);
        if (roverInstructionsInput.valid) {
            try {
                const roverPosition = this.rover!.explore(roverInstructionsInput.item as Instruction[]);
                this.logSuccess(`Rover's final position: ${roverPosition.coordinates.x} ${roverPosition.coordinates.y} `
                    + `${roverPosition.orientation}`)
            } catch (error) {
                this.logError(error.message);
            }
        } else {
            this.logError(roverInstructionsInput.error!);
        }
    }

    async requestInput(type: InputType): Promise<ValidatorResponse> {
        const readline = this.readlineFactory.create();
        const input = await readline.questionAsync(this.consoleOutput[type]);
        readline.close();
        return this.validator.validate({input, type});
    }

    private logError(error: string) {
        console.log(`${Color.Error}${error}${Color.Reset}`);
    }

    private logSuccess(message: string) {
        console.log(`${Color.Success}${message}${Color.Reset}`);
    }
}
