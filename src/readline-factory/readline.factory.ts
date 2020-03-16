import readline from "readline";
import {promisify} from "util";
import {RoverReadline} from "./rover.readline";

export class ReadlineFactory {

    constructor() {
        const interfacePrototype = readline.Interface.prototype as any;
        interfacePrototype.question[promisify.custom] = function(question: string) {
            return new Promise(resolve =>
                interfacePrototype.question.call(this, question, resolve),
            );
        };
        interfacePrototype.questionAsync = promisify(
            readline.Interface.prototype.question,
        );
    }

    create(): RoverReadline {
        return readline.createInterface({
            input: process.stdin,
            output: process.stdout
        }) as RoverReadline;
    }

}
