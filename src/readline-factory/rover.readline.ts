import {Interface} from "readline";

export interface RoverReadline extends Interface {
    questionAsync: (question: string) => Promise<string>
}
