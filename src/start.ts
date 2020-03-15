import {InterfaceFactory} from "./interface-factory/interface.factory";
import {UserInterface} from "./user-interface/user.interface";
import {InputValidator} from "./input-validator/input-validator";
import {RoverFactory} from "./rover-factory/rover.factory";

const interfaceFactory = new InterfaceFactory();
const inputValidator = new InputValidator();
const roverFactory = new RoverFactory();
const roverInterface = new UserInterface(inputValidator, roverFactory, interfaceFactory);
roverInterface.start();

