import {ValidatedInput} from "./validated.input";

export interface ValidatorResponse {
    item?: ValidatedInput;
    error?: string;
    valid: boolean;
}
