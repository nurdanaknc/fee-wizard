export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/addResidence", "/selectResidence", "/residenceDetails"],
  exclude: ["/", "/auth/login"],
};
