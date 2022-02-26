module.exports = class ResourceNotFoundError extends Error {
    constructor() {
        super('Resource not found');
    }
}