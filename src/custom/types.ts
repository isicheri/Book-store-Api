import { User } from "@prisma/client";

export type customUser = Pick<User,"username"|"role">;

export enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
    WRITER ="WRITER",
}