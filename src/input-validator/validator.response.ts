import {Instruction} from "../rover/instruction";

export interface ValidatorResponse {
    input?: Instruction[];
    error?: string;
    valid: boolean;
}
