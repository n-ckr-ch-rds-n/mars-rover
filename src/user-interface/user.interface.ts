import rl, {Interface} from "readline";
import {RoverInterface} from "../interface-factory/rover.interface";
import {InputValidator} from "../input-validator/input-validator";

export class UserInterface {

    output: Record<string, string> = {
        instructionsRequest: "Please input Rover navigation instructions. Permitted characters: L, R, M"
    };

    constructor(private roverInterface: RoverInterface,
                private validator: InputValidator) {
    }

    async requestRoverInstructions() {
        const rawInput = await this.requestInput(this.output.instructionsRequest);
        const validatedInput = this.validator.validate(rawInput);
    }

    async requestInput(question: string): Promise<string> {
        const userInput = await this.roverInterface.questionAsync(question);
        this.roverInterface.close();
        return(userInput);
    }
}
