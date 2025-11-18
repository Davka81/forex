
import { JwtPayload } from 'jsonwebtoken';
import { cryptoHelper } from '../cryptoHelper';
import ErrorWithCode from '../error_handling/ErrorWithCode';

export default function makeAuthGuard<T extends JwtPayload | string>(params: { jwtCookieName?: string, validate?: (jwtData: T) => boolean }) {
	const { validate, jwtCookieName } = params;
	return function authGuard(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		let originalMethod = descriptor.value;

		descriptor.value = async function (...args: any[]) {
			try {
				let jwt: string;

				if (jwtCookieName) {
					jwt = args[0].cookies[jwtCookieName];
				}

				if (args[0].headers.authorization && args[0].headers.authorization.includes('Bearer ')) {
					const bearerJwt = args[0].headers.authorization.split('Bearer ')[1];
					console.log("token: ", { bearerJwt });
					const isUndefinedString = typeof bearerJwt == 'string' && bearerJwt == 'undefined';
					if (bearerJwt && !isUndefinedString) {
						jwt = args[0].headers.authorization.split('Bearer ')[1];
					}
				}

				if (!jwt) return args[2](new ErrorWithCode('JWT.NO_TOKEN', 'Please try again after logging in.'));

				const decoded = cryptoHelper.verifyJwt(jwt) as T;
				console.log("decoded:", { decoded });
				if (validate && !validate(decoded)) {
					return args[2](new ErrorWithCode('AUTHENTICATION_FAILED', 'You do not have permission.'));
				}

				args.push(decoded);
				let result = originalMethod.apply(this, args);

				return result;
			} catch (err) {
				return args[2](err);
			}
		}

		return descriptor;
	}
}