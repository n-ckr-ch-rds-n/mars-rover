import {ReorientationRequest} from "./reorientation.request";
import {Orientation} from "./orientation";
import {Rotation} from "../rotation";

export class OrientationService {

    cardinalPoints: Orientation[] = [Orientation.North, Orientation.East, Orientation.South, Orientation.West];

    reorient(request: ReorientationRequest): Orientation {
        const currentIndex = this.cardinalPoints.indexOf(request.currentOrientation);
        return request.rotation === Rotation.Right
            ? this.rightwardRotation(currentIndex)
            : this.leftwardRotation(currentIndex)
    }

    private rightwardRotation(currentIndex: number): Orientation {
        return currentIndex === this.cardinalPoints.length - 1
            ? this.cardinalPoints[0]
            : this.cardinalPoints[currentIndex + 1]
    }

    private leftwardRotation(currentIndex: number): Orientation {
        return currentIndex === 0
            ? this.cardinalPoints[this.cardinalPoints.length - 1]
            : this.cardinalPoints[currentIndex - 1]
    }

}
