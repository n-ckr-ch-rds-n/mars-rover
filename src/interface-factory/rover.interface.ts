import {Interface} from "readline";

export interface RoverInterface extends Interface {
    questionAsync: (question: string) => Promise<string>
}
