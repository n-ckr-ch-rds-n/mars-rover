import {Instruction} from "../rover/instruction";
import {Position} from "../rover/position";
import {Coordinates} from "../coordinates-service/coordinates";

export type ValidatedInput = Coordinates | Position | Instruction[];
