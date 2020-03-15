import {RoverCoordinates} from "./rover.coordinates";
import {Orientation} from "../orientation-service/orientation";

export interface Position {
    coordinates: RoverCoordinates;
    orientation: Orientation;
}