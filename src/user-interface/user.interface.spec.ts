import {UserInterface} from "./user.interface";
import {expect} from "chai";
import {RoverInterface} from "../interface-factory/rover.interface";

describe("User interface", () => {
    let ui: UserInterface;
    let mockInterface: RoverInterface;

    beforeEach(() => {
        mockInterface = {
            questionAsync: async (question: string) => "foobar"
        } as RoverInterface;
        ui = new UserInterface(mockInterface);
    });

});
