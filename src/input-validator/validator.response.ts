import {ValidatedInput} from "./validated.input";

export interface ValidatorResponse {
    input?: ValidatedInput;
    error?: string;
    valid: boolean;
}
