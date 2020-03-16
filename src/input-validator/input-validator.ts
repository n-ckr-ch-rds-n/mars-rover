import {ValidatorResponse} from "./validator.response";
import {ValidationRequest} from "./validation.request";
import {ErrorType} from "./error.type";

export class InputValidator {

    errors: Record<ErrorType, string> = {
        [ErrorType.WrongLength]: "Wrong number of characters in input"
    };

    constructor() {}

    validate(request: ValidationRequest): ValidatorResponse{
        return {valid: false, error: "ERROR"}
    }

    validateCoordinates(input: string[]): ValidatorResponse {
        if (input.length !== 2) {
            return this.toError(this.errors[ErrorType.WrongLength]);
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
