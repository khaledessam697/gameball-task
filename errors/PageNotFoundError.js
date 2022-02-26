module.exports = class PageNotFoundError extends Error {
    constructor() {
        super('Page not found');
    }
}