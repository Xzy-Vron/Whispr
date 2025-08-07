import "next-auth";
/* This code snippet is extending the interfaces provided by the "next-auth" library in TypeScript. It
is adding properties `_id`, `isVerified`, `isAcceptingMessage`, and `username` to the `User`
interface and `Session` interface. By extending these interfaces, you are defining the structure of
the user and session objects used in the authentication process when working with "next-auth". This
customization allows you to include additional properties in the user and session objects, ensuring
that these properties are available and properly typed in your application when using "next-auth"
for authentication. */
declare module "next-auth" {
    interface User {
            _id: string;
            isVerified: boolean;
            isAcceptingMessage: boolean;
            username: string;
    }

    interface Session {
        user : {
            _id: string;
            isVerified: boolean;
            isAcceptingMessage: boolean;
            username: string;
        } & DefaultSession["user"];
    }
}

/* This code snippet is extending the JWT (JSON Web Token) interface provided by the "next-auth"
library in TypeScript. It is adding additional properties `_id`, `isVerified`, `isAcceptingMessage`,
and `username` to the JWT interface. By doing this, you are defining the structure of the JWT
payload when using "next-auth" with JWT tokens, ensuring that these properties are available and
properly typed when working with JWT tokens in your application. */
declare module "next-auth/jwt" {
    interface JWT {
            _id: string;
            isVerified: boolean;
            isAcceptingMessage: boolean;
            username: string;
    }
}