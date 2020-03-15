import rl, {Interface} from "readline";
import {RoverInterface} from "../interface-factory/rover.interface";

export class UserInterface {

    constructor(private roverInterface: RoverInterface) {
    }

}
