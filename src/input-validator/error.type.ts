export enum ErrorType {
    WrongLength = "Wrong number of characters in input",
    NonPermittedCharacters = "Non-permitted characters in input",
    InvalidCoordinates = "Coordinates are invalid. Must provide two integers",
    InvalidOrientation = "Orientation is invalid. Must be one of N, S, E, W",
    OutOfBounds = "Coordinates are out of plateau bounds"
}
