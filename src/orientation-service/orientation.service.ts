import {ReorientationRequest} from "./reorientation.request";
import {Orientation} from "../orientation";

export class OrientationService {

    reorient(request: ReorientationRequest) {
        return Orientation.East;
    }
}