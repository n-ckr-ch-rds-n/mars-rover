import {RoverInterface} from "../interface-factory/rover.interface";
import {InputValidator} from "../input-validator/input-validator";
import {InputType} from "../input-validator/input.type";
import {ValidatorResponse} from "../input-validator/validator.response";

export class UserInterface {

    output: Record<string, string> = {
        instructionsRequest: "Please input Rover navigation instructions. Permitted characters: L, R, M\n"
    };

    constructor(private roverInterface: RoverInterface,
                private validator: InputValidator) {
    }

    async start() {
        const roverInstructions = await this.requestRoverInstructions();
    }

    async requestRoverInstructions(): Promise<ValidatorResponse> {
        const rawInput = await this.requestInput(this.output.instructionsRequest);
        return this.validator.validate({input: rawInput, type: InputType.Instructions});
    }

    async requestInput(question: string): Promise<string> {
        const userInput = await this.roverInterface.questionAsync(question);
        this.roverInterface.close();
        return(userInput);
    }
}
