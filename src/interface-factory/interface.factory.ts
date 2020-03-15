import readline from "readline";
import {promisify} from "util";

export class InterfaceFactory {
    create() {
        (readline.Interface.prototype.question as any)[promisify.custom] = (prompt: string) => {
            return new Promise(resolve =>
                readline.Interface.prototype.question.call(this, prompt, resolve),
            );
        };
        (readline.Interface.prototype as any).questionAsync = promisify(
            readline.Interface.prototype.question,
        );
        return readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
}
