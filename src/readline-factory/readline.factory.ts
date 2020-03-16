import readline from "readline";
import {promisify} from "util";
import {RoverReadline} from "./rover.readline";

export class ReadlineFactory {

    create(): RoverReadline {
        (readline.Interface.prototype.question as any)[promisify.custom] = function(question: string) {
            return new Promise(resolve =>
                readline.Interface.prototype.question.call(this, question, resolve),
            );
        };
        (readline.Interface.prototype as any).questionAsync = promisify(
            readline.Interface.prototype.question,
        );
        return readline.createInterface({
            input: process.stdin,
            output: process.stdout
        }) as RoverReadline;
    }

}
