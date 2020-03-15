import {Instruction} from "../instruction";

export interface ValidatorResponse {
    input?: Instruction[];
    error?: string;
    valid: boolean;
}
