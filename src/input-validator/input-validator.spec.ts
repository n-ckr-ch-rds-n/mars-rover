import {InputValidator} from "./input-validator";
import {expect} from "chai";
import {InputType} from "./input.type";

describe("Input validator", () => {
    let validator: InputValidator;

    beforeEach(() => {
        validator = new InputValidator();
    });

    it("Sanitises string input", () => {
        const sanitised = validator.sanitise("M j , 3  %^&T");
        const expected = ["M", "J", "3", "T"];
        expect(sanitised).to.deep.equal(expected, "Input was not sanitised correctly");
    });


    describe("Coordinate validation", () => {

        it("Marks input as invalid if too long or short", () => {
            const validated = validator.validateCoordinates(["3", "4", "M", "G"]);
            expect(validated.valid).to.equal(false, "Input should have been marked invalid")
        });

    })


});
