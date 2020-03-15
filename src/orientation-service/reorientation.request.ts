import {Rotation} from "./rotation";
import {Orientation} from "./orientation";

export interface ReorientationRequest {
    rotation: Rotation;
    currentOrientation: Orientation;
}
