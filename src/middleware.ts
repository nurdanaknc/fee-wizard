export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/addResidence", "/selectResidence", "/residenceDetails", "/calculation-methods", "/plans", "/plans/[slug]"],
  exclude: ["/", "/login"],
};
