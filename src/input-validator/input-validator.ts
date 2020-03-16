import {ValidatorResponse} from "./validator.response";
import {ValidationRequest} from "./validation.request";

export class InputValidator {
    constructor() {}

    validate(request: ValidationRequest): ValidatorResponse{
        return {valid: false, error: "ERROR"}
    }

    validateCoordinates(input: string[]): ValidatorResponse {

    }

    sanitise(input: string): string[] {
        return input.replace(/[^0-9a-z]/gi, '').split("")
    }
}
