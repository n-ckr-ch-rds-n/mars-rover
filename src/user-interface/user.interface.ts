import rl, {Interface} from "readline";
import {RoverInterface} from "../interface-factory/rover.interface";
import {InputValidator} from "../input-validator/input-validator";

export class UserInterface {

    constructor(private roverInterface: RoverInterface,
                private validator: InputValidator) {
    }

    async requestInput(question: string): Promise<string> {
        const userInput = await this.roverInterface.questionAsync(question);
        this.roverInterface.close();
        return(userInput);
    }
}
