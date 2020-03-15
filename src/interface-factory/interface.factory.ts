import readline from "readline";
import {promisify} from "util";

export class InterfaceFactory {
    create() {
        const roverInterface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        }) as any;
        roverInterface.question[promisify.custom] = (question: string) => {
            return new Promise((resolve) => {
                roverInterface.question(question, resolve)
            })
        };
        roverInterface.question = promisify(roverInterface.question);
        return roverInterface;
    }
}
