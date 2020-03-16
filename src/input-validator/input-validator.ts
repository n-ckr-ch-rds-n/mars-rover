import {ValidatorResponse} from "./validator.response";
import {ValidationRequest} from "./validation.request";
import {ErrorType} from "./error.type";
import {Movement} from "../coordinates-service/movement";
import {Rotation} from "../orientation-service/rotation";
import {Instruction} from "../rover/instruction";
import {Position} from "../rover/position";
import {Orientation} from "../orientation-service/orientation";

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
        } else {
            return {valid: true, item: input as Instruction[]}
        }
    }

    validatePosition(input: string[]): ValidatorResponse {
        const position: Position = {} as any;
        if (!this.correctLength(input,3)) {
            return this.toError(ErrorType.WrongLength);
        }
        const validatedCoordinates = this.validateCoordinates(input.slice(0, 2));
        if (!validatedCoordinates.valid) {
            return this.toError(ErrorType.InvalidCoordinates);
        } else {
            position.coordinates = validatedCoordinates;
        }
        const orientation = input.pop() as Orientation;
        if (!Object.values(Orientation).includes(orientation)) {
            return this.toError(ErrorType.InvalidOrientation)
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

    private toError(message: ErrorType): ValidatorResponse {
        return {valid: false, error: message};
    }

    private allNumbers(input: number[]): boolean {
        return !input.includes(NaN);
    }

    private correctLength(input: Array<string | number>, length: number): boolean {
        return input.length === length;
    }
}
