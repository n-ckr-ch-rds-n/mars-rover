import {RoverInterface} from "../interface-factory/rover.interface";
import {InputValidator} from "../input-validator/input-validator";
import {InputType} from "../input-validator/input.type";
import {ValidatorResponse} from "../input-validator/validator.response";

export class UserInterface {

    output: Record<string, string> = {
        instructionsRequest: "Please input Rover navigation instructions. Format: 'LRMRLMM'. Permitted characters: L, R, M\n",
        initialPositionRequest: "Please input"
    };

    constructor(private roverInterface: RoverInterface,
                private validator: InputValidator) {
    }

    async start() {
        const roverInstructions = await this.requestInput({
            requestText: this.output.instructionsRequest, type: InputType.Instructions
        });
    }

    async requestInput(request: {requestText: string, type: InputType}): Promise<ValidatorResponse> {
        const input = await this.roverInterface.questionAsync(request.requestText);
        this.roverInterface.close();
        return this.validator.validate({input, type: request.type});
    }
}
