import {ValidatorResponse} from "./validator.response";
import {ValidationRequest} from "./validation.request";

export class InputValidator {
    constructor() {}

    validate(request: ValidationRequest): ValidatorResponse{
        return {valid: false, error: "ERROR"}
    }
}
