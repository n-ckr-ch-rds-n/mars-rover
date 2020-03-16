import {InputValidator} from "../input-validator/input-validator";
import {InputType} from "../input-validator/input.type";
import {ValidatorResponse} from "../input-validator/validator.response";
import {RoverFactory} from "../rover-factory/rover.factory";
import {Position} from "../rover/position";
import {Rover} from "../rover/rover";
import {InterfaceFactory} from "../interface-factory/interface.factory";
import {Instruction} from "../rover/instruction";

export class UserInterface {

    rover: Rover | undefined;

    consoleOutput: Record<InputType, string> = {
        [InputType.Instructions]: "Please input Rover navigation instructions. Permitted characters: L, R, M\n",
        [InputType.InitialPosition]: "Please input initial Rover coordinates. Format: x, y, orientation. e.g. '3 5 N'\n"
    };

    constructor(private validator: InputValidator,
                private roverFactory: RoverFactory,
                private interfaceFactory: InterfaceFactory) {
    }

    async start() {
        while (!this.rover) {
            this.rover = await this.initialiseRover();
        }
    }

    async instructRover() {
        const roverInstructions = await this.requestInput(InputType.Instructions);
        if (roverInstructions.valid) {
            this.rover!.explore(roverInstructions.input as Instruction[])
        } else {
            console.log(roverInstructions.error);
        }
    }

    async initialiseRover(): Promise<Rover | undefined> {
        const initialPosition = await this.requestInput(InputType.InitialPosition);
        if (initialPosition.valid) {
            return this.roverFactory.create(initialPosition.input as Position)
        } else {
            console.log(initialPosition.error);
        }
    }

    async requestInput(type: InputType): Promise<ValidatorResponse> {
        const roverInterface = this.interfaceFactory.create();
        const input = await roverInterface.questionAsync(this.consoleOutput[type]);
        roverInterface.close();
        return this.validator.validate({input, type});
    }
}
