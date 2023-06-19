import type { DefaultUser } from "next-auth";
import { Roles } from "@prisma/client";

declare module "next-auth" {
  interface User {
    id: string;
    image: string;
    email: string;
    role: Roles;
    name: string;
  }
  interface Session {
    user?: DefaultUser & {
      id: string;
      role: Roles;
    };
  }
}

declare module "next-auth/jwt/types" {
  interface JWT {
    uid: string;
    role: Roles;
  }
}
