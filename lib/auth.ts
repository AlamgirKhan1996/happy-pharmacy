export type UserRole = "customer" | "administrator";

export type AccountState = "guest" | "authenticated";

export type SessionUser = {
  id: string;
  email: string;
  role: UserRole;
};

export const accountRoutes = {
  customerSignIn: "/account",
  customerOrders: "/account",
  administrator: "/admin",
} as const;
