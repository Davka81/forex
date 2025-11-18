import { Request } from 'express';
import ErrorWithCode from '../../lib/error_handling/ErrorWithCode';

export const notFoundErrorHandler = (req: Request, res, next) => {
	const err: any = new Error(`Not found path: ${req.path}`);
	err.status = 404;
	next(err);
}

export const domainErrHandler = (err, req: Request, res, next) => {
	if (err instanceof ErrorWithCode) {
		let { option, message, code } = err;

		res.status((option && option.status) || 400);

		// Parse Joi Error
		res.send({
			error: {
				message: extractFromJoiMessage(message),
				code,
				payload: option && option.payload ? option.payload : {}
			}
		});
	} else {
		if (err?.response?.data) {
			console.log('UNKNOWN error occured: ', err?.response?.data);
		} else {
			console.log(`Error Path: ${req.path}`, err);
		}

		const properMsg = extractFromJoiMessage(err.message || '');

		res.status(400).send({
			error: {
				message: properMsg
			}
		});
	}
}

const extractFromJoiMessage = (message: string) => {
	if (!message) return message;
	let msg = message;

	// Joi Error
	if (message.match(/.*.is not allowed to be empty/)) {
		let word = extractFromQuotedWord(message);
		msg = `${word} No value has been entered.`;
	}

	if (message.match(/child.*.fails because.*.is required]/)) {
		let word = extractFromQuotedWord(message);
		msg = `${word} The value must be entered.`;
	}

	if (message.match(/.*.must be a valid email/)) {
		msg = `This is not a valid email format.`;
	}

	if (message.match(/.*.must be a valid uri/)) {
		let word = extractFromQuotedWord(message);
		msg = `${word} This is not the correct URL format`;
	}

	return msg;
};

const extractFromQuotedWord = (message: string) => {
	if (message.match(/".+?"/g)) {
		let quotedWord = (message.match(/".+?"/g) as string[])[0];
		let word = quotedWord.split('"')[1];

		return word;
	}

	return message;
}