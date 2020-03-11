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
        const newOrientationByOld: Record<Orientation, Orientation> = {
            [Orientation.North]: Orientation.East,
            [Orientation.East]: Orientation.South,
            [Orientation.South]: Orientation.West,
            [Orientation.West]: Orientation.North
        };
        for (const orientation of Object.values(Orientation)) {
            const reorientationRequest = {rotation: Rotation.Right, currentOrientation: orientation};
            const newOrientation = orientationService.reorient(reorientationRequest);
            expect(newOrientation).to.equal(newOrientationByOld[orientation as Orientation]);
        }
    })
});
