import {RoverCoordinates} from "./rover.coordinates";
import {Orientation} from "../orientation";

export interface Position extends RoverCoordinates {
    orientation: Orientation;
}
