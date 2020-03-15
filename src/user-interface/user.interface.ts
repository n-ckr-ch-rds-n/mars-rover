import {RoverInterface} from "../interface-factory/rover.interface";
import {InputValidator} from "../input-validator/input-validator";
import {InputType} from "../input-validator/input.type";
import {ValidatorResponse} from "../input-validator/validator.response";
import {RoverFactory} from "../rover-factory/rover.factory";
import {Position} from "../rover/position";
import {Rover} from "../rover/rover";
import {InterfaceFactory} from "../interface-factory/interface.factory";

export class UserInterface {

    rover: Rover = {} as any;

    consoleOutput: Record<InputType, string> = {
        [InputType.Instructions]: "Please input Rover navigation instructions. Permitted characters: L, R, M\n",
        [InputType.InitialPosition]: "Please input initial Rover coordinates. Format: x, y, orientation. e.g. '3 5 N'\n"
    };

    constructor(private validator: InputValidator,
                private roverFactory: RoverFactory,
                private interfaceFactory: InterfaceFactory) {
    }

    async start() {
        const initialPosition = await this.requestInput(InputType.InitialPosition);
        if (initialPosition.valid) {
            this.rover = this.roverFactory.create(initialPosition.input as any as Position)
        }
        const roverInstructions = await this.requestInput(InputType.Instructions);
    }

    async requestInput(type: InputType): Promise<ValidatorResponse> {
        const requester = this.interfaceFactory.create();
        const input = await requester.questionAsync(this.consoleOutput[type]);
        requester.close();
        return this.validator.validate({input, type});
    }
}
