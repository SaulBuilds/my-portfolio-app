import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github'

declare module "next-auth" {
    interface Session {
      accessToken?: string;
    }
  }

export default NextAuth({
  providers: [
    GitHubProvider({
        clientId: process.env.GITHUB_CLIENT_ID || "defaultClientId",
        clientSecret: process.env.GITHUB_CLIENT_SECRET || "defaultClientSecret",
    }),

  ],
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  // Optional configurations
  session: { // Enable JSON Web Tokens (JWT) for session management
  },
  callbacks: {
        async jwt({ token, account }) {
          // Persist the OAuth access_token to the token right after signin
          if (account) {
            token.accessToken = account.access_token as string; // Type assertion here
          }
          return token;
        },
        // ... other callbacks ...
        async session({ session, token }) {
            // Send properties to the client, like an access_token from a provider.
            session.accessToken = token.accessToken as string; // Type assertion here
            return session;
          }
  }
  // Add other global configurations as needed
});