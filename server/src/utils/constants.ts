export const APP_ENV = process.env.NODE_ENV || 'local';

export const DOMAIN = (() => {
	if (process.env.NODE_ENV == 'prod') return 'erp.snd.mn';
	return 'localhost';
})();

export const CDN_DOMAIN = (() => {
	return 'cdn.snd.mn';
})();

export const JWT_COOKIE_NAME = (() => {
	if (process.env.NODE_ENV == 'prod') return `erp_jwt`;
	return `local_erp_jwt`;
})();

export const OFFICIAL_EMAIL = (() => {
	if (process.env.NODE_ENV == 'prod') return 'info@snd.mn';
	return 'j.davka@gmail.com';
})();

export const SERVICE_NAME = 'brandchain';

export const NODE_ENV = (() => {
	if (process.env.NODE_ENV == 'prod') return 'prod';
	return 'local';
})();