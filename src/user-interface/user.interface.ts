import {RoverInterface} from "../interface-factory/rover.interface";
import {InputValidator} from "../input-validator/input-validator";
import {InputType} from "../input-validator/input.type";
import {ValidatorResponse} from "../input-validator/validator.response";
import {RoverFactory} from "../rover-factory/rover.factory";

export class UserInterface {

    consoleOutput: Record<InputType, string> = {
        [InputType.Instructions]: "Please input Rover navigation instructions. Permitted characters: L, R, M\n",
        [InputType.InitialCoordinates]: "Please input initial Rover coordinates. Format: x, y, orientation. e.g. '3 5 N'\n"
    };

    constructor(private roverInterface: RoverInterface,
                private validator: InputValidator,
                private roverFactory: RoverFactory) {
    }

    async start() {
        const roverInstructions = await this.requestInput(InputType.Instructions);
    }

    async requestInput(type: InputType): Promise<ValidatorResponse> {
        const input = await this.roverInterface.questionAsync(this.consoleOutput[type]);
        this.roverInterface.close();
        return this.validator.validate({input, type});
    }
}
