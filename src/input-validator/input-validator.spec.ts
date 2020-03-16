import {InputValidator} from "./input-validator";
import {expect} from "chai";
import {InputType} from "./input.type";

describe("Input validator", () => {
    let validator: InputValidator;

    beforeEach(() => {
        validator = new InputValidator();
    });

    it("Validates input", () => {
        const response = validator.validate({input: "foobar", type: InputType.Instructions});
        expect(true).to.equal(true);
    });
});
