import type { MiddlewareHandler } from "astro";

export const onRequest: MiddlewareHandler = async (
	{ request, locals },
	next
) => {
	const userAgent = request.headers.get("user-agent") || "";
	const isMac = userAgent.includes("Mac");
	const isWindows = userAgent.includes("Win");

	locals = {
		...locals,
		os: isMac ? "macOS" : isWindows ? "Windows" : "Other",
		isMac,
		isMobile:
			/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				userAgent
			),
	};

	return next();
};
