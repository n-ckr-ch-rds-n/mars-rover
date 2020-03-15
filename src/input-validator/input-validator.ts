import {ValidatorResponse} from "./validator.response";

export class InputValidator {
    constructor() {}

    validate(input: string): ValidatorResponse{
        return {valid: true}
    }
}
