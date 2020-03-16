import {ValidatorResponse} from "./validator.response";
import {ValidationRequest} from "./validation.request";
import {ErrorType} from "./error.type";
import {Movement} from "../coordinates-service/movement";
import {Rotation} from "../orientation-service/rotation";

export class InputValidator {

    constructor() {}

    validate(request: ValidationRequest): ValidatorResponse{
        return {valid: false, error: "ERROR"}
    }

    validateCoordinates(input: string[]): ValidatorResponse {
        const coords = input.map(char => parseInt(char, 10));
        return !this.correctLength(coords, 2)
            ? this.toError(ErrorType.WrongLength)
            : !this.allNumbers(coords)
                ? this.toError(ErrorType.NonPermittedCharacters)
                : {valid: true, item: {x: coords[0], y: coords[1]}}
    }

    validateInstructions(input: string[]): ValidatorResponse {
        if (!input.every((item) => this.isRotationOrMovement(item))) {
            return this.toError(ErrorType.NonPermittedCharacters)
        }
    }

    sanitise(input: string): string[] {
        return input
            .replace(/[^0-9a-z]/gi, '')
            .toUpperCase()
            .split("")
    }

    private isRotationOrMovement(item: string): boolean {
        return Object.values(Rotation).includes(item as Rotation)
            || Object.values(Movement).includes(item as Movement);
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
