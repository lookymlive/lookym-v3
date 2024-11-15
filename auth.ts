import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { AdapterUser } from "next-auth/adapters";  // Cambiado para importar desde "next-auth/adapters"
import { signInSchema } from "@/app/utils/verificationSchema";
import UserModel, { createNewUser } from "@/app/models/user";
import startDb from "@/app/lib/db";
import { isValidObjectId } from "mongoose";

export interface SessionUserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  verified: boolean;
  role: "user" | "store" | "admin";
  emailVerified?: Date | null;
}

declare module "next-auth" {
  interface Session {
    user: SessionUserProfile;
  }
}

class CustomError extends CredentialsSignin {
  constructor(message: string) {
    super(message);
    this.message = message;
  }
  code = "custom_error";
}

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
  unstable_update,
} = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials, request) {
        const result = signInSchema.safeParse(credentials);
        if (!result.success)
          throw new CustomError("Please provide a valid email & password!");

        const { email, password } = result.data;
        await startDb();
        const user = await UserModel.findOne({ email });

        if (!user?.compare(password))
          throw new CustomError("Email/Password mismatched!");

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          verified: user.verified || false,
          avatar: user.avatar?.url || "default-avatar-url",
          role: user.role as "user" | "store" | "admin",
          emailVerified: user.emailVerified || null,
        };
      },
    }),
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        if (!profile?.email || !profile.name) return false;

        await startDb();
        const oldUser = await UserModel.findOne({ email: profile.email });

        if (!oldUser) {
          await createNewUser({
            name: profile.name,
            email: profile.email,
            provider: "google",
            verified: profile.email_verified || false,
            avatar: { url: profile.picture },
            role: "user",
          });
        }
      }

      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        const extendedUser = user as AdapterUser & SessionUserProfile;

        if (!isValidObjectId(extendedUser.id)) {
          const dbUser = await UserModel.findOne({ email: extendedUser.email });
          if (dbUser) {
            token = {
              ...token,
              id: dbUser.id,
              email: dbUser.email ?? "default@example.com",
              name: dbUser.name,
              verified: dbUser.verified,
              avatar: dbUser.avatar?.url || "default-avatar-url",
              role: dbUser.role || "user",
              emailVerified: dbUser.emailVerified || null,
            };
          }
        } else {
          token = {
            ...token,
            id: extendedUser.id,
            email: extendedUser.email ?? "default@example.com",
            name: extendedUser.name,
            verified: extendedUser.verified,
            avatar: extendedUser.avatar || "default-avatar-url",
            role: extendedUser.role || "user",
            emailVerified: extendedUser.emailVerified || null,
          };
        }
      }

      if (trigger === "update") {
        token = { ...token, ...session };
      }

      return token;
    },
    session({ token, session }) {
      session.user = {
        id: token.id as string,
        email: token.email as string,
        name: token.name as string,
        verified: token.verified as boolean,
        avatar: token.avatar as string,
        role: token.role as "user" | "store" | "admin",
        emailVerified: token.emailVerified as Date | null,
      };

      return session;
    },
  },
});

const url = process.env.MONGO_URI;
