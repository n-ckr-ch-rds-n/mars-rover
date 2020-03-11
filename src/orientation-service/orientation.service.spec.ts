import {OrientationService} from "./orientation.service";
import {Orientation} from "../orientation";
import {Rotation} from "../rotation";
import {ReorientationRequest} from "./reorientation.request";
import {expect} from "chai";

describe("Orientation service", () => {
    let orientationService: OrientationService;
    let reorientationRequest: ReorientationRequest;
    let newOrientationByOld: Record<Orientation, Orientation>;

    beforeEach(() => {
        orientationService = new OrientationService();
    });

    it("Deals with rightward rotations", () => {
        newOrientationByOld = {
            [Orientation.North]: Orientation.East,
            [Orientation.East]: Orientation.South,
            [Orientation.South]: Orientation.West,
            [Orientation.West]: Orientation.North
        };
        for (const orientation of Object.values(Orientation)) {
            reorientationRequest = {rotation: Rotation.Right, currentOrientation: orientation};
            const newOrientation = orientationService.reorient(reorientationRequest);
            expect(newOrientation).to.equal(newOrientationByOld[orientation as Orientation]);
        }
    });

    it("Deals with leftward rotations", () => {
        newOrientationByOld = {
            [Orientation.North]: Orientation.West,
            [Orientation.West]: Orientation.South,
            [Orientation.South]: Orientation.East,
            [Orientation.East]: Orientation.North
        };
        for (const orientation of Object.values(Orientation)) {
            reorientationRequest = {rotation: Rotation.Left, currentOrientation: orientation};
            const newOrientation = orientationService.reorient(reorientationRequest);
            expect(newOrientation).to.equal(newOrientationByOld[orientation as Orientation]);
        }
    })
});
