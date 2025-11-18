import makeAuthGuard from "@lib/http_server_utils/makeAuthGuard";
import { AdminJWTData } from "@shared/types";
import { JWT_COOKIE_NAME } from "./constants";

const adminGuard = makeAuthGuard<AdminJWTData>({
	jwtCookieName: JWT_COOKIE_NAME,
	validate: () => true,
});

export default adminGuard;