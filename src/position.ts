import {RoverCoordinates} from "./rover/rover.coordinates";
import {Orientation} from "./orientation";

export interface Position {
    coordinates: RoverCoordinates;
    orientation: Orientation;
}
