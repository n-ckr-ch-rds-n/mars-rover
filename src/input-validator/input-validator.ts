import {ValidatorResponse} from "./validator.response";
import {ValidationRequest} from "./validation.request";

export class InputValidator {

    errors: Record<string, string> = {
        wrongNumberOfCharacters: "Wrong number of characters in input"
    };

    constructor() {}

    validate(request: ValidationRequest): ValidatorResponse{
        return {valid: false, error: "ERROR"}
    }

    validateCoordinates(input: string[]): ValidatorResponse {
        if (input.length !== 2) {
            return this.toError(this.errors.wrongNumberOfCharacters);
        }
    }

    sanitise(input: string): string[] {
        return input
            .replace(/[^0-9a-z]/gi, '')
            .toUpperCase()
            .split("")
    }

    toError(message: string): ValidatorResponse {
        return {valid: false, error: message};
    }
}
