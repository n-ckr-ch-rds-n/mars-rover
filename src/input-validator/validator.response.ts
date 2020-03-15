import {Instruction} from "../rover/instruction";

export interface ValidatorResponse {
    input?: Position | Instruction[];
    error?: string;
    valid: boolean;
}
