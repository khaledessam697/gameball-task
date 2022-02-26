const InvalidInputError = require('./../errors/InvalidInputError');
const ForbiddenError = require('./../errors/ForbiddenError');
const ResourceNotFoundError = require('./../errors/ResourceNotFoundError');
const PageNotFoundError = require('./../errors/PageNotFoundError');


const MainErrorsHandlerMiddleware = function (error, req, res, next) {
	switch (error.constructor) {
		case ForbiddenError: {
			return res.status(403).json(error.message).end();
		}
		case InvalidInputError: {
			return res.status(400).json({
				type: InvalidInputError,
				message: error.message
			}).end();
		}
		case ResourceNotFoundError: {
			return res.status(404).json({
				error: 'Resource_Not_Found'
			}).end();
		}
		case PageNotFoundError: {
			return res.status(404).json({
				error: 'Page_Not_Found'
			}).end();
		}
		default: {
			return res.status(500).json({
				error_code: 500,
				error_message: 'Internal_Server_Error'
			}).end();

		}

	}
};

module.exports = MainErrorsHandlerMiddleware