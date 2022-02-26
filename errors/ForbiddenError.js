module.exports = class ForbiddenError extends Error {
    constructor() {
        super('Forbidden : You arenot authorized to do this');
    }
}