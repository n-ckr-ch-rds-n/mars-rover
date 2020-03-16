import {InputValidator} from "./input-validator";
import {expect} from "chai";
import {InputType} from "./input.type";

describe("Input validator", () => {
    let validator: InputValidator;

    beforeEach(() => {
        validator = new InputValidator();
    });

    it("Sanitises string input", () => {
        const sanitised = validator.sanitise("M J , 3  %^&T");
        const expected = ["M", "J", "3", "T"];
        expect(sanitised).to.deep.equal(expected, "Input was not sanitised correctly");
    });
});
