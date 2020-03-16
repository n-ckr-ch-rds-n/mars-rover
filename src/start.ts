import {ReadlineFactory} from "./readline-factory/readline.factory";
import {UserInterface} from "./user-interface/user.interface";
import {InputValidator} from "./input-validator/input-validator";
import {RoverFactory} from "./rover-factory/rover.factory";

const interfaceFactory = new ReadlineFactory();
const inputValidator = new InputValidator();
const roverFactory = new RoverFactory();
const roverInterface = new UserInterface(inputValidator, roverFactory, interfaceFactory);
roverInterface.start();

