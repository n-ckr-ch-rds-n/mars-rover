import {InterfaceFactory} from "./interface-factory/interface.factory";
import {UserInterface} from "./user-interface/user.interface";
import {InputValidator} from "./input-validator/input-validator";

const interfaceFactory = new InterfaceFactory();
const inputValidator = new InputValidator();
const roverInterface = new UserInterface(interfaceFactory.create(), inputValidator);
roverInterface.start();

