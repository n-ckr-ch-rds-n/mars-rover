import {OrientationService} from "./orientation.service";
import {Orientation} from "../orientation";
import {Rotation} from "../rotation";
import {ReorientationRequest} from "./reorientation.request";
import {expect} from "chai";

describe("Orientation service", () => {
    let orientationService: OrientationService;
    let orientationRequest: ReorientationRequest;

    beforeEach(() => {
        orientationService = new OrientationService();
    });

    it("Deals with rightward rotations facing North", () => {
        const reorientationRequest = {rotation: Rotation.Right, currentOrientation: Orientation.North};
        const newOrientation = orientationService.reorient(reorientationRequest);
        expect(newOrientation).to.equal(Orientation.East);
    })
});
