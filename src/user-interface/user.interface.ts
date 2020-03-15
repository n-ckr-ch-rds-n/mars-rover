import {RoverInterface} from "../interface-factory/rover.interface";
import {InputValidator} from "../input-validator/input-validator";
import {InputType} from "../input-validator/input.type";

export class UserInterface {

    output: Record<string, string> = {
        instructionsRequest: "Please input Rover navigation instructions. Permitted characters: L, R, M"
    };

    constructor(private roverInterface: RoverInterface,
                private validator: InputValidator) {
    }

    async start() {
        await this.requestRoverInstructions();
    }

    async requestRoverInstructions() {
        const rawInput = await this.requestInput(this.output.instructionsRequest);
        const validatedInput = this.validator.validate({input: rawInput, type: InputType.Instructions});
    }

    async requestInput(question: string): Promise<string> {
        const userInput = await this.roverInterface.questionAsync(question);
        this.roverInterface.close();
        return(userInput);
    }
}
