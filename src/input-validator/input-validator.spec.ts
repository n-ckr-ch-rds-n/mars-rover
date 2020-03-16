import {InputValidator} from "./input-validator";
import {expect} from "chai";
import {InputType} from "./input.type";
import {Orientation} from "../orientation-service/orientation";
import {Rotation} from "../orientation-service/rotation";
import {Movement} from "../coordinates-service/movement";

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
            const validated = validator.validateCoordinates(["3", "4", "5", "6"]);
            expect(validated.valid).to.equal(false, "Input should have been marked invalid");
        });

        it("Marks input as invalid if it contains non-integer characters", () => {
            const validated = validator.validateCoordinates(["P", "3"]);
            expect(validated.valid).to.equal(false, "Input should have been marked invalid");
        });

        it("Marks valid input as valid", () => {
            const validated = validator.validateCoordinates(["4", "3"]);
            expect(validated.valid).to.equal(true, "Input should have been marked valid");
        });

    });

    describe("Instruction validation", () => {

        it("Marks input as invalid if it contains non-orientation/rotation characters", () => {
            const validated = validator.validateInstructions(["T", "H", "L"]);
            expect(validated.valid).to.equal(false, "Input should have been marked invalid");
        });

        it("Marks valid instruction input as valid", () => {
            const validated = validator.validateInstructions([Rotation.Left, Movement.Forward, Rotation.Right]);
            expect(validated.valid).to.equal(true, "Input should have been marked valid");
        });

    });

    describe("Position validation", () => {

        it("Marks position as invalid if it is the wrong length", () => {
            const validated = validator.validatePosition(["1", "3", "N", "4"]);
            expect(validated.valid).to.equal(false, "Input should have been marked invalid")
        });

        it("Marks position as invalid if first two characters are not valid coordinates", () => {
            const validated = validator.validatePosition(["P", "T", "N"]);
            expect(validated.valid).to.equal(false, "Input should have been marked invalid");
        });

        it("Marks position as invalid if thir character is not an orientation", () => {
            const validated = validator.validatePosition(["1", "2", "X"]);
            expect(validated.valid).to.equal(false, "Input should have been marked invalid");
        })
    })

});
