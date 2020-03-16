import {Coordinates} from "./rover.coordinates";
import {Orientation} from "../orientation-service/orientation";

export interface Position {
    coordinates: Coordinates;
    orientation: Orientation;
}
