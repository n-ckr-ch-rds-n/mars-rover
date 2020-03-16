import {ValidatorResponse} from "./validator.response";
import {ValidationRequest} from "./validation.request";
import {ErrorType} from "./error.type";
import {Movement} from "../coordinates-service/movement";
import {Rotation} from "../orientation-service/rotation";
import {Instruction} from "../rover/instruction";
import {Position} from "../rover/position";
import {Orientation} from "../orientation-service/orientation";
import {InputType} from "./input.type";

export class InputValidator {

    validatorsByType: Record<InputType, (input: string[]) => ValidatorResponse> = {
        [InputType.Plateau]: (input: string[]) => this.validateCoordinates(input),
        [InputType.Instructions]: (input: string[]) => this.validateInstructions(input),
        [InputType.InitialPosition]: (input: string[]) => this.validatePosition(input)
    };

    constructor() {}

    validate(request: ValidationRequest): ValidatorResponse {
        const sanitisedInput = this.sanitise(request);
        return this.validatorsByType[request.type](sanitisedInput);
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
        return !input.every((item) => this.isRotationOrMovement(item))
            ? this.toError(ErrorType.NonPermittedCharacters)
            : {valid: true, item: input as Instruction[]}
    }

    validatePosition(input: string[]): ValidatorResponse {
        const validatedCoordinates = this.validateCoordinates(input.slice(0, 2));
        const orientation = input[2] as Orientation;
        return !this.correctLength(input,3)
            ? this.toError(ErrorType.WrongLength)
            : !validatedCoordinates.valid
                ? this.toError(ErrorType.InvalidCoordinates)
                : !Object.values(Orientation).includes(orientation)
                    ? this.toError(ErrorType.InvalidOrientation)
                    : {valid: true, item: {coordinates: validatedCoordinates.item, orientation} as Position}
    }

    sanitise(request: ValidationRequest): string[] {
        const splitter = request.type === InputType.Instructions ? "" : " ";
        return request.input
            .toUpperCase()
            .split(splitter)
            .map((item: string) => item.replace(/[^0-9a-z]/gi, ''))
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
