import {ValidatorResponse} from "./validator.response";
import {ValidationRequest} from "./validation.request";
import {ErrorType} from "./error.type";

export class InputValidator {

    constructor() {}

    validate(request: ValidationRequest): ValidatorResponse{
        return {valid: false, error: "ERROR"}
    }

    validateCoordinates(input: string[]): ValidatorResponse {
        const coords = input.map(char => parseInt(char, 10));
        if (!this.correctLength(coords, 2)) {
            return this.toError(ErrorType.WrongLength);
        } else if (!this.allNumbers(coords)) {
            return this.toError(ErrorType.NonNumericalCharacters)
        } else {
            return {valid: true, item: {x: coords[0], y: coords[1]}}
        }
    }

    sanitise(input: string): string[] {
        return input
            .replace(/[^0-9a-z]/gi, '')
            .toUpperCase()
            .split("")
    }

    private toError(message: string): ValidatorResponse {
        return {valid: false, error: message};
    }

    private allNumbers(input: number[]): boolean {
        return !input.includes(NaN);
    }

    private correctLength(input: Array<string | number>, length: number): boolean {
        return input.length === length;
    }
}
