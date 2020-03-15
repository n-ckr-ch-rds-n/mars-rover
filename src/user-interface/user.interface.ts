import rl, {Interface} from "readline";

export class UserInterface {
    interface: Interface;

    constructor() {
        this.interface = rl.createInterface({
            input: process.stdin,
            output: process.stdout
        })
    }

}
