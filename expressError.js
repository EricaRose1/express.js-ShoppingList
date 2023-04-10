// expressError extends the normal js error to esaliy add status when we make an instance of it.
// The error-handling middleware will reutn this

class ExpressError extends Error {
    constructor(message, ststus) {
        super();
        this.message = message;
        this.status = this.status;
        console.error(this.stack);
    }
}

module.exports = ExpressError;