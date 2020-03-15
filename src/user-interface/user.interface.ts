import rl, {Interface} from "readline";
import {RoverInterface} from "../interface-factory/rover.interface";

export class UserInterface {

    constructor(private roverInterface: RoverInterface) {
    }

    async requestInput(question: string): Promise<string> {
        const userInput = await this.roverInterface.questionAsync(question);
        this.roverInterface.close();
        return(userInput);
    }
}
