module.exports = class InvalidInputError extends Error {
    constructor(message, type) {
        super(message);
        this.type = type;
    }
}