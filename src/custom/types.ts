import { User } from "@prisma/client";

export type customUser = Pick<User,"username"|"role">;