import {InputValidator} from "./input-validator";
import {expect} from "chai";

describe("Input validator", () => {
    let validator: InputValidator;

    beforeEach(() => {
        validator = new InputValidator();
    });

    it("Validates input", () => {
        const response = validator.validate("foobar");
        expect(response.valid).to.equal(true);
    });
});
