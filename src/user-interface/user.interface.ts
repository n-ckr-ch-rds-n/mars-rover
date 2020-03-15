import {RoverInterface} from "../interface-factory/rover.interface";
import {InputValidator} from "../input-validator/input-validator";
import {InputType} from "../input-validator/input.type";
import {ValidatorResponse} from "../input-validator/validator.response";
import {RoverFactory} from "../rover-factory/rover.factory";

export class UserInterface {

    output: Record<InputType, string> = {
        [InputType.Instructions]: "Please input Rover navigation instructions. Format: 'LRMRLMM'. Permitted characters: L, R, M\n",
        [InputType.InitialCoordinates]: "Please input"
    };

    constructor(private roverInterface: RoverInterface,
                private validator: InputValidator,
                private roverFactory: RoverFactory) {
    }

    async start() {
        const roverInstructions = await this.requestInput(InputType.Instructions);
    }

    async requestInput(type: InputType): Promise<ValidatorResponse> {
        const input = await this.roverInterface.questionAsync(this.output[type]);
        this.roverInterface.close();
        return this.validator.validate({input, type});
    }
}
