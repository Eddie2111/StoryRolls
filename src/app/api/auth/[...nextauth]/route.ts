import NextAuth from "next-auth";

const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    // Providers without credentials are for sign in only, but can still be used to set up a user
    // account in the database when an existing user exists in a database but does not have a
    // password set yet (for example, with Magic Link)
    // Providers with credentials are for sign in and sign up
    // {
    //   id: "credentials",
    //   name: "Credentials",
    //   type: "credentials",
    //   credentials: {
    //     username: { label: "Username", type: "text", placeholder: "jsmith" },
    //     password: { label: "Password", type: "password" }
    //   },
    //   authorize: async (credentials) => {
    //     const user = { id: 1, name: "J Smith", email: "
    //     j@example
    //     .com" }
    //     if (user) {
    //       // Any object returned will be saved in `user` property of the JWT
    //       return Promise.resolve(user)
    //     } else {
    //       // If you return null or false then the credentials will be rejected
    //       return Promise.resolve(null)
    //       // You can also Reject this callback with an Error or with a URL:
    //       // return Promise.reject(new Error('error message')) // Redirect to error page
    //       // return Promise.reject('/path/to/redirect')        // Redirect to a URL
    //     }
    //   }
    // },
  ],
});

export { handler as GET, handler as POST };
